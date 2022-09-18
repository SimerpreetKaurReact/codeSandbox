import axios from "axios";
import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            // path: new URL(args.path, "args.importer" + "/").href,
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }
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
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        //if esbuild tries to load index.js plugin has loaded the following contents
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
            import React,{useState} from "react@16.0.0"
              console.log(message);
            `,
          };
        }
        //get the data from args.path
        const { data, request } = await axios.get(args.path);
        console.log(data, request);
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,

          ///it is to tell where we found this file/ the source of current file, which we will need to resolve paths
          //"./" in above to is to remove the current index.js since we only need the directory
        };
        // } else {
        //   //
        //   return {
        //     loader: "jsx",
        //     contents: 'export default "hi there!"',
        //   };
        // }
      });
    },
  };
};
