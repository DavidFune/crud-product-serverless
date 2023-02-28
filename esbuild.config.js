const esbuild = require('esbuild')
const esbuildPluginTsc = require('esbuild-plugin-tsc');
const glob = require("tiny-glob");
( async () => {
    let entryPoints = await glob("./src/**/*.ts");
    esbuild.build({
        entryPoints,
        outdir: 'dist',
        bundle: true,
        platform: 'node',
        sourcemap: true,
        target: 'node14',
        plugins: [
            esbuildPluginTsc({
                tsconfigPath: './tsconfig.json',
            }),
        ],
    }).catch(() => process.exit(1));
})();
