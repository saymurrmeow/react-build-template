const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

const ENTRY_POINT = path.resolve(__dirname, 'src/index.tsx')
const OUTPUT_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')

const DEVSERVER_PORT = process.env.DEVSERVER_PORT || 1234
const PUBLIC_PATH = '/'

const plugins = [
    new CleanWebpackPlugin({
        verbose: true,
        dry: true
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
    }),
]

module.exports = {
    mode: devMode ? 'development' : 'production',

    entry: {
        main: ENTRY_POINT
    },
    output: {
        path: OUTPUT_DIR,
        filename: '[name].js',
        publicPath: PUBLIC_PATH
    },
    resolve: {
        modules: [APP_DIR, 'node_modules'],
        extensions: ['.tsx', '.ts', '.json', '.js', '.jsx']
    },
    stats: {
        warningsFilter: /export .* was not found in/,
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                  {
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // inject CSS to page
                  },
                  {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                  },
                  {
                    loader: 'postcss-loader', // Run postcss actions
                    options: {
                      plugins: function () {
                        // postcss plugins, can be exported to postcss.config.js
                        return [require('autoprefixer')]
                      },
                    },
                  },
                  {
                    loader: 'sass-loader', // compiles Sass to CSS
                  },
                ],
              },
              {
                test: /\.tsx?$/,
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                    },
                  },
                ],
                exclude: /node_modules/,
              },
        ]
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' },
        hot: true,
        port: DEVSERVER_PORT,
        contentBase: OUTPUT_DIR,
        publicPath: PUBLIC_PATH,
      }
}