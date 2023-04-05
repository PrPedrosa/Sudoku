import { useState } from "react"
import { Square as SquareType } from "../types"
import classNames from "classnames"

function Square({
	sq,
	select,
	selected,
	isInitial
}: {
	sq: SquareType
	select: (sq: SquareType) => void
	selected: boolean
	isInitial?: boolean
}) {
	const [showSuperPos, setShowSuperPos] = useState(false)

	const cx = classNames
	const boardWidth = window.innerWidth - 10
	const squareHeight = boardWidth > 780 ? undefined : boardWidth / 9

	function handleShowSuperPos() {
		if (!sq.superPos) return null
		setShowSuperPos(true)
	}
	return (
		<>
			{showSuperPos && <SuperPosModal square={sq} hideModal={() => setShowSuperPos(false)} />}
			<div
				key={sq.id}
				className={cx(
					"border-[2px] border-c-dark4 flex items-center justify-center cursor-pointer bg-c-dark2",
					{
						"!border-r-black z-10": sq.id % 3 === 0,
						"!border-l-black z-10": sq.id % 3 === 1,
						"!border-b-black z-10": borderBottomBlackIds.includes(sq.id),
						"!border-t-black z-10": borderTopBlackIds.includes(sq.id),
						"!bg-c-purple": selected,
						"h-[50px]": !squareHeight
					}
				)}
				style={{ height: squareHeight }}
				onClick={() => select(sq)}
				onDoubleClickCapture={() => handleShowSuperPos()}
			>
				<div
					className={cx("text-c-purple font-semibold text-[20px]", {
						hidden: sq.value === 0,
						"!text-c-dark1": selected && !isInitial,
						"text-white": isInitial
					})}
				>
					{sq.value}
				</div>
			</div>
		</>
	)
}

function SuperPosModal({ square, hideModal }: { square: SquareType; hideModal: () => void }) {
	const cx = classNames

	//fix positions => modal cannot leave the board because of mobile
	const colPositions: { [key: number]: string } = {
		1: "left-[11%]",
		2: "left-[22%]",
		3: "left-[33%]",
		4: "left-[44%]",
		5: "left-[55%]",
		6: "left-[66%]",
		7: "left-[77%]",
		8: "left-[88%]",
		9: "left-[99%]"
	}
	const rowPositions: { [key: number]: string } = {
		1: "top-0",
		2: "top-[11%]",
		3: "top-[22%]",
		4: "top-[33%]",
		5: "top-[44%]",
		6: "top-[55%]",
		7: "top-[66%]",
		8: "top-[77%]",
		9: "top-[88%]"
	}

	const popupPosition = () => {
		return `${colPositions[square.colId]} ${rowPositions[square.rowId]}`
	}

	return (
		<>
			{/* opacity */}
			<div
				className='fixed bg-c-dark1  z-20 top-0 left-0 opacity-[60%] w-[100%] h-[100%]'
				onClick={() => hideModal()}
			/>
			{/* element */}
			<div
				className={cx(
					"absolute text-white opacity-[100%] z-40 p-[3px] w-max h-max",
					popupPosition()
				)}
				onClick={() => hideModal()}
			>
				<div
					className='border border-black bg-black grid grid-cols-3 rounded-[5px] p-[2px] z-50 gap-[2px]'
					onClick={e => e.stopPropagation()}
				>
					{square.superPos &&
						square.superPos.map(sp => (
							<div className='border-2 border-c-dark1 bg-c-dark3 w-[35px] h-[35px] rounded-[5px] leading-[100%] flex items-center justify-center active:bg-c-purple'>
								{sp}
							</div>
						))}
				</div>
			</div>
		</>
	)
}

const borderBottomBlackIds = [
	19, 20, 21, 22, 23, 24, 25, 26, 27, 46, 47, 48, 49, 50, 51, 52, 53, 54, 73, 74, 75, 76, 77, 78,
	79, 80, 81
]
const borderTopBlackIds = [
	28, 29, 30, 31, 32, 33, 34, 35, 36, 55, 56, 57, 58, 59, 60, 61, 62, 63, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

export default Square
