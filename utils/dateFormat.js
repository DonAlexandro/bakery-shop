export const dateFormat = date => {
	return new Intl.DateTimeFormat('uk-UA', {dateStyle: 'medium'}).format(new Date(date))
}
