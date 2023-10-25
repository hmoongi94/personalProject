// dark-mode.js
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const darkModeIcon = document.getElementById('dark-mode-icon');
const h1Elements = document.querySelectorAll("h1")
const topMenu = document.getElementById("topmenu")
const menuLinks = document.querySelectorAll('#menu li a');

darkModeToggle.addEventListener('click', () => {
  const currentMode = darkModeToggle.getAttribute('data-mode');

  // 모드 토글
  if (currentMode === 'day') {
    darkModeToggle.setAttribute('data-mode', 'dark');
    body.classList.remove('day-mode');
    topMenu.style.color = "white";
    menuLinks.forEach(link => {
      // 스타일 변경
      link.style.color = 'white'; // 원하는 색상으로 변경
    });
    h1Elements.forEach((h1) => {
      h1.classList.remove('font-color-black')
    })
    darkModeIcon.src = './img/day-icon.png';
  } else {
    darkModeToggle.setAttribute('data-mode', 'day');
    body.classList.add('day-mode');
    topMenu.style.color = "#232529";
    menuLinks.forEach(link => {
      // 스타일 변경
      link.style.color = '#232529'; // 원하는 색상으로 변경
    });
    h1Elements.forEach((h1) => {
      h1.classList.add('font-color-black')
    })
    darkModeIcon.src = './img/dark-icon.png';
  }
});

// 사용자의 환경 설정에 따라 초기 모드 설정
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkModeToggle.setAttribute('data-mode', 'dark');
  body.classList.add('dark-mode');
  darkModeIcon.src = './img/day-icon.png';
}
