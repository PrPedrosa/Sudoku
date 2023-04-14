import { useEffect, useState } from "react"
import { Square } from "../types"

export function useKeyboardControls(selected?: Square) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const [selectedSquareId, setSelectedSquareId] = useState(
    selected ? selected.id : 1
  )
  const [value, setValue] = useState<number>()

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key
    const arrowKeys = [
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "w",
      "a",
      "s",
      "d",
    ]
    const valueKeys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Backspace",
    ]

    if (arrowKeys.includes(key)) {
      switch (key) {
        case "ArrowUp":
        case "w":
          setSelectedSquareId((prev) =>
            prev < 10 ? 81 - (9 - prev) : prev - 9
          )
          break
        case "ArrowDown":
        case "s":
          setSelectedSquareId((prev) => (prev > 72 ? prev - 72 : prev + 9))
          break
        case "ArrowLeft":
        case "a":
          setSelectedSquareId((prev) => (prev % 9 === 1 ? prev + 8 : prev - 1))
          break
        case "ArrowRight":
        case "d":
          setSelectedSquareId((prev) => (prev % 9 === 0 ? prev - 8 : prev + 1))
      }
    }

    if (valueKeys.includes(key)) {
      key === "Backspace" ? setValue(0) : setValue(+key)
    }
  }

  return [selectedSquareId, value, setValue] as [
    number,
    number | undefined,
    (val: number | undefined) => void
  ]
}
