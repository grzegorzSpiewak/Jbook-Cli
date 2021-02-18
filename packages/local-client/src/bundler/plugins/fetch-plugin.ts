import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export function fetchPlugin(inputCode: string): { name: string; setup(build: esbuild.PluginBuild): void; } {
  return ({
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => ({
        loader: 'jsx',
        contents: inputCode,
      }));

      build.onLoad({ filter: /.css$/ }, async ({ path }): Promise<esbuild.OnLoadResult | undefined> => {
        const { data, request } = await axios.get(path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents =  
          `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
          `;
        
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async ({ path }): Promise<esbuild.OnLoadResult | undefined> => {
          const { data, request } = await axios.get(path);

          const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          };
          await fileCache.setItem(path, result);

          return result;
        });

      build.onLoad({ filter: /.*/ }, async ({ path }): Promise<esbuild.OnLoadResult | undefined> => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          path
        );

        if (cachedResult) {
          return cachedResult;
        }
      });
    },
  });
}
