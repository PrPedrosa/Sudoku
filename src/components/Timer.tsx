export function Timer({ time, playing }: { time: number; playing: boolean }) {
  if (!playing) return null
  return (
    <div className="absolute top-[30px] left-0 text-white w-[100%] flex justify-center items-center">
      <div className="border border-c-purple p-[5px] bg-c-dark2 rounded-[5px]">
        {buildClock(time)}
      </div>
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
