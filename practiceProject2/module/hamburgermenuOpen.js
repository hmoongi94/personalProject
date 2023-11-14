const menuIcon = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('open');
});