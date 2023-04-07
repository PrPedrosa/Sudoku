export function Timer({ time, playing }: { time: number; playing: boolean }) {
	if (!playing) return null
	return (
		<div className='absolute top-0 left-[200px] text-white debug'>
			{buildClock(time)}
		</div>
	)
}

export function buildClock(secs: number) {
	const seconds = () => (secs % 60 < 10 ? `0${secs % 60}` : secs % 60)
	const minutes = () => {
		const min = Math.floor(secs / 60)
		return min % 60 < 10 ? `0${min % 60}` : min % 60
	}
	const hours = () => `0${Math.floor(secs / 3600)}`

	return `${hours()}:${minutes()}:${seconds()}`
}
