import {javascript} from './configs/index.js'


const eslint = () => {
	const configs = []

	configs.push(javascript())

	return configs
}

export {eslint}
