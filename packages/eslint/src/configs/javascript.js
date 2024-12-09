/** @returns {import('eslint').Linter.Config} */
export const javascript = () => {

	return {
		files: ["src/**/*.js", "src/**/*.ts",],
		rules: {
			"id-length": "error",
		}
	}
}
