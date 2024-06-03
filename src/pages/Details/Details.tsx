import styles from './Details.module.css'

const data: string[] = [
	'Enrich pathways',
	'Update layout',
	'New pathways',
	'Cached pathways',
	'Patch by requests'
]

export default function Details() {
	return (
		<div className={ styles.container }>
			<div className={ styles.header }>
				<span className={ styles.header__title }>DETAILS</span>
			</div>
			<div className={ styles.content }>
			{data.map((value, index) => (
				<button className={ styles.button } key={ index }>{ value }</button>
			))}
			<button style={ { color: 'blue', backgroundColor: 'transparent' } }>Debug</button>
			</div>
		</div>
	)
}
