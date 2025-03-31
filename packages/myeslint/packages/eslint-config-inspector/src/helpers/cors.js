import {SERVER_URL, SERVER_PORT} from '../../index.js'


const getCorsOptions = () => {
	const whitelist = [`${SERVER_URL}:${SERVER_PORT}/`, `${SERVER_URL}:5173/`]

	const corsOptions = {
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1 || !origin) {
				callback(null, true)
			} else {
				console.log(origin)
				callback(new Error('Not allowed by CORS'))
			}
		}, // Запросы только с этого источника
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Разрешенные методы
		allowedHeaders: 'X-Requested-With,content-type', // Разрешённые заголовки
		credentials: true, // Разрешаем передачу кук и заголовков авторизации
		optionsSuccessStatus: 204 //  Некоторые старые браузеры (IE11) требуют 204 для OPTIONS
	}

	return corsOptions
}

export {getCorsOptions}
