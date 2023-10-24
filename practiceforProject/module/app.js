// 메뉴 항목에 대한 클릭 이벤트 처리
const menuItems = document.querySelectorAll("ul#menu li a");
menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
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