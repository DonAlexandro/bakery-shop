import classes from '../../styles/MainLayout/components/modal.module.scss'

export default function Modal({children, toggleModal}) {
	const closeModal = e => {
		if (e.target.classList.contains(classes.modal)) {
			toggleModal(false)
		}
	}

	return (
		<div
			onClick={closeModal}
			className={classes.modal}>
			<div className={classes.modalContent}>
				<div className={classes.modalHeader}>
					<h4 className={classes.modalTitle}>Ваше замовлення</h4>
					<div
						onClick={() => toggleModal(false)}
						className={classes.closeModal}
					>&times;</div>
				</div>
				{children}
			</div>
		</div>
	)
}

export function ModalBody({children}) {
	return (
		<div className={classes.modalBody}>
			{children}
		</div>
	)
}

export function ModalFooter({children}) {
	return (
		<div className={classes.modalFooter}>
			{children}
		</div>
	)
}
