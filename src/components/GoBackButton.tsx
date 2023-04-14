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
		<div className="absolute top-[10px] left-[10px] text-red-800 text-[25px] active:bg-red-800 border border-c-dark4 bg-c-dark3 p-[5px] rounded-[5px] shadow-button-back cursor-pointer z-10 flex justify-center items-center"
		onClick={() => setTimeout(() => goBack(), 75)}>
			<i className='fa-solid fa-arrow-left'/>
		</div>
	)
}
