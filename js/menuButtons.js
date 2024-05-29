// Menu 
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

// Filter buttons 
const sortButton = document.querySelector('.sort');
const filterButton = document.querySelector('.filter');

// Contenedores
const listFilter = document.querySelector('.list-filter');
const listSort = document.querySelector('.list-sort');

filterButton.addEventListener('click', e => {
    e.preventDefault();
    if(listFilter.classList.contains('show')) {
        listFilter.classList.remove('show')
    } else {
        listFilter.classList.add('show')
    }
})

sortButton.addEventListener('click', e => {
    e.preventDefault();
    if(listSort.classList.contains('show')) {
        listSort.classList.remove('show')
    } else {
        listSort.classList.add('show')
    }
})