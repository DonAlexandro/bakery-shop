import classes from '../../../styles/AdminLayout/components/common.module.scss';
import Link from 'next/link';

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

export function ListCol({children, accent, link}) {
	const accents = {
		high: classes.title,
		medium: classes.lead,
		colored: classes.textPrimary
	}

	return (
		<td>
			{link
				? <Link href={link.href} as={link.as || ''}><a className={classes.link}>{children}</a></Link>
				: <span className={accents[accent] || ''}>{children}</span>
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
