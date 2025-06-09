import {react, security} from './configs/index.js'


const eslint = (config) => {
	if (config) return config

	const configs = []

	configs.push(react())
	configs.push(security())

	return configs
}

export {eslint}
