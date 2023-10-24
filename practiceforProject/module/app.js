// 메뉴 항목에 대한 클릭 이벤트 처리
const menuItems = document.querySelectorAll("ul#menu li a");
menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
        console.dir(event)
        event.preventDefault();
        // a태그에는 링크로 연결하는 동작이 default값으로 설정되어있는데, preventDefault를 사용하면 이 동작을 막고 아래에 작성한 동작을 실행함.
        const targetId = event.target.getAttribute("href").substring(1); // # 제거
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// 스크롤 이벤트를 사용하여 메뉴 고정
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});