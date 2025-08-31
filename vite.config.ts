import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		server: {
			proxy: {
				"/s3": {
					target: `${env.BACKEND_URL}/storage`,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/s3/, ""),
				},
			},
		},
		build: {
			rollupOptions: isSsrBuild
				? {
						input: "./server/app.ts",
					}
				: {
						output: {
							manualChunks: {
								vendor: ['react', 'react-dom', 'react-router'],
								ui: ['@headlessui/react', '@heroicons/react', '@radix-ui/react-slider', '@radix-ui/react-slot'],
								stripe: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
							},
						},
					},
		},
		optimizeDeps: {
			include: [
				'react',
				'react-dom',
				'react-router',
				'@headlessui/react',
				'@heroicons/react/16/solid',
				'@heroicons/react/24/outline',
			],
		},
		plugins: [
			tailwindcss(),
			reactRouter(),
			tsconfigPaths(),
			iconsSpritesheet({
				withTypes: true,
				inputDir: "app/assets/icons",
				outputDir: "app/assets",
				typesOutputFile: "app/types/icons.ts",
				fileName: "icon.svg",
				cwd: process.cwd(),
				formatter: "biome",
				iconNameTransformer: (iconName) => iconName,
			}),
			netlifyPlugin(),
		],
	};
});
