const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.tsx"
    ],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack"s output.
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html",
                inject: "body"
            }
        ),
        new CleanWebpackPlugin(
            ["dist"], {
                verbose: true
            }
        )
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: "ts-loader",
                exclude: /node_modules[\\\/]inferno[\\\/]inferno\.d\.ts/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015'
            }
        ]
    },
    devServer: {
        contentBase: "dist/",
        historyApiFallback: true
    }
};
