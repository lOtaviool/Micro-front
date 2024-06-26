const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "lool",
    projectName: "app1",
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
        }
      ]
    }
  });
};
