const path = require('path')

//1.导入html插件
const HtmlPlugin = require('html-webpack-plugin')

//2. new构造函数，创建HTML插件的实例对象
const htmlPlugin = new HtmlPlugin({
  //指定复制哪个页面
  template:'./src/index.html',
  //指定复制出来的文件名和存放路径
  filename:'./index.html'
})
//3.插件的数组，将来webpack在运行时，会加载并调用这些插件


module.exports = {
  //模式 (development 和 production)
  mode: 'development',
  // mode: 'production' //会压缩代码
  //entry '指定要处理哪个文件'
  entry: path.join(__dirname, './src/index1.js'),
  //output '指定生成的文件要存放在哪'
  output: {
    //存放目录
    path: path.join(__dirname, 'dist'),
    //生成的文件名
    filename: 'main.js',
  },
  plugins:[htmlPlugin],
  //
  devServer:{
    open:true, //初次打包完成后，自动打开浏览器
    //host:'127.0.0.1', //实时打包使用的地址
    port: 80 //实时打包使用的端口号
  },
  module:{ //所有第三方文件模块的匹配规则
    rules:[
      //定义了不同模块对应的loader
      {test:/\.css$/,use:['style-loader','css-loader']},
      //处理less
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      //处理图片文件loader 
      //use 需要调用的只有一个可以是字符串，多个必须是数组
      {test:/\.jpg|png|gif$/,use:['url-loader']},
    ]
  }
}


