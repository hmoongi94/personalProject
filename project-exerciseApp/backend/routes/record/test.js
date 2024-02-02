const currentDate = new Date();
console.log(currentDate)
const options = { year: "numeric", month: "numeric", day: "numeric" };
const formattedDate = currentDate.toLocaleDateString("ko-KR", options);
console.log(formattedDate)