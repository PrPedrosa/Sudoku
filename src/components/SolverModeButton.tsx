export function SolverModeButton({
  setSolverMode,
}: {
  setSolverMode: (bool: boolean) => void
}) {
  return (
    <button
      className="absolute top-[20px] right-[20px] text-white border border-c-purple p-[2px] rounded-[5px] bg-c-dark2 active:bg-c-purple"
      onClick={() => setTimeout(() => setSolverMode(true), 100)}
    >
      Sudoku Solver
    </button>
  )
}
