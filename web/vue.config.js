// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false
// })

const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false,
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader',
//         options: {
//           loaders: {
//             'scss': 'vue-style-loader!css-loader!sass-loader',
//             'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
//           }
//         }
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(png|jpg|gif)$/,
//         loader: 'url-loader',
//         options: {
//           limit: 1,
//           name: '[hash:8].[name].[ext]',
//           publicPath: '/'
//         }
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
//         loader: 'file-loader'
//       },
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.swf$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000
//         }
//       }
//     ]
//   }
// })

module.exports = {
  lintOnSave: false
};