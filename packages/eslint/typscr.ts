import type {ESLint, Linter, Rule} from 'eslint'
import {rules} from './custom/Rule'
import {meta} from 'eslint-plugin-simple-import-sort'


const asd: ESLint.Plugin = {
	"rules": {
		"my-rule": {
			create(context) {
				return {}
			},
		},
	}
}

const Custom: Linter.Config = {
	name: 'Custom rules',
	rules: {
		"my-rule": "error"
	},
}
