type CacheEntry<T> = {
	data: T;
	expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export const cached = {
	set: <T>(key: string, data: T, ttl: number = 60 * 60 * 1000) => {
		const expiresAt = Date.now() + ttl;
		cache.set(key, { data, expiresAt });
	},
	get: <T>(key: string): T | undefined => {
		const entry = cache.get(key);
		if (!entry) return undefined;

		if (Date.now() > entry.expiresAt) {
			cache.delete(key);
			return undefined;
		}

		return entry.data as T;
	},
	delete: (key: string) => {
		cache.delete(key);
	},
	clear: () => {
		cache.clear();
	},
};
