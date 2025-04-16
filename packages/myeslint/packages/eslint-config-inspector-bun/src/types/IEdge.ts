import {generateId} from '../helpers/generateId'


export interface IEdge {
	id: ReturnType<typeof generateId>
	source: string
	target: ReturnType<typeof generateId>
}
