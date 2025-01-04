export function getStored<T>(key: string): T | null {
	if (typeof window === 'undefined') return null;
	const item = localStorage.getItem(key);
	if (!item) return null;
	return JSON.parse(item);
}

export function setStored<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}
