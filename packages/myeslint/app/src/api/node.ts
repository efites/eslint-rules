import {Node} from '@xyflow/react'
import axios, {AxiosResponse} from 'axios'



interface IError {
	id: number
	message: string
	line: number
	column: number
}

interface IWarning {
	id: number
	message: string
	line: number
	column: number
}

export interface INodeInfo {
	path: string,
	imports: number,
	complexity: number
	errors: IError[],
	warnings: IWarning[],
}

export const getNodeInfo = async (node: Node): Promise<AxiosResponse<INodeInfo[], undefined> | undefined> => {
	try {
		const response = await axios.get<INodeInfo[]>(`/api/files/${node.id}`)
		return response
	} catch (error) {
		console.error(error)
	}
}