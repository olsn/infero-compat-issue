const webpack = require('webpack');
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

    devtool: "cheap-module-source-map",

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
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
        alias: {
            'react': 'inferno-compat',
            'react-dom': 'inferno-compat'
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules(?![\/\\]@ngrx[\/\\]store[\/\\]src)/,
                loader: "babel-loader!ts-loader"
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules(?![\/\\]@ngrx[\/\\]store[\/\\]src)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    devServer: {
        contentBase: "dist/",
        historyApiFallback: true
    }
};
