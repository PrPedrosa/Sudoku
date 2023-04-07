export interface Square {
	id: number
	rowId: number
	colId: number
	boxId: number
	superPos: number[] | null
	value: number
	valid?: boolean
}

export type Board = Square[]
