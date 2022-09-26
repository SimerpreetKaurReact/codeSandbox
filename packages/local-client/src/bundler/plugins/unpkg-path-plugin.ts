import * as esbuild from "esbuild-wasm";
// import localforage from "localforage";
// const fileCache = localforage.createInstance({
//   name: "filecache",
// });

// (async () => {
//   await fileCache.setItem("color", "red");
//   const color = await fileCache.getItem("color");
//   console.log(color);
// })();
export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        //this filters index as path
        return { path: "index.js", namespace: "a" };
      });
      //handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        //this filters relative file as path
        return {
          namespace: "a",
          // path: new URL(args.path, "args.importer" + "/").href,
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });
      //handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
        //since the above path is not a relative path it is going to cause bugs when the loaded path also has an internal require statemennt
        // so in that case we will need path realtive to the current path
        // else if (args.path === "tiny-test-pkg") {
        //   return {
        //     path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js",
        //     namespace: "a",
        //   };
        // }
      });
      //on resolve tries to figure out where index.js is
      //onLOad it attempts to load up index.js
    },
  };
};
