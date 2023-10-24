// 메뉴 항목에 대한 클릭 이벤트 처리
const menuItems = document.querySelectorAll("ul#menu li a");
menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
        console.dir(event)
        event.preventDefault();
        // a태그에는 링크로 연결하는 동작이 default값으로 설정되어있는데, preventDefault를 사용하면 이 동작을 막고 아래에 작성한 동작을 실행함.
        const targetId = event.target.getAttribute("href").substring(1); // # 제거
        // getAttribute로 href의 문자열을 전부 가져오고 substring으로 문자열을 추출하는데 #category1과 같이 #은 추출하고 싶지 않으므로 substring(1)을 사용하여 인덱스1번부터의 문자열을 추출한다.
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          // scrollTo(option)메서드의 옵션은 top, left, behavior: auto/smooth로 설정됨. top,left는 px단위로 설정이 가능함.
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