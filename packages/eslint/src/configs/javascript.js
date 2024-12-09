import {noUnusedVars} from '../rules/no-unused-vars.js'
import {noVarToConst} from '../rules/no-var-to-const.js'
import {sortImports} from '../rules/sort-imports.js'
import {linesAfterImports} from '../rules/lines-after-imports.js'



/** @returns {import('eslint').Linter.Config} */
export const javascript = () => {

	return {
		files: ["src/**/*.js", "src/**/*.ts",],
		plugins: {
			customPlugin: {
				rules: {
					"my-rule": noUnusedVars,
					"vars": noVarToConst,
					"sort-imports": sortImports,
					"lines-after-imports": linesAfterImports,
				}
			}
		},
		rules: {
			"customPlugin/my-rule": "error",
			"customPlugin/vars": "error",
			"customPlugin/sort-imports": "warn",
			"customPlugin/lines-after-imports": ["warn", 2],

			"id-length": "error",
		}
	}
}
