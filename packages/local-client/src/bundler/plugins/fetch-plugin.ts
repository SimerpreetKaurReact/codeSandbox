import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";
const fileCache = localforage.createInstance({
  name: "filecache",
});
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetchPlugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        ///check to see if we have already fetched this file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // and if we it is in the cache then return it immediately
        if (cachedResult) return cachedResult;
        //get the data from args.path
      });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        console.log("onLoad", args);
        //if esbuild tries to load index.js plugin has loaded the following contents

        const { data, request } = await axios.get(args.path);
        // store the response in the cache
        console.log(data, request);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,

          ///it is to tell where we found this file/ the source of current file, which we will need to resolve paths
          //"./" in above to is to remove the current index.js since we only need the directory
        };

        //store response in cache
        await fileCache.setItem(args.path, result);
        return result;
        // } else {
        //   //
        //   return {
        //     loader: "jsx",
        //     contents: 'export default "hi there!"',
        //   };
        // }
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        //if esbuild tries to load index.js plugin has loaded the following contents

        //get the data from args.path
        const { data, request } = await axios.get(args.path);
        // store the response in the cache
        console.log(data, request);
        // const extension = args.path.match(/.css$/) ? "css" : "jsx";

        const contents = data;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,

          ///it is to tell where we found this file/ the source of current file, which we will need to resolve paths
          //"./" in above to is to remove the current index.js since we only need the directory
        };

        //store response in cache
        await fileCache.setItem(args.path, result);
        return result;
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
