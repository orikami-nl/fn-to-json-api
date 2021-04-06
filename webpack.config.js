const pkg = require('./package.json');
const path = require('path');
const libraryName = pkg.name;

module.exports = {
    target: 'node',
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        }
      ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            root: __dirname,
            src: path.resolve(__dirname, 'src'),
        },
    }
};