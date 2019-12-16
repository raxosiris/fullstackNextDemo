const withCSS = require('@zeit/next-css')
const webpack = require('webpack')

const { parsed: localEnv } = require('dotenv').config()
module.exports = withCSS()

module.exports = withCSS({
  webpack: function (config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  }
});