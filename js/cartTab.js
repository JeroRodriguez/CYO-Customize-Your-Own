let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.container-all-shoes');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('showCart');
})

closeCart.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0) {
        listProducts.forEach( product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('container-each-shoe');
            newProduct.setAttribute("data-price", `${product.price}`);
            newProduct.setAttribute("category", `${product.brand}`);
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <div class="container-each-shoe-img">
                <img src="${product.image}" alt="${product.name}" class="img-each-shoe"/>
            </div>
            <div class="information-shoe">
                <p class="information-shoe-name">${product.name}</p>
                <p class="information-shoe-brand">${product.brand}</p>
                <p class="information-shoe-price">$${product.price}</p>
            </div>
            <a href="" class="btn-add add">Add to Cart</a>`;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', e => {
    e.preventDefault();

    let positionClick = e.target;

    if(positionClick.classList.contains('add')) {
        positionClick = e.target.parentElement;

        let product_id = positionClick.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id)
    if(carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0 ) {
        carts.forEach( cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex(value => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="img">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="name">
                    ${info.brand} ${info.name}
                </div>
                <div class="totalPrice">
                    $${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        listCartHTML.appendChild(newCart)
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (e) => {
    e.preventDefault();

    let positionClick = e.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0) {
        switch (type) {
            case 'plus': 
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1)
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () => {
    // get data from JSON
    fetch('products.json')
    .then(response => response.json()) 
    .then(data => {
        listProducts = data;
        addDataToHTML();

        // get cart from memory
        if(localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();