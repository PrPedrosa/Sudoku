//maybe popup modal to confirm go back?
export function GoBackButton({
	playing,
	goBack
}: {
	playing: boolean
	goBack: () => void
}) {
	if (!playing) return null
	return (
		<i
			className='fa-solid fa-arrow-left absolute top-[10px] left-[10px] text-red-800 text-[20px] active:bg-red-800 border border-c-dark4 bg-c-dark3 p-[5px] rounded-[5px] shadow-button-back'
			onClick={() => setTimeout(() => goBack(), 75)}
		/>
	)
}
