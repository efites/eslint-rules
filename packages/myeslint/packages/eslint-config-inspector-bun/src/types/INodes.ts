import {generateId} from '../helpers/generateId'


export interface INode {
	id: ReturnType<typeof generateId>
	path: string,
	position: {
		x: number,
		y: number,
	},
	data: {
		label: string,
		type: 'dir' | 'file',
		contentCount: number,
		errors: number,
		warnings: number,
	},
}
