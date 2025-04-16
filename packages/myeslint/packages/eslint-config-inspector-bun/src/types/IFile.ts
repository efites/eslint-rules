import {Linter} from 'eslint'
import {v4} from 'uuid'


export interface IFile {
	errors: Linter.LintMessage & {id: ReturnType<typeof v4>},
	warnings: Linter.LintMessage & {id: ReturnType<typeof v4>},
	metrics: {
		imports: number, // Количество импортов
		functions: number, // Количество функций
		variables: number, // Количество переменных
		lines: number, // Количество строк в файле
		maxComplexity: number
	},
	path: string,
}
