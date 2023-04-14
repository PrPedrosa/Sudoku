import { useEffect, useState } from "react"
import { cx } from "../utils"
import InstallPWA from "./InstallButton"
import { buildClock } from "./Timer"

export function Home({
  getBoard,
}: {
  getBoard: (difficulty: "easy" | "medium" | "hard") => void
}) {
  const [showInstructions, setShowInstructions] = useState(false)
  const [showHiScores, setShowHiScores] = useState(false)
  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions)
    setShowHiScores(false)
  }
  const handleShowHiScores = () => {
    setShowHiScores(!showHiScores)
    setShowInstructions(false)
  }

  return (
    <div className="flex flex-col gap-[30px] items-center relative">
      <InstallPWA />
      <div className="text-[30px] text-c-purple text-center font-bold">
        SUDOKU
      </div>
      <div className="flex gap-[10px]">
        <DifficultyButton getBoard={getBoard} difficulty="easy" />
        <DifficultyButton getBoard={getBoard} difficulty="medium" />
        <DifficultyButton getBoard={getBoard} difficulty="hard" />
      </div>
      <div className="flex w-full justify-around">
        <HiScores showOrHide={handleShowHiScores} show={showHiScores} />
        <HowToPlay
          showOrHide={handleShowInstructions}
          show={showInstructions}
        />
      </div>
    </div>
  )
}

function HiScores({
  showOrHide,
  show,
}: {
  showOrHide: () => void
  show: boolean
}) {
  const [scores, setScores] = useState<string[]>()
  const [mode, setMode] = useState<string>("easy")

  //FIX => get all scores in state as to not constantly call effects and acess storage
  useEffect(() => {
    setScores(localStorage.getItem(`${mode}-scores`)?.split(","))
  }, [mode])

  return (
    <>
      <div
        className="text-center bg-c-dark3 text-white border border-black p-[5px] rounded-[5px] shadow-button-purple select-none active:bg-c-purple cursor-pointer"
        onClick={showOrHide}
      >
        HiScores
      </div>
      {show && (
        <div className="bg-c-dark4 text-white absolute bottom-[-180px] w-full border-c-purple border rounded-[5px]">
          <div className="grid-rows-2">
            <div className="grid grid-cols-3 text-center leading-[100%] rounded-[5px] cursor-pointer">
              <div
                onClick={() => setMode("easy")}
                className={cx(
                  "rounded-tl-[5px] p-[5px] text-green-700 font-semibold",
                  {
                    "bg-c-dark2 border-b border-c-purple": mode !== "easy",
                    "bg-c-dark4": mode === "easy",
                  }
                )}
              >
                Easy
              </div>
              <div
                onClick={() => setMode("medium")}
                className={cx("p-[5px] text-orange-700 font-semibold", {
                  "bg-c-dark2 border border-c-purple border-t-0":
                    mode !== "medium",
                  "bg-c-dark4 border-r border-l border-c-purple":
                    mode === "medium",
                })}
              >
                Medium
              </div>
              <div
                onClick={() => setMode("hard")}
                className={cx(
                  "rounded-tr-[5px] p-[5px] text-red-700 font-semibold",
                  {
                    "bg-c-dark2 border-b border-c-purple": mode !== "hard",
                    "bg-c-dark4": mode === "hard",
                  }
                )}
              >
                Hard
              </div>
            </div>
            {scores && (
              <div className="grid grid-row-3 p-[10px]">
                <div className="grid grid-cols-2 bg-c-dark2 p-[5px]">
                  <div className="text-center">1.</div>
                  <div className="text-left">
                    {+scores[0] !== 0 ? buildClock(+scores[0]) : "-----"}
                  </div>
                </div>
                <div className="grid grid-cols-2 p-[5px]">
                  <div className="text-center">2.</div>
                  <div>
                    {+scores[1] !== 0 ? buildClock(+scores[1]) : "-----"}
                  </div>
                </div>
                <div className="grid grid-cols-2 p-[5px] bg-c-dark2">
                  <div className="text-center">3.</div>
                  <div>
                    {+scores[2] !== 0 ? buildClock(+scores[2]) : "-----"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function HowToPlay({
  showOrHide,
  show,
}: {
  showOrHide: () => void
  show: boolean
}) {
  return (
    <>
      <div
        className="text-center bg-c-dark3 text-white border border-black p-[5px] rounded-[5px] shadow-button-purple select-none active:bg-c-purple cursor-pointer"
        onClick={showOrHide}
      >
        How to Play
      </div>
      {show && (
        <div className="bg-c-dark2 text-white absolute bottom-[-200px] w-full p-[5px] border-c-purple border rounded-[5px]">
          <ul>
            <li className="py-[5px] border-b border-c-purple">
              Press on a square to select it
            </li>
            <li className="py-[5px] leading-[120%] border-b border-c-purple">
              Press on a number (on top of the board) to write that value on the
              selected square
            </li>
            <li className="py-[5px] leading-[120%]">
              Long Press a square to write small numbers on it
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

function DifficultyButton({
  getBoard,
  difficulty,
}: {
  getBoard: (difficulty: "easy" | "medium" | "hard") => void
  difficulty: "easy" | "medium" | "hard"
}) {
  return (
    <div
      className={cx(
        "cursor-pointer border border-black bg-c-purple text-center text-white p-[10px] rounded-[10px] min-w-[80px] font-semibold uppercase text-[14px] select-none",
        {
          "hover:bg-green-700 active:bg-green-700 shadow-button-easy":
            difficulty === "easy",
          "hover:bg-orange-600 active:bg-orange-700 shadow-button-medium":
            difficulty === "medium",
          "hover:bg-red-700 active:bg-red-700 shadow-button-hard":
            difficulty === "hard",
        }
      )}
      onClick={() => setTimeout(() => getBoard(difficulty), 150)}
    >
      {difficulty}
    </div>
  )
}
