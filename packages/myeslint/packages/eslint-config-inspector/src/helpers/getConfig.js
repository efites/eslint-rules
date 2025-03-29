import path from 'path'
import fs from 'fs'


export const getConfig = async () => {
	const eslintFilePath = path.resolve(process.cwd(), './eslint.config.js')
	//const eslintFileUrl = pathToFileURL(eslintFilePath).toString()

	try {
		const config = await import(eslintFilePath)

		return config.default
	} catch {
		return [{}]
	}
}
