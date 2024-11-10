interface ImportMetaEnv {
	GOOGLE_ANALYTICS_ID: string;
	MAINTENANCE: boolean;
	RIOT_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
