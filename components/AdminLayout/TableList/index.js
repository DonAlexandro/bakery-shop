import classes from '../../../styles/AdminLayout/components/common.module.scss';
import Link from 'next/link';
import {random} from '../../../utils/random';
import {useMemo} from 'react';

export default function TableList({children, listHeader, type = 'separated'}) {
	const types = {
		separated: classes.tbListSeparated,
		bordered: classes.tbListBordered
	}

	const attrs = {
		className: [
			classes.tbList,
			types[type]
		].join(' ')
	}

	return (
		<div className={type === 'bordered' ? classes.tbListWrapper : ''}>
			<table {...attrs}>
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
		</div>
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

export function ListCol({children, accent, link, user}) {
	const accents = {
		high: classes.title,
		medium: classes.lead,
		colored: classes.textPrimary
	}

	const avatarColors = [
		classes.bgPrimary,
		classes.bgDanger,
		classes.bgInfo,
		classes.bgSuccess,
		classes.bgWarning
	]

	const getRandom = useMemo(() => random(0, avatarColors.length), [user])

	const templates = {
		regular: <span className={accents[accent] || ''}>{children}</span>,
		link: <Link href={link?.href} as={link?.as || ''}><a className={classes.link}>{children}</a></Link>,
		user:
			<Link href={'/admin/users/[id]'} as={`/admin/users/${user?.id}`}>
				<a className={classes.userCard}>
					<div className={[
						classes.userAvatar,
						avatarColors[getRandom]
					].join(' ')}>{user?.name[0]}{user?.lastName[0]}</div>
					<div className={classes.userInfo}>
						<span className={classes.name}>{user?.name} {user?.lastName}</span>
						<span className={classes.email}>{user?.email}</span>
					</div>
				</a>
			</Link>
	}

	return (
		<td>
			{templates[link ? 'link' : user ? 'user' : 'regular']}
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
