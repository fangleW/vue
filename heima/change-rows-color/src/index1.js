//ES6导入jquery
import $ from 'jquery'
//导入样式(在webpack中，一切皆模块)
import './css/index.css'
import './css/index.less'

//如果某个模块中，使用from接收到的成员为undefined，则没必要进行接受

// 1.导入图片，得到图片文件
import logo from './images/logo.jpg'
// 2.给img标签设置src属性
$('.box').attr('src',logo)
$(function () {
  $('li:odd').css('background-color', 'red')
  $('li:even').css('background-color', 'green')
})


//babel-loader 进行打包处理无法处理以下语法
//1.定义info装饰器
function info(target){
  //2.为目标添加静态属性info
  target.info = 'Person info'
}
//为person类应用info装饰器
@info
class Person {}
console.log(Person.info)