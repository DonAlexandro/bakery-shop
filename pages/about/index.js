import MainLayout from '../../components/MainLayout/MainLayout'
import classes from '../../styles/MainLayout/about.module.scss'

export default function About() {
	return (
		<MainLayout
			title={'Про нас'}
			keywords={['about us', 'про нас', 'about bakery', 'про пекарню']}
			description={'Невелика розповідь про нашу пекарню'}
		>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Про нас</h5>
				</div>
				<div className={classes.imgWrapper}>
					<img src="/about.jpg" alert="About us"/>
				</div>
				<p>Являясь всего лишь частью общей картины, сделанные на базе интернет-аналитики выводы будут указаны как претенденты на роль ключевых факторов. Сделанные на базе интернет-аналитики выводы, вне зависимости от их уровня, должны быть смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. Повседневная практика показывает, что внедрение современных методик создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса модели развития.</p>
			</div>
		</MainLayout>
	)
}