// Menu 
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

// Filter buttons 
const sortBtn = document.querySelector('.sort');
const filterBtn = document.querySelector('.filter');

const openListButtons = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('filter')) {
        listFilter.classList.toggle('show')
    } else {
        listSort.classList.toggle('show');
    }
}

// Sort
const listSort = document.querySelector('.list-sort');
sortBtn.addEventListener('click', openListButtons);

// Function Sort
function sortProducts(order) {
    let products = Array.from(document.querySelectorAll('.container-all-shoes > .container-each-shoe'));
    
    products.sort((a, b) => {
        let priceA = parseFloat(a.getAttribute('data-price'));
        let priceB = parseFloat(b.getAttribute('data-price'));
        
        if (order === 'asc') {
            return priceA - priceB; // Ordenar de menor a mayor
        } else {
            return priceB - priceA; // Ordenar de mayor a menor
        }
    });
    
    // Actualizar el DOM con los productos ordenados
    let container = document.querySelector('.container-all-shoes');
    container.innerHTML = ''; // Limpiar el contenedor
    products.forEach(product => {
        container.appendChild(product); // Añadir los productos ordenados
    });
}

// Sort list buttons
const btnLowToHigh = document.querySelector('.low-high');
const btnHighToLow = document.querySelector('.high-low');

// Eventos para ordenar de menor a mayor y viceversa
btnLowToHigh.addEventListener('click', () => sortProducts('asc'));
btnHighToLow.addEventListener('click', () => sortProducts('desc'));

// Filter 
const listFilter = document.querySelector('.list-filter');
filterBtn.addEventListener('click', openListButtons);

// Filter list buttons inside---Brand
const btnBrand = document.querySelector('.brand');
const listBrand = document.querySelector('.list-brand');

btnBrand.addEventListener('click', e => {
    e.preventDefault();
    if(listBrand.classList.contains('show-unDisplay')) {
        listBrand.classList.remove('show-unDisplay')
    } else {
        listBrand.classList.add('show-unDisplay')
    }
})

// Event
listBrand.addEventListener('click', (e) => {
    e.preventDefault();
    let catProduct = e.target.getAttribute('category');

    filterProducts(catProduct);
})

// Filter Function
function filterProducts(category) {
    let products = document.querySelectorAll('.container-all-shoes > .container-each-shoe');
    
    if (category === 'all') {
        products.forEach(product => {
            product.style.display = 'flex'; // Mostrar todos los productos
        });
    } else {
        products.forEach(product => {
            if (product.getAttribute('category') === category) {
                product.style.display = 'flex'; // Mostrar productos de la categoría seleccionada
            } else {
                product.style.display = 'none'; // Ocultar productos de otras categorías
            }
        });
    }
}