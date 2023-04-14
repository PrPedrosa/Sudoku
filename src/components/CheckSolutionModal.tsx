import { useEffect, useState } from "react"
import { buildClock } from "./Timer"

export function CheckSolutionModal({
  solution,
  retry,
  checkSolution,
  time,
  goBack,
}: {
  solution: boolean
  retry: boolean
  checkSolution: (time: number) => void
  time: number
  goBack: () => void
}) {
  const [finalTime, setFinalTime] = useState("")
  useEffect(() => {
    setFinalTime(buildClock(time))
  }, [solution])

  if (solution) {
    return (
      <>
        {/* opacity */}
        <div className="fixed bg-c-dark1  z-20 top-0 left-0 opacity-[70%] w-[100%] h-[100%]" />
        {/* element */}
        <div className="absolute text-white z-[100] top-0 left-0 flex items-center justify-center h-full w-full">
          <div className="flex flex-col bg-c-dark1 text-white items-center justify-center py-[20px] px-[30px] rounded-[10px] border-2 border-c-purple gap-[5px]">
            <div className="text-green-700 font-semibold border border-green-700 p-[2px] rounded-[5px]">
              PERFECT!
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[14px] leading-[100%]">Solved in:</div>
              <div className="font-semibold">{finalTime}</div>
            </div>
            <div
              onClick={() => setTimeout(() => goBack(), 100)}
              className="text-[14px] bg-c-dark3 p-[4px] rounded-[5px] shadow-button-back active:bg-red-700 mt-[5px]"
            >
              Home Menu
            </div>
          </div>
        </div>
      </>
    )
  }

  if (retry) {
    return (
      <div className="absolute text-red-700 z-[100] bottom-[50px] bg-c-dark2 p-[5px] font-semibold rounded-[10px] shadow-button-back">
        Solution is WRONG
      </div>
    )
  }

  /* button */
  return (
    <div
      className="absolute text-white z-[100] bottom-[50px] border border-c-purple p-[5px] rounded-[10px] bg-c-dark2 active:bg-c-purple cursor-pointer"
      onClick={() =>
        setTimeout(() => {
          checkSolution(time)
        }, 100)
      }
    >
      Check Solution
    </div>
  )
}
