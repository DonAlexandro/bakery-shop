import {useEffect} from 'react'
import {useAuth} from './useAuth';
import {useRouter} from 'next/router';

export const useRequireAuth = () => {
	const auth = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (auth.user === null) router.push('/auth/login')
	}, [auth, router])

	return auth
}
