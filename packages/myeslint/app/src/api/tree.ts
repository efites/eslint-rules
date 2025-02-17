import axios, {AxiosResponse} from 'axios'


export interface IFileTree {
	type: 'file' | 'dir'
	name: string
	children: IFileTree[]
}

export const getFileTree = async (): Promise<AxiosResponse<IFileTree[], undefined> | undefined> => {
	try {
		const response = await axios.get<IFileTree>('/api/files')
		return response
	} catch (error) {
		console.error(error)
	}
}