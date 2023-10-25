// dark-mode.js
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const dayModeIcon = document.getElementById('day-mode-icon');

darkModeToggle.addEventListener('click', () => {
    const currentMode = darkModeToggle.getAttribute('data-mode');

    // 모드 토글
    if (currentMode === 'day') {
        darkModeToggle.setAttribute('data-mode', 'dark');
        body.classList.remove('day-mode');
        dayModeIcon.src = './img/dark-icon.png';
        dayModeIcon.style.marginLeft = "50px";
    } else {
        darkModeToggle.setAttribute('data-mode', 'day');
        body.classList.add('day-mode');
        dayModeIcon.src = './img/day-icon.png';
        dayModeIcon.style.marginLeft= "0px";
    }
});

// 사용자의 환경 설정에 따라 초기 모드 설정
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkModeToggle.setAttribute('data-mode', 'dark');
    body.classList.add('dark-mode');
    darkModeIcon.src = 'dark-icon.png';
}
