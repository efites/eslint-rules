import {javascript} from './configs/index.js'



/** @returns {import('eslint').Linter.Config[]} */
const eslint = () => {
	const configs = []

	configs.push(javascript())

	return configs
}

export {eslint}
