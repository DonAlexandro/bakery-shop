import classes from '../../../../styles/AdminLayout/components/forms.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Input({type, onRef, icon, name, id = '', placeholder = '', value, actions}) {
	const defaultTemplate = <input
								type={type}
								id={id}
								name={name}
								className={classes.formControl}
								ref={onRef}
								placeholder={placeholder}
								defaultValue={value}
								onClick={actions?.onClick}
								onChange={actions?.onChange}
							/>

	const withIconTemplate = <div className={classes.formControlWrap}>
								<div className={`${classes.formIcon} ${classes.formIconRight}`}>
									<FontAwesomeIcon icon={icon} />
								</div>
								{defaultTemplate}
						  	</div>

	return (
		icon ? withIconTemplate : defaultTemplate
	)
}

export function Textarea({name, onRef, value, id}) {
	return (
		<textarea
			name={name}
			id={id}
			className={classes.formControl}
			ref={onRef}
			defaultValue={value}
		></textarea>
	)
}

export function FormGroup({children}) {
	return (
		<div className={classes.formGroup}>
			{children}
		</div>
	)
}

export function Label({children, inputName = ''}) {
	return (
		<label htmlFor={inputName} className={classes.label}>{children}</label>
	)
}

export function HelperText({children, style = 'invalid'}) {
	const styles = {
		invalid: classes.invalidFeedback
	}

	return (
		<span className={styles[style]}>{children}</span>
	)
}
