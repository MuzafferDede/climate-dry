import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		rollupOptions: isSsrBuild
			? {
					input: "./server/app.ts",
				}
			: undefined,
	},
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		iconsSpritesheet({
			// Defaults to false, should it generate TS types for you
			withTypes: true,
			// The path to the icon directory
			inputDir: "app/assets/icons",
			// Output path for the generated spritesheet and types
			outputDir: "app/assets",
			// Output path for the generated type file, defaults to types.ts in outputDir
			typesOutputFile: "app/types/icons.ts",
			// The name of the generated spritesheet, defaults to sprite.svg
			fileName: "icon.svg",
			// The cwd, defaults to process.cwd()
			cwd: process.cwd(),
			// What formatter to use to format the generated files, prettier or biome, defaults to no formatter
			formatter: "biome",
			// Callback function that is called when the script is generating the icon name
			// This is useful if you want to modify the icon name before it is written to the file
			iconNameTransformer: (iconName) => iconName,
		}),
	],
}));
