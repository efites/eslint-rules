import path from 'path'


let called = false
let config = [{}]

export const getConfig = async () => {
	if (called) return config

	const eslintFilePath = path.resolve(process.cwd(), './eslint.config.js')

	try {
		const configFile = await import(eslintFilePath)
		config = configFile.default
		called = true

		return config
	} catch {
		config = [{}]
		called = true

		return config
	}
}
