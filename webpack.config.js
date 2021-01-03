const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
module.exports = {
  devtool: 'source-map',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        // include: SRC_DIR,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // include: SRC_DIR,
        use: [{
          loader: 'file-loader',
        }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        // include: SRC_DIR,
        use: [{
          loader: 'file-loader',
        }],
      },
    ],
  },
};
