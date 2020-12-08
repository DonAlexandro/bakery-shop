import {useContext} from 'react'
import {alertContext} from '../context/alert/alertContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classes from '../styles/AdminLayout/components/adminLayout.module.scss'

export default function Alert() {
	const {alert, hideAlert} = useContext(alertContext)

	if (alert) {
		const MySwal = withReactContent(Swal)

		MySwal.fire({
			titleText: alert.type === 'success'
				? 'Успіх!'
				: alert.type === 'error' ? 'Помилка...'
					: 'Увага!',
			text: alert.text,
			icon: alert.type,
			timer: 10000,
			showConfirmButton: false,
			showCancelButton: true,
			cancelButtonText: '&times;',
			willClose: () => hideAlert(),
			didClose: () => hideAlert(),
			customClass: {
				title: classes.h2,
			}
		})
	}

	return (
		<div></div>
	)
}