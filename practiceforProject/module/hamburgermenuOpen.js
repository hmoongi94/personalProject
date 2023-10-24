// 햄버거 메뉴 아이콘 상호작용을 위한 코드
const menuIcon = document.querySelector('.hamburger-menu');
menuIcon.addEventListener('click', () => {
    // 여기에 메뉴 토글 로직을 추가하세요.
    // 예를 들어, 메뉴를 펼치거나 접는 동작을 구현할 수 있습니다.
    // 아래는 간단한 예시입니다.
    menuIcon.classList.toggle('open');
});