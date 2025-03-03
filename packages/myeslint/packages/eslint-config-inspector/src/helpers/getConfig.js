import path from 'path'
import {pathToFileURL} from 'url'


export const getConfig = async () => {
	const eslintFilePath = path.resolve(process.cwd(), './eslint.config.js')
	const eslintFileUrl = pathToFileURL(eslintFilePath).toString();

	return await import(eslintFileUrl)
}