const obj = {
  bookName: '张三'
}
let bookName = obj.bookName

Object.defineProperty(obj, "bookName", {
  get() {
    console.log('读取了')
    //读取返回的是get内return的内容
    return bookName
  },
  set(v) {
    //v是set的内容
    console.log('set了', v)
    bookName = v
  }
})
obj.bookName = '李四'
console.log(obj.bookName)