import path from 'path'
import {v5} from 'uuid'


const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'
const uuidToPathMap: Record<string, string> = {}

export const generateId = (filePath: string) => {
	const normalizedPath = path.normalize(filePath)

	uuidToPathMap[normalizedPath] = v5(normalizedPath, NAMESPACE)

	return uuidToPathMap[normalizedPath]
}
