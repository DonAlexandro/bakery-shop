import classes from '../../../styles/AdminLayout/components/common.module.scss';

export default function TableList({children, listHeader}) {
	return (
		<table className={classes.tbList}>
			<thead>
				<tr>
					{listHeader.map((item, index) =>
						<th
							key={index}
						>{item}</th>
					)}
				</tr>
			</thead>
			{children}
		</table>
	)
}

export function ListBody({children}) {
	return (
		<tbody>
			{children}
		</tbody>
	)
}

export function TableListItem({children}) {
	return (
		<tr>
			{children}
		</tr>
	)
}

export function ListCol({children, accent}) {
	const accents = {
		high: classes.title,
		medium: classes.lead,
		colored: classes.textPrimary
	}

	return (
		<td>
			<span className={accents[accent] || ''}>{children}</span>
		</td>
	)
}

export function ListColIcon({children}) {
	return (
		<td>
			{children}
		</td>
	)
}
