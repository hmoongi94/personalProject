
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
// console.dir()
console.dir(root)


// head
div[1].style.width = "100vw"
div[1].style.height = "8vh"
div[1].style.backgroundColor = "rgba(30,30,30,1)"
div[1].style.display = "flex"
div[1].style.justifyContent = "flex-start"
div[1].style.alignItems = "center"
// console.dir(div[1])

h1[0].style.color = "white"
h1[0].style.width = "15vw"
h1[0].style.height = "10vh"
h1[0].style.fontSize = "4vh"
h1[0].style.display = "flex"
h1[0].style.justifyContent = "center"
h1[0].style.alignItems = "center"

h1[1].style.width = "85vw"
h1[1].style.height = "10vh"
h1[1].style.display = "flex"
h1[1].style.alignItems = "center"
h1[1].style.justifyContent = "flex-end"


input[0].style.width = "10vw"
input[0].style.height = "3vh"

button[0].style.width = "3vw"
button[0].style.height = "3vh"

// 운동 카테고리
div[2].style.width = "100vw"
div[2].style.height = "6vh"
div[2].style.backgroundColor = "white"
div[2].style.display = "flex"
div[2].style.alignItems = "center"
div[2].style.backgroundColor = "pink"

input[1].style.display = "flex"
input[1].style.visibility = "hidden"
// check시
input[1].addEventListener("change", function () {
  if (category.style.left === "-100vw") {
    category.style.left = "0"
  }
  else {
    category.style.left = "-100vw"
  }

})

// 햄버거메뉴
label[0].style.display = "block"
label[0].style.width = "4vw"
label[0].style.height = "4vh"
label[0].style.cursor = "pointer"
label[0].style.position = "relative"

span[0].style.display = "block"
span[0].style.height = "0.5vh"
span[0].style.width = "2vw"
span[0].style.borderRadius = "30px"
span[0].style.background = "black"
span[0].style.position = "absolute"
span[0].style.top = "0"

span[1].style.display = "block"
span[1].style.height = "0.5vh"
span[1].style.width = "2vw"
span[1].style.borderRadius = "30px"
span[1].style.background = "black"
span[1].style.position = "absolute"
span[1].style.top = "1.5vh"

span[2].style.display = "block"
span[2].style.height = "0.5vh"
span[2].style.width = "2vw"
span[2].style.borderRadius = "30px"
span[2].style.background = "black"
span[2].style.position = "absolute"
span[2].style.top = "3vh"

// 카테고리 목록
div[3].style.position = "fixed"
div[3].style.width = "100vw"
div[3].style.height = "42vh"
div[3].style.background = "#fff"
// div[3].style.padding = "30px 25px 25px 25px"
div[3].style.boxSizing = "border-box"
div[3].style.border = "solid 0.5px"
div[3].style.top = "14vh"
div[3].style.zIndex = 1

// 햄버거메뉴 눌렀을 때 세부카테고리
li[0].style.width = "14vw"
li[0].style.height = "14vh"
li[0].style.fontSize = "3vh"
li[0].style.backgroundColor = "#fff"
li[0].style.display = "flex"
li[0].style.alignItems = "center"
a[0].style.width = "14vw"
a[0].style.height = "14vh"
a[0].style.display = "flex"
a[0].style.alignItems = "center"
a[0].style.backgroundColor = "#16191c"


li[1].style.width = "14vw"
li[1].style.height = "14vh"
li[1].style.fontSize = "3vh"
li[1].style.backgroundColor = "#fff"
li[1].style.display = "flex"
li[1].style.alignItems = "center"
a[1].style.width = "14vw"
a[1].style.height = "14vh"
a[1].style.display = "flex"
a[1].style.alignItems = "center"
a[1].style.backgroundColor = "#16191c"


li[2].style.width = "14vw"
li[2].style.height = "14vh"
li[2].style.fontSize = "3vh"
li[2].style.backgroundColor = "#fff"
li[2].style.display = "flex"
li[2].style.alignItems = "center"
a[2].style.width = "14vw"
a[2].style.height = "14vh"
a[2].style.display = "flex"
a[2].style.alignItems = "center"
a[2].style.backgroundColor = "#16191c"


// 닫기버튼
li[3].style.fontSize = "1.5vw"
li[3].style.position = "relative"
li[3].style.top = "35vh"
li[3].style.left = "40vw"
// 카테고리 나왔을 때 다시 체크 시,
li[3].addEventListener("click", function () {
  div[3].style.left = "-100vw"
})

// 보이는 카테고리
// console.dir(li)
// console.dir(ul)
ul[1].style.width = "75vw"
ul[1].style.display = "flex"
ul[1].style.flexDirection = "row"
ul[1].style.justifyContent = "space-around"
ul[1].style.alignItems = "center"