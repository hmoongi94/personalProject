let root = document.getElementById("root")
// console.dir(root)
let div = document.getElementsByTagName("div")
// console.dir(div)
let h1 = document.getElementsByTagName("h1")
// console.dir(h1)
let input = document.getElementsByTagName("input")
// console.dir(input)
let button = document.getElementsByTagName("button")
// console.dir(button)
let label = document.getElementsByTagName("label")
// console.dir(label)
let span = document.getElementsByTagName("span")
// console.dir(span)
let category = document.getElementById("category")
let category1 = document.getElementById("category1")
let li = document.getElementsByTagName("li")
let ul = document.getElementsByTagName("ul")
let p = document.getElementsByTagName("p")
let a = document.getElementsByTagName("a")

console.dir(li)
console.dir(p)

li[0].addEventListener("mouseover", ()=>{
  p[0].style.visibility = "visible"
})
li[1].addEventListener("mouseover",()=>{
  p[1].style.visibility = "visible"
})