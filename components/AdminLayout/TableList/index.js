import classes from '../../../styles/AdminLayout/components/common.module.scss';

export default function TableList({children, listHeader}) {
	return (
		<table className={classes.tbList}>
			<thead>
				<tr>
					{listHeader.map((item, index) =>
						<th
							key={index}
						>{item.text}</th>
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
	return (
		<td>
			{accent === 'high'
				? <span className={classes.title}>{children}</span>
				: accent === 'medium' ? <span className={classes.lead}>{children}</span>
				: children
			}
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
