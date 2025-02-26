import {javascript, react} from './configs/index.js'


const eslint = () => {
	const configs = []

	configs.push(react())
	configs.push(javascript())

	return configs
}

export {eslint}
