import classes from '../../../styles/AdminLayout/components/rsForm.module.scss';

export default function FormLayout({children, title, subtitle}) {
	return (
		<div className={classes.formContent}>
			<div className={classes.blockHead}>
				<h5 className={classes.blockHeadTitle}>{title}</h5>
				<p className={classes.blockHeadSubtitle}>{subtitle}</p>
			</div>
			{children}
		</div>
	)
}