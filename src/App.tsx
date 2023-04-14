import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { generateSudoku } from "./scripts/createBoard"
import { Square } from "./types"
import { Home } from "./components/Home"
import { updateSuperPositions } from "./scripts/updateSuperPositions"
import { GoBackButton } from "./components/GoBackButton"
import { Timer } from "./components/Timer"
import { CheckSolutionModal } from "./components/CheckSolutionModal"

function App() {
  const [board, setBoard] = useState<Square[]>()
  const [initialSquaresIds, setInitialSquareIds] = useState<number[]>()
  const [solvedBoard, setSolvedBoard] = useState<Square[]>()
  const [playing, setPlaying] = useState(false)
  const [timer, setTimer] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
  const [retry, setRetry] = useState(false)
  const [solution, setSolution] = useState(false)
  const [mode, setMode] = useState<"easy" | "medium" | "hard">()

  useEffect(() => {
    if (!localStorage.getItem("easy-scores")) localStorage.setItem("easy-scores", "0,0,0")
    if (!localStorage.getItem("medium-scores")) localStorage.setItem("medium-scores", "0,0,0")
    if (!localStorage.getItem("hard-scores")) localStorage.setItem("hard-scores", "0,0,0")
  }, [])

  function handleGetRandomBoard(difficulty: "easy" | "medium" | "hard") {
    if (!difficulty) return
    setMode(difficulty)
    setPlaying(true)

    const { unsolvedBoard, solvedBoard } = generateSudoku(difficulty)
    setBoard(unsolvedBoard)
    setSolvedBoard(solvedBoard)

    const initialSqs = unsolvedBoard
      .filter((sq) => sq.value !== 0)
      .map((sq) => sq.id)
    setInitialSquareIds(initialSqs)

    const intId = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    setIntervalId(intId)
  }

  function handleInput(squareId: number, value: number) {
    if (!board) return
    const newBoard = board.map((sq) => {
      if (squareId === sq.id) return { ...sq, value: value }
      return sq
    })
    setBoard(updateSuperPositions(newBoard))
  }

  function solve() {
    if (!board) return
    setBoard(solvedBoard)
  }

  const stopTimer = () => {
    clearInterval(intervalId)
    setTimer(0)
    setIntervalId(undefined)
  }

  function handleCheckSolution(time:number) {
    const oldBoard = board
    if (!board) return
    const newBoard: Square[] = board.map((sq) => {
      if (
        !board.find(
          (squ) =>
            squ.value === sq.value &&
            squ.id !== sq.id &&
            (squ.rowId === sq.rowId ||
              squ.colId === sq.colId ||
              squ.boxId === sq.boxId)
        )
      ) {
        return { ...sq, valid: true }
      } else return { ...sq, valid: false }
    })

    if (newBoard.find((sq) => sq.valid === false)) {
      setBoard(newBoard)
      setRetry(true)
      setTimeout(() => {
        setBoard(oldBoard)
        setRetry(false)
      }, 1500)
      return
    }
    handleHiScoreStorage(time, mode)
    setBoard(newBoard)
    setRetry(false)
    setSolution(true)
  }

  function handleGoBack() {
    setPlaying(false)
    setBoard(undefined)
    setSolvedBoard(undefined)
    setSolution(false)
    setRetry(false)
    stopTimer()
  }

  const isBoardNotCompleted = () => board?.find((sq) => sq.value === 0)

  return (
    <div className="h-[100vh] bg-c-dark1 flex w-[100%] items-center justify-center relative">
      <GoBackButton playing={playing} goBack={handleGoBack} />
      <Timer time={timer} playing={playing} />
      {!playing && <Home getBoard={handleGetRandomBoard} />}

      {playing && (
        <Board
          board={board}
          handleInput={handleInput}
          initialSquares={initialSquaresIds}
          solve={solve}
        />
      )}
      {playing && !isBoardNotCompleted() && (
        <CheckSolutionModal
          solution={solution}
          retry={retry}
          checkSolution={handleCheckSolution}
          time={timer}
          goBack={handleGoBack}
        />
      )}
    </div>
  )
}

/**
 * handles hiScores storage
 *
 * if no hiScores are set, localStorage default is 0,0,0
 */
function handleHiScoreStorage(time: number, mode?: string) {
  if (!mode) {
    alert("Unable to fetch HiScore data")
    return
  }
  const hiScores = localStorage
    .getItem(`${mode}-scores`)
    ?.split(",")
    .map((hs) => +hs)
  if (!hiScores) {
    alert("Unable to fetch HiScore data")
    return
  }
  const newHiScores = [...hiScores, time]
    .filter((hs) => hs !== 0)
    .sort((a, b) => a - b)
  while (newHiScores.length !== 3) {
    if (newHiScores.length < 3) newHiScores.push(0)
    if (newHiScores.length > 3) newHiScores.pop()
  }
  localStorage.setItem(`${mode}-scores`, newHiScores.join())
}

export default App
