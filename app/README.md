# How to create and edit items
The coding is based on React Router 7 with TypeScript
https://reactrouter.com/explanation/type-safety 
https://www.typescriptlang.org/

## Create items with API data

### The initial route setup
First add a route to the below file;
app\routes.ts

e.g.
	route("solution/:slug?", "routes/solution/detail.tsx"),

### Adding the folder for the specific files
To keep things tidy the code for these features are kept in a sub folder in the below;
/app/routes/
e.g.
/app/routes/solution

### Creating the files for the specific output
The second part of the route code lets us know what file or files we need to create e.g.
"routes/solution/detail.tsx"
Tells us we need to create the below file
app\routes\solution\detail.tsx

### Other files needed
For the correct structure of this project you will also need to create some other files e.g.
app\services\solution.server.ts

Which needs to be referenced in this file;
app\services\index.ts
e.g.
export * from "./solution.server";

And then also amend the below file to include the fields and data you need
app\types\index.ts

e.g. add this 

export type Solution = {
	id: number;
	name: string;
	slug: string;
	introduction: string;
	description: string;
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string[];
	created_at: string;
};


## Troubleshooting
You may see highlighted errors once you have created and edited the files. If so run dev with the below command to view the website and they should disappear;
npm run dev