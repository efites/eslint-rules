import {Node} from '@xyflow/react'
import axios, {AxiosResponse} from 'axios'



interface IError {
	id: string
	column: number
	endColumn: number
	endLine: number
	line: number
	message: string
	messageId: string
	ruleId: string | null
	severity: number
}

interface IWarning {
	id: string
	column: number
	endColumn: number
	endLine: number
	line: number
	message: string
	messageId: string
	ruleId: string | null
	severity: number
}

interface IMetric {
	functions: number
	imports: number
	lines: number
	maxComplexity: number
	variables: number
}
export interface INodeInfo {
	errors: IError[],
	warnings: IWarning[],
	path: string,
	metrics: IMetric | null
}

export const getNodeInfo = async (node: Node): Promise<AxiosResponse<INodeInfo, undefined> | undefined> => {
	try {
		const response = await axios.get<INodeInfo>(`/api/files/${node.id}`)
		return response
	} catch (error) {
		console.error(error)
	}
}