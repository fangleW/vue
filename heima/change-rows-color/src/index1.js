//ES6导入jquery
import $ from 'jquery'
//导入样式(在webpack中，一切皆模块)
import './css/index.css'
import './css/index.less'

// 1.导入图片，得到图片文件
import logo from './images/logo.jpg'
// 2.给img标签设置src属性
$('.box').attr('src',logo)
$(function () {
  $('li:odd').css('background-color', 'red')
  $('li:even').css('background-color', 'green')
})