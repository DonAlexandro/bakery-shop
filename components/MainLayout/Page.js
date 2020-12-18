import classes from '../../styles/MainLayout/common.module.scss'

export default function Page({children}) {
	return (
		<div className={classes.page}>
			{children}
		</div>
	)
}

export function Sticker({children}) {
	return (
		<div className={classes.sticker}>
			<h5>{children}</h5>
		</div>
	)
}
