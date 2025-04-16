/// <reference types="@types/node" />

interface ImportMetaEnv {
	readonly VITE_SERVER_URL: string
	readonly VITE_SERVER_PORT: number
	readonly VITE_WEBSOCKET_PORT: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
