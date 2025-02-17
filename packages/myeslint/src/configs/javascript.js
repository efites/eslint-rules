//import {sortImports} from '../rules/sort-imports.js'
//import {noUnusedVars} from '../rules/no-unused-vars.js'
//import {noVarToConst} from '../rules/no-var-to-const.js'
//import {linesAfterImports} from '../rules/lines-after-imports.js'
//import {expressionToArrowFunction} from '../rules/expression-to-arrow-function.js'
//import {consoleLogToInfo} from '../rules/console-log-to-info.js'
import {structure} from '../rules/structure.js'


export const javascript = () => {

	return {
		files: ["src/**/*.js", "src/**/*.ts",],
		plugins: {
			customPlugin: {
				rules: {
					//"no-unused-vars": noUnusedVars,
					//"vars": noVarToConst,
					//"sort-imports": sortImports,
					//"lines-after-imports": linesAfterImports,
					//"expression-to-arrow-function": expressionToArrowFunction, БРАК
					//"console-log-to-info": consoleLogToInfo,
					"structure": structure,
				}
			}
		},
		rules: {
			//"customPlugin/no-unused-vars": "error",
			//"customPlugin/vars": "error",
			//"customPlugin/sort-imports": "warn",
			//"customPlugin/lines-after-imports": ["warn", 2],
			// "customPlugin/expression-to-arrow-function": "warn", БРАК
			//"customPlugin/console-log-to-info": "error",
			"customPlugin/structure": [
				"error",
				{
					"folders": [
						//"src/components",
						//"src",
						"src/utils",
						//"tests"
					],
					"files": [
						//"README.md",
						//"uuuuuuuuuu.json",
						//"src/yyyyyyyyyy.json",
						//"package.json",
						//".gitignore"
					]
				}
			],

			//"id-length": "error",
		}
	}
}
