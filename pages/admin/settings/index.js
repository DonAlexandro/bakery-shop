import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import PageHeader, {Title} from '../../../components/AdminLayout/PageHeader';
import Card from '../../../components/AdminLayout/Card';
import {Col12, Col3, Col9, Row} from '../../../components/Grid';
import Input, {FormGroup, HelperText, Label, Textarea} from '../../../components/AdminLayout/forms/components/Input';
import {useForm} from 'react-hook-form';
import Button from '../../../components/AdminLayout/Button';
import Box from '../../../components/Box';
import {db} from '../../../config/firebaseConfig';
import {useSettings} from '../../../hooks/useSettings';
import {alertContext} from '../../../context/alert/alertContext';
import {useContext} from 'react';
import {loadingContext} from '../../../context/loading/loadingContext';
import Alert from '../../../components/Alert';

export default function Settings({settings}) {
	const pageName = 'Налаштування'

	const {register, handleSubmit, errors} = useForm()
	const {updateSettings} = useSettings()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)

	const requestEnd = (message, type) => {
		showAlert(message, type)
		hideLoading()
	}

	const onSubmit = data => {
		showLoading()

		return updateSettings(data).then(response => {
			if (response?.error) {
				requestEnd('Щось пішло не так...', 'error')
				console.error(response?.error)
			} else {
				requestEnd('Налаштування успішно змінено', 'success')
			}
		})
	}

	return (
		<AdminLayout title={pageName}>
			<Alert />
			<PageHeader>
				<Title>{pageName}</Title>
			</PageHeader>
			<Card>
				<Box m="mb3">
					<PageHeader>
						<Title
							tag="h5"
							subtitle="Базові налаштування вашого інтернет-магазину"
						>Налаштування магазину</Title>
					</PageHeader>
				</Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col3>
							<Box m="mb4">
								<Label
									sublabel="Вкажіть назву свого магазину"
									inputName="siteName"
								>Назва магазину</Label>
							</Box>
							<Box m="mb4">
								<Label
									sublabel="Фізичний адрес вашого магазину"
									inputName="address"
								>Адрес магазину</Label>
							</Box>
							<Box m="mb4">
								<Label
									sublabel="Години коли ваш магазин відкритий"
									inputName="hours"
								>Години роботи</Label>
							</Box>
							<Box m="mb4">
								<Label
									sublabel="Контакти для зв'язку з вами"
									inputName="contacts"
								>Ваші контакти</Label>
							</Box>
							<Box m="mb4">
								<Label
									sublabel="Ваші авторські права на матеріали з сайту"
									inputName="copyright"
								>Авторські права</Label>
							</Box>
							<Box m="mb4">
								<Label
									sublabel="Якийсь короткий напис у стікер на головній сторінці"
									inputName="sticker"
								>Стікер</Label>
							</Box>
							<Box m="mt4">
								<Label
									sublabel="Коротка інформація про ваш магазин"
									inputName="about"
								>Інормація про магазин</Label>
							</Box>
						</Col3>
						<Col9>
							<Box m="mb4">
								<FormGroup>
									<Input
										name="siteName"
										id="siteName"
										value={settings.siteName}
										onRef={register({
											required: 'Будь ласка, назвіть свій сайт'
										})}
									/>
									{errors.siteName && <HelperText>{errors.siteName.message}</HelperText>}
								</FormGroup>
							</Box>
							<Box m="mb4">
								<FormGroup>
									<Input
										name="address"
										id="address"
										value={settings.address}
										onRef={register({
											required: 'Будь ласка, вкажіть адресу вашого магазину'
										})}
									/>
									{errors.address && <HelperText>{errors.address.message}</HelperText>}
								</FormGroup>
							</Box>
							<Box m="mb4">
								<FormGroup>
									<Input
										name="hours"
										id="hours"
										value={settings.hours}
										onRef={register({
											required: 'Будь ласка, вкажіть години, коли відкритий ваш магазин'
										})}
									/>
									{errors.hours && <HelperText>{errors.hours.message}</HelperText>}
								</FormGroup>
							</Box>
							<Box m="mb4">
								<FormGroup>
									<Input
										name="contacts"
										id="contacts"
										value={settings.contacts}
										onRef={register({
											required: `Будь ласка, вкажіть контакти для зв'язку з вами`
										})}
									/>
									{errors.contacts && <HelperText>{errors.contacts.message}</HelperText>}
								</FormGroup>
							</Box>
							<Box m="mb4">
								<FormGroup>
									<Input
										name="copyright"
										id="copyright"
										value={settings.copyright}
										onRef={register({
											required: `Будь ласка, впишіть копірайт`
										})}
									/>
									{errors.copyright && <HelperText>{errors.copyright.message}</HelperText>}
								</FormGroup>
							</Box>
							<Box m="mb4">
								<FormGroup>
									<Input
										name="sticker"
										id="sticker"
										value={settings.sticker}
										onRef={register({
											required: `Впишіть щось у стікер на головній сторінці`
										})}
									/>
									{errors.sticker && <HelperText>{errors.sticker.message}</HelperText>}
								</FormGroup>
							</Box>
							<Box m="mt4">
								<FormGroup>
									<Textarea
										name="about"
										id="about"
										value={settings.about}
										onRef={register({
											required: `Розкажіть пару слів про свій магазин, це важливо :)`
										})}
									></Textarea>
									{errors.about && <HelperText>{errors.about.message}</HelperText>}
								</FormGroup>
							</Box>
						</Col9>
						<Col12>
							<Box m="mt4" center="center">
								<Button
									loading={loading}
									styles={{
										size: 'lg'
									}}
								>Оновити</Button>
							</Box>
						</Col12>
					</Row>
				</form>
			</Card>
		</AdminLayout>
	)
}

export async function getServerSideProps() {
	let settings = null

	await db.collection('settings').doc(process.env.SETTINGS_ID).get().then(doc => {
		settings = doc.data()
	})

	return {props: {settings}}
}
