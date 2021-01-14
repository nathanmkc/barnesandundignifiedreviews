const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/public/dist');
module.exports = {
  mode: 'development',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
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
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        //include: SRC_DIR,
        //exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //include: SRC_DIR,
        //exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        //include: SRC_DIR,
        //exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
};
