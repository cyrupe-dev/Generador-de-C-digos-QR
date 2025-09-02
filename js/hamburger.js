const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');

// Alternar el menú cuando se hace clic en el hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
const menuItems = document.querySelectorAll('.menu li a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        // También debemos desmarcar el checkbox
        menuToggle.checked = false;
    });
});