import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
	// Config options...
	// Server-side render by default, to enable SPA mode set this to `false`
	ssr: true,
	// Enable middleware
	future: {
		unstable_middleware: true,
	},
	presets: [vercelPreset()],
} satisfies Config;
