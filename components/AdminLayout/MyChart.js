import Chart from 'chart.js'
import {useEffect, useRef} from 'react';
import classes from '../../styles/utils/colors.module.scss'

export default function MyChart({labels, data}) {
	const chart = useRef(null)

	useEffect(() => {
		new Chart(chart.current, {
			type: 'doughnut',
			data: {
				labels,
				datasets: [{
					data,
					backgroundColor: [
						'#1ee0ac',
						'#f4bd0e',
						'#09c2de'
					]
				}]
			}
		})
	}, [])

	return (
		<canvas ref={chart}></canvas>
	)
}