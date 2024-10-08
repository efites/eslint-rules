import globals from 'globals';
import pluginReact from 'eslint-plugin-react'


export default [
	pluginReact.configs.flat.recommended,
	{

		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
			"react/react-in-jsx-scope": "off",
		},
		// Указание среды выполнения кода (браузер)
		languageOptions: {
			globals: globals.browser,
		},
		// Дополнительные настройки проверки кода
		settings: {
			// Определить версию React, тк в плагине указана другая версия
			react: {
				version: "detect",
			},
		},
	},
]