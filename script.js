document.addEventListener('DOMContentLoaded', cargaInicial);
Swal.fire({
    html: `<h1>Bienvenido a Todo Discos</h1>
    <br>
    <br>
    `,
});

function cargaInicial(){

    cargarCarritoDeLocalStorage();
    renderizarProductos()
    renderizarCarrito()

}

let carrito = [];

function renderizarProductos(){

    const tienda = document.getElementById("tienda");

    BBDD.forEach(producto =>{
    
        const div = document.createElement("div");

        div.classList.add('col-12');
        div.classList.add('col-md-3');
        div.classList.add('mb-5');
        div.classList.add('d-flex');
        div.classList.add('justify-content-center');

        const img = producto.img;
        const nombre = producto.nombre;
        const precio = producto.precio;
        const id = producto.id;

        div.innerHTML = `
        
        <div>
        <img class="ddiv" src="${img}">
        <div>
            <p>${nombre}<p>
            <p class="ddiv">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, quos? Aspernatur laboriosam, ea voluptatum alias nulla dolorem sit! Ab nulla harum saepe quia rerum deserunt neque ullam a corporis optio!</p>
            <p>${precio}$</p>
            <button class="boton" id="${id}">Agregar a compras</button>
        </div>
        </div>

        `

        tienda.appendChild(div);

        const boton = document.getElementById(`${id}`);
        
        boton.addEventListener('click', ()=>{
        
            agregarProductoAlCarrito(id);
        })


    });
}

function agregarProductoAlCarrito(id){

    console.log(id);
     
    let producto = BBDD.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    function cargarCarrito() {
        productoEnCarrito.cantidad++;
        console.log(carrito);
        console.log("agregando más items");
    }

    function unCarrito() {
        producto.cantidad = 1;
        carrito.push(producto)
        console.log(carrito);
        console.log("primer item");
    }

    productoEnCarrito ? cargarCarrito() : unCarrito(); //no se si queda bien pero probé el ternario de esa forma

    renderizarCarrito()
    guardarCarritoEnLocalStorage();

}


function renderizarCarrito(){

    const carritoHTML = document.getElementById('carrito');

    let html = '';

    carrito.forEach((producto, id)=>{
    
        html += `
             <div>
                 <div>
                     <img src="${producto.img}">
                     <div>
                         <p>${producto.nombre}</p>
                         <p>${producto.precio}$</p>
                         <p>Cantidad: ${producto.cantidad}</p>
                         <button onClick="eliminarProductoDelCarrito(${id})">Eliminar</button>
                     </div>
                 </div>
             </div>
             `
     
             ;
    })

    carritoHTML.innerHTML = html 
}


function eliminarProductoDelCarrito(id){

    console.log(carrito[id].cantidad)
    carrito[id].cantidad--;
    console.log(carrito[id].cantidad)

    if(carrito[id].cantidad === 0){
        
        carrito.splice(id, 1);
    }

    guardarCarritoEnLocalStorage();
    renderizarCarrito();

}


function guardarCarritoEnLocalStorage () {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
    if (localStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
}
