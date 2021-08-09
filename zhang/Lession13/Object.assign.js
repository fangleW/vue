const obj = {
  a: 1,
  b: 2,
  c: 3
}

Object.assign(obj, {
  fn() {
    d: 'ddd'
  }
})
console.log(obj)
/* {  a: 1,
b: 2,
c: 3,fn:{
  d:'dd'
}} */