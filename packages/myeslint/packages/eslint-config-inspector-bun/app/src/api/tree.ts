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
		errors: number
		warnings: number
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

axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}`

export const getFileTree = async (): Promise<AxiosResponse<IResponse, undefined> | undefined> => {
	try {
		const response = await axios.get<IResponse>('/tree')
		return response
	} catch (error) {
		console.error(error)
	}
}