npm i --save-dev @types/react
code ==> es build runs
esbuild then finds an import statement
we write a pulgin to fetch individual file from npm ==> unpkg.com

# Path resolution of fetching the accurate package for es build

1. Fetching the main file of a package
   "url"+package name
2. Fetching any other file in that package(import or require statements
   "url"+directory the last file was found in + the require statement of this file

# Caching for performance

Caching layer: have we already fetched the file before, if so return it immediately else make the request and store the response

since we are storing a lot of info so, local storage with its minimal storage will not be a goood option
instead we will use indexedDB inside the browser
we will use localforage

# configuring css loaders / and others

CSS loader require write to spit out the css file, so to override this behavior by creates js which we will directly append this css into dom hed

# Handling untrusted code execution

1.  code might throw errors and cause program to crash
2.  user code might mutate the DOM
3.  user can run malicious code
4.  Check for infinite loops

iframes: A way of running html inside of another html document
iframes are like child of the main/parent index.html ie their execution context is seperate from the parent. Normally these can communicate
ie child to parent by accessing parent window element and parent to child document.querySelector('iframe').contentWindow
WE will isolate this iframe from the parent
Direct access between frames is allowed when

1. the oframe element does not have a 'sandbox' property, or has a 'sandbox="allow-same-origin"' property
2. WE fetch the parent html doc and the frame html doc from the exact same domain,port ,protocol http/https

so the right way wil be to run our server on a seperate server like localhost:4005 and our iframe maybe on localhost :4006

Indirect communication between parent and iframe using event listeners
Iframe can listen to events from the parent, so i frame can know about any code update

Error Handling

1. handling async errors
2. Bundling syntax error
3. syncronous error

# Redux store

1. cells reducer

- data : {[cell id]:cell}:array of all cells
- loading: bool : true/false whether we are fetching data
- error: string|null : errors related to saving cells
- order: string[] : order of cells

2. bundles

- data: {[cellID]:Bundle} : bundle for each cell

Action creators

- updateCell, deleteCell, insert cellbefore/after, movecell,fetchcell
