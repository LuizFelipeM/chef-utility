const webpack = require("webpack")
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Chef",
    projectName: "utility",
    webpackConfigEnv,
    argv,
  });

  const envPath = path.resolve(__dirname, ".env");
  const envVars = require('dotenv').config({ path: envPath }).parsed || {};

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
    ],
  });
};
