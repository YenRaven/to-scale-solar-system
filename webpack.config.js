module.exports = {
  entry: [
    './src/main.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }
  ]},
  devtool:[
      "source-map"
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
}
