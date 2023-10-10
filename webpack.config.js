module.exports = env => {
  const isV3 = !!env.v3
  const loaderName = `vue-loader${isV3 ? '': '-old'}`;
  const { VueLoaderPlugin } = require(loaderName);
  const TerserPlugin = require("terser-webpack-plugin");

  return {
    mode: process.env.NODE_ENV,
    entry: ["./src/vue-wait.js"],
	optimization: {
	  minimize: true,
	  minimizer: [new TerserPlugin()],
	},
    output: {
      library: "VueWait",
      libraryTarget: "umd",
      globalObject: 'typeof self !== \'undefined\' ? self : this',
      filename: `vue-wait${isV3 ? '-next': '-v2'}.js`
    },
    externals: { vue: 'vue' },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: loaderName
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
			options: {
			  presets: [
			    ['@babel/preset-env', { targets: "defaults" }]
			  ]
			}
          }
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
};
