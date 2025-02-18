import axios, {AxiosResponse} from 'axios'


export interface INode {
	id: string,
	position: {
		x: number,
		y: number,
	},
	data: {
		label: string,
		type: 'dir' | 'file',
		contentCount: number
	}
}

export interface IEdge {
	id: string,
	source: INode['id'],
	target: INode['id'],
}

interface IResponse {
	nodes: INode[],
	edges: IEdge[]
}

axios.defaults.baseURL = 'http://localhost:6123'

export const getFileTree = async (): Promise<AxiosResponse<IResponse, undefined> | undefined> => {
	try {
		const response = await axios.get<IResponse>('/api/files')
		return response
	} catch (error) {
		console.error(error)
	}
}