npm i --save-dev @types/react
code ==> es build runs
esbuild then finds an import statement
we write a pulgin to fetch individual file from npm ==> unpkg.com

# Path resolution of fetching the accurate package for es build

1. Fetching the main file of a package
   "url"+package name
2. Fetching any other file in that package(import or require statements
   "url"+directory the last file was found in + the require statement of this file
