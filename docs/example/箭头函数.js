// const  f1 = ()=> {
//   console.log(arguments)
// }
// function f2 () {
//   console.log(arguments)
// }
// f2(100, 200)
// f1(100, 200)


// const obj = {
//   name: 'zhang',
//   getName: function () {
//     return this.name
//   }
// }
// const obj1 = {
//   name: 'zhang',
//   getName: ()=>{
//     return this.name
//   }
// }
// console.log(obj.getName())
// console.log(obj1.getName())


const newObj = (name) =>{
  this.name = name
}
const new1 = new  newObj('zhang')
console.log(new1)