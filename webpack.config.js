const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const nodeExternals = require('webpack-node-externals');

const makeConfig = (entry, output, isServer) => {
  return {
    name: isServer ? "server" : "client",
    target: isServer ? "node" : "web",
    entry: entry,
    output: {
      ...output,
      clean: true
    },
    externals: isServer ? [nodeExternals()] : [],
    plugins: isServer ? [] : [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/client/index.html")
      })
    ],
    resolve: {
      alias: {
        common: path.resolve(__dirname, "./src/common"),
        client: path.resolve(__dirname, "./src/client")
      },
      extensions: [".js", ".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: ["ts-loader"],
          exclude: /node_modules/
        }
      ]
    }
  }
} 

const serverInputPath = path.resolve(__dirname, "./src/server/index.ts");
const serverOutputPath = path.resolve(__dirname, "./dist/server");

const clientInputPath = path.resolve(__dirname, "./src/client/index.tsx");
const clientOutputPath = path.resolve(__dirname, "./dist/client");

module.exports = [
  makeConfig(serverInputPath, {
    path: serverOutputPath
  }, true),
  makeConfig(clientInputPath, {
    filename: "js/bundle.js",
    path: clientOutputPath
  }, false),
];
