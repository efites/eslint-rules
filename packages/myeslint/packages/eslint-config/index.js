import {react} from './configs/index.js'


const eslint = (config) => {
	if (config) return config

	const configs = []

	configs.push(react())

	return configs
}

export {eslint}
