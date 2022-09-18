import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        return { path: args.path, namespace: "a" };
      });
      //on resolve tries to figure out where index.js is
      //onLOad it attempts to load up index.js
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        //if esbuild tries to load index.js plugin has loaded the following contents
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        } else {
          //
          return {
            loader: "jsx",
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};
