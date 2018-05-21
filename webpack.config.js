var path = require('path');

module.exports = {
  module: {
    rules: [{
        test: /\.(css|less)$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          },
        ]},{
          test: /\.js$/,
          use: [{
            loader: 'babel-loader'
          }]
      }
    ]
  }
};