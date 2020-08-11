const { resolve }            = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolvePathsToAlias    = () => {

    const { paths } = require('./tsconfig.json').compilerOptions;
    const aliases   = {};

    Object.keys(paths).forEach(item => {
        paths[item][0] = 'src/' + paths[item][0];

        const key      = item.replace('/*', '');
        const value    = resolve('./', paths[item][0].replace('/*', ''));

        aliases[key]   = value;
    });

    return aliases;
};

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    output: {
        filename: "../../js/flat-gallery.js",
    },

    // enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],

        // Alias
        alias: resolvePathsToAlias()
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ]
    },

    plugins: [
        new CleanWebpackPlugin()
    ],

    // Other options...
};
