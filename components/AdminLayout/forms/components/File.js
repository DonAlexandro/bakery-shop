import classes from '../../../../styles/AdminLayout/components/forms.module.scss'

export default function File({children}) {
	const handleFile = () => {
	}

	return (
		<div
			className={classes.uploadZone}
			onClick={handleFile}
		>
			{children}
		</div>
	)
}
