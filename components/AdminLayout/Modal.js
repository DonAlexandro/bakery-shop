import classes from '../../styles/AdminLayout/components/modal.module.scss'

export default function Modal({children, toggleModal, title}) {
	const closeModal = e => {
		if (e.target.classList.contains(classes.modal)) {
			toggleModal(false)
		}
	}

	return (
		<div onClick={closeModal} className={classes.modal}>
			<div className={classes.modalContent}>
				<div className={classes.modalHeader}>
					<h5>{title}</h5>
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

export function ModalContent({children}) {
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
