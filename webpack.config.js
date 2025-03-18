const path = require('path');
const webpack = require('webpack');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add custom aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    '@components': path.resolve(__dirname, 'app/components'),
    '@assets': path.resolve(__dirname, 'assets'),
    '@': path.resolve(__dirname, 'app'),
  };

  // Add a custom plugin
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.CUSTOM_VARIABLE': JSON.stringify('value'),
    })
  );

  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
  };

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.EXPO_ROUTER_APP_ROOT': JSON.stringify(path.resolve(__dirname, 'app')),
    })
  );

  return config;
}; 