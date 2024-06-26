const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");
const webpack = require('webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "lool",
    projectName: "nav-bar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Injeta CSS no DOM
            'css-loader',   // Interpreta @import e url() como import/require() e resolve-os
            'sass-loader'   // Compila Sass para CSS
          ]
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto',
          include: [path.resolve(__dirname, 'src')],
        }
      ]
    }
  });
};

