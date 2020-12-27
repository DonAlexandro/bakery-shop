import {useContext, createContext, useState, useEffect} from 'react'
import {auth, db} from '../config/firebaseConfig';

const authContext = createContext({users: {}})
const {Provider} = authContext

export const AuthProvider = ({children}) => {
	const auth = useAuthProvider()
	return <Provider value={auth}>{children}</Provider>
}

export const useAuth = () => useContext(authContext)

export const useAuthProvider = () => {
	const [user, setUser] = useState({})

	const createUser = user => {
		return db.collection('users').doc(user.id).set(user)
			.then(() => {
				setUser(user)
				return user
			})
			.catch(error => ({error}))
	}

	const signUp = ({email, password, ...data}) => {
		return auth.createUserWithEmailAndPassword(email, password)
			.then(({user}) => {
				return createUser({
					isAdmin: false,
					id: user.uid,
					email,
					date: Date.now(),
					...data
				})
			})
			.catch(error => ({error}))
	}

	const signIn = ({email, password}) => {
		return auth.signInWithEmailAndPassword(email.trim(), password.trim())
			.then(response => {
				setUser(response)
				getUserAdditionalData(response)
				return response.user
			})
			.catch(error => ({error}))
	}

	const getUserAdditionalData = user => {
		return db.collection('users').doc(user.uid).get()
			.then(userData => {
				if(userData.data()) setUser(userData.data())
			})
			.catch(error => ({error}))
	}

	const signOut = () => auth.signOut().then(() => setUser(null))

	const sendPasswordResetEmail = email => {
		return auth.sendPasswordResetEmail(email).then(response => ({response})).catch(error => ({error}))
	}

	const handleAuthStateChanged = user => {
		setUser(user)

		if (user) getUserAdditionalData(user)
	}

	useEffect(() => {
		const unsub = auth.onAuthStateChanged(handleAuthStateChanged)

		return () => unsub()
	}, [])

	useEffect(() => {
		if (user?.id) {
			const unsub = db.collection('users').doc(user.id).onSnapshot(doc => {
				setUser(doc.data())
			})

			return () => unsub()
		}
	}, [])

	return {user, signUp, signIn, signOut, sendPasswordResetEmail}
}
