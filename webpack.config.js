//配置文件
var path = require("path");
//导入插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
    // 进行入口配置
    entry:{
        main:"./main" //路径
    },
    //进行输出配置
    output:{
        path:path.join(__dirname,"./dist"),//路径
        publicPath:"",
        filename:"main.js"
    },
    //配置加载器
    module:{
        rules:[
            {
                test:/\.css$/,
               /* use:[
                    "style-loader",
                    "css-loader"
                ]*/
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"

                })

            },
            //配置.vue文件加载器vue-loader
            {
                test:/\.vue$/,
                loader:"vue-loader",
                options:{
                    loaders:{
                        css:ExtractTextPlugin.extract({
                            use:"css-loader",
                            fallback:"vue-style-loader"
                        })
                    }
                }
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/node_modules/
            },
            //图片字体等加载器
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }

            ]
    },
    plugins:[
        //重命名提取后的css文件
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            favicon: '',
            filename: "index.html",
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
    ]
};
module.exports = config;
//等同于导出模块
// export default config;
