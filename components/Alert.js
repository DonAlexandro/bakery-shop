import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Alert({text, type}) {
	if (text !== '') {
		const MySwal = withReactContent(Swal)

		MySwal.fire({
			titleText: type === 'success'
				? 'Успіх!'
				: type === 'error' ? 'Помилка...'
					: 'Увага!',
			text,
			icon: type,
			position: 'top-end',
			toast: true,
			timer: 3000,
			timerProgressBar: true,
			showConfirmButton: false,
			showCancelButton: true,
			cancelButtonText: '&times;'
		})
	}

	return (
		<div></div>
	)
}