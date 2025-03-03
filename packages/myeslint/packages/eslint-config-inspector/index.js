import cors from 'cors'
import {router} from './src/routes/routes.js';


export const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
export const SERVER_PORT = process.env.SERVER_PORT || 3344
export const INSPECTOR_PORT = process.env.INSPECTOR_PORT || 4455
export const WEBSOCKET_PORT = process.env.APP_PORT || 5566

const corsOptions = {
	origin: `${SERVER_URL}:${WEBSOCKET_PORT}`, // Запросы только с этого источника
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Разрешенные методы
	allowedHeaders: 'X-Requested-With,content-type', // Разрешённые заголовки
	credentials: true, // Разрешаем передачу кук и заголовков авторизации
	optionsSuccessStatus: 204 //  Некоторые старые браузеры (IE11) требуют 204 для OPTIONS
}

// Init an app
const app = express()

// Routes
app.use(process.env.ROOT_API, router)
app.use(cors(corsOptions))
app.use(express.static(path.resolve('../myeslint/packages/eslint-config-inspector/app/dist')));
websocket().then(data => console.log(data))

// Start
app.listen(SERVER_PORT, () => {
	console.log(`✔️\tOpen the inspector: \t${SERVER_URL}:${SERVER_PORT}/`);
})