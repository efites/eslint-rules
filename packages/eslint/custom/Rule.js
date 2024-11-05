//import type {Linter, Rule} from 'eslint'



export const myRule = {
	"rules": {
		"my-rule": {
			create(context) {
				return {}
			},
		},
	}
}

export const rules = {
	meta: {
		type: "layout", // Исключительно оформление, не затрагивает функционал
		docs: {
			description: "Description of the rule!!",
		},
		fixable: "code", // Может ли сам исправить проблему?
	},
	create(context) {
		return {}
	},
}
