import * as esbuild from 'esbuild-wasm';

export function unpkgPathPlugin(): { name: string; setup(build: esbuild.PluginBuild): void; } {
  return ({
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild): void {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({
        path: 'index.js',
        namespace: 'a',
      }));

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, ({ path, resolveDir}) => ({
        namespace: 'a',
        path: new URL(path, 'https://unpkg.com' + resolveDir + '/').href,
      }));

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async ({ path }) => ({
        namespace: 'a',
        path: `https://unpkg.com/${path}`,
      }));
    },
  });
}
