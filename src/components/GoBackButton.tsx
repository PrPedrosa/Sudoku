import arrow from "../svg/arrow-left.svg"

export function GoBackButton({
  playing,
  solverMode,
  goBack,
}: {
  playing: boolean
  solverMode: boolean
  goBack: () => void
}) {
  if (!playing && !solverMode) return null
  return (
    <div
      className="absolute top-[10px] left-[10px] text-red-800 text-[25px] active:bg-red-800 border border-c-dark4 bg-c-dark3 p-[5px] rounded-[5px] shadow-button-back cursor-pointer z-10 flex justify-center items-center"
      onClick={() => setTimeout(() => goBack(), 75)}
    >
      <img src={arrow} width={20} height={20} alt="go back" />
    </div>
  )
}
