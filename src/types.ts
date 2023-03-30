export type Square = {
	id: number
	rowId: number
	colId: number
	boxId: number
	superPos: number[] | null
	value: number
}

export type Board = Square[]
