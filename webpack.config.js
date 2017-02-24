var path = require("path"),
	StyleLintPlugin = require("stylelint-webpack-plugin"),
	//ExtractTextPlugin = require('extract-text-webpack-plugin');
	webpack = require("webpack");


module.exports = {
	//context: __dirname,
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.js",
		publicPath: "/js/"
	},

	module: {
		rules: [
			{
				test: /\.(css|scss)$/, 
				loader: ["style-loader", "css-loader", "sass-loader"], 
				exclude: "/node_modules/"
			},{
				test: /\.js$/, 
				enforce: "pre", 
				use: {
					loader: "eslint-loader",
					options: {
						configFile: "./node_modules/eslint-config-airbnb-base/.eslintrc",
						rules: {
							quotes: ["error", "double", { "allowTemplateLiterals": true }],
							"linebreak-style": "off",
                            "no-tabs": "off",
                            "max-len": "off",
                            "no-trailing-spaces": "off",
                            indent: ["error", "tab"]
						}
					}
				},
				exclude: "/node_modules/"
			},{
				test: /\.js$/, 
				use: {
					loader: "babel-loader", 
					options: {
						
					}
				},
				exclude: "/node_modules/"
			}
		]
	},

	plugins: [
		new StyleLintPlugin({
			config: require("stylelint-config-standard"),
			configOverrides: {
				rules: {
					indentation: "tab"
				}
			}
		})
	]
	
};