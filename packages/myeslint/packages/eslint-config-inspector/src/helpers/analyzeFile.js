export const analyzeFile = async (filePath) => {
	if (!fs.existsSync(filePath)) {
		throw new Error(`Файл не существует: ${filePath}`);
	}

	const stat = fs.statSync(filePath)

	if (stat.isDirectory()) {
		const result = {
			errors: [],
			warnings: [],
			metrics: null,
			path: path.normalize(filePath.replace(process.cwd(), '')).replace(/\\/g, '/'),
		}

		return result
	}

	const eslint = new ESLint({baseConfig: ESLintConfig()});

	// Анализ файла с помощью ESLint
	const results = await eslint.lintFiles([filePath]);

	if (results.length === 0) {
		return {errors: [], warnings: [], metrics: {}};
	}

	const fileResult = results[0];

	// 🔹 Разбираем ошибки и предупреждения
	const errors = fileResult.messages.filter(msg => msg.severity === 2).map(error => ({...error, id: v4()}))
	const warnings = fileResult.messages.filter(msg => msg.severity === 1 && msg.message !== 'File ignored because no matching configuration was supplied.').map(warning => ({...warning, id: v4()}))

	// 🔹 Читаем код файла для анализа метрик
	const code = fs.readFileSync(filePath, "utf8");

	const metrics = {
		imports: (code.match(/import\s+/g) || []).length, // Количество импортов
		functions: (code.match(/function\s+\w+|const\s+\w+\s*=\s*\(/g) || []).length, // Количество функций
		variables: (code.match(/const\s+\w+|let\s+\w+|var\s+\w+/g) || []).length, // Количество переменных
		lines: code.split("\n").length, // Количество строк в файле
		maxComplexity: Math.max(
			...(fileResult.messages
				.filter(msg => msg.ruleId === "complexity")
				.map(msg => parseInt(msg.message.match(/\d+/)?.[0] || "0", 10)) || [0]
			)
		) // Максимальная сложность методов
	};

	return {
		errors,
		warnings,
		metrics,
		path: path.normalize(fileResult.filePath.replace(process.cwd(), '')).replace(/\\/g, '/'),
	};
}