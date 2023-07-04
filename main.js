let carrito = [];
let productos = document.querySelector("#contenedor-productos");
let bolsaProductosClass = document.querySelector(".carrito-items-compras")
/*fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        marcarProductos(productos);
        agregarBolsa(productos);
    });*/
    const productosData = "./productos.json"
    async function getData() {
        const res = await fetch(productosData);
        const data = await res.json();
        return data;
    }


// DOM
const contenedorProductos = document.querySelector("#contenedor-productos"); //1 ID TARJETAS DE PRODUCTOS
let botonItemAgregar = document.querySelectorAll("#btn-agregar"); //2 BOTON AGREGAR DE LA TARJETA

const botonesBolsa = document.querySelectorAll(".carrito-item"); //3 AGREGADOS A TU BOLSA
const numeritoBolsa = document.querySelector("#numeritoBolsa"); //4
const cantidadBoton = document.querySelector("#cantidad-btn");

async function marcarProductos() {  //1 ID TARJETAS DE PRODUCTOS - ARRAY
const dataBase = await getData()
    contenedorProductos.innerHTML = "";

    dataBase.forEach(producto => {
        let div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
                             <span class="titulo-item">${producto.titulo}</span>
                             <img class="img-items" src="${producto.img}" alt="
                             ${producto.titulo}" >
                             <span class="precio-item">$${producto.precio}</span>
                             <button  class="boton-item" id="${producto.id}">Agregar</button> 
                        `;
        //2 BOTON AGREGAR DE LA TARJETA
        contenedorProductos.appendChild(div);
    })
    actualizarBotonItemAgregar();
}
window.onload = marcarProductos();

//3 AGREGADOS A TU BOLSA - FOREACH BOTON
botonesBolsa.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesBolsa.forEach(boton => boton.classList.remove("active"));
        e.target.classList.add("active");

        if (e.target.id != "cantidadBoton") {
            const botonProductos = productos.filter(producto => producto.id === e.currentTarget.id);
            marcarProductos(productos);
        } else {
            marcarProductos(productos);
        }
    })
});

// BOTON AGREGAR PRODUCTOS A LA BOLSA   // const 3
function actualizarBotonItemAgregar() {
    botonItemAgregar = document.querySelectorAll(".boton-item");

    botonItemAgregar.forEach(boton => {
        boton.addEventListener("click", agregarBolsa);
    });
}

botonItemAgregar.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonItemAgregar.forEach(boton => boton.classList.remove("active"));
        e.target.classList.add("active");

        if (e.target.id != "cantidadBoton") {
            const botonProductos = productos.filter(producto => producto.id === e.currentTarget.id);
            marcarProductos(productosos);
        } else {
            marcarProductos(productos);
        }
    })
});

let productosBolsa;
let productosEnBolsa = localStorage.getItem("carrito");
if (productosEnBolsa) {
    let carrito = [];
    carrito = JSON.parse(productosEnBolsa);
    numeroBolsa();
} else {
    
}


async function agregarBolsa(e) {

    Toastify({
        text: "PRODUCTO AGREGADO A LA BOLSA",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, coral, lightcoral)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const dataBaseProducto = await getData();
    
   
    const productoAgregado = carrito.some(producto => producto.id === idBoton);
    if (productoAgregado) {
        const index = carrito.findIndex(producto => producto.id === idBoton);
        carrito[index].unidades++;
    } else {
        
        const productoAgregado = dataBaseProducto.find(producto => producto.id === idBoton);
        productoAgregado.unidades = 1;
        carrito.push(productoAgregado);
    }
    cargarProductosBolsa();
    numeroBolsa();
    localStorage.setItem("productos-bolsa", JSON.stringify(carrito));
}

function numeroBolsa() {
    let numeritoNuevo = carrito.reduce((acc, producto) => acc + producto.unidades, 0);
    numeritoBolsa.innerText = numeritoNuevo;
}


//  BOLSA DE COMPRAS
localStorage.getItem("carrito");


const bolsaProductos = document.querySelector("#bolsa-productos");
const bolsaTotal = document.querySelector("#bolsa-total");
let btnEliminar = document.querySelectorAll("#botonliminar");
const total = document.querySelector("#bolsa-total");
const sumarLaCantidad = document.querySelector(".sumar-cantidad");
const restarLaCantidad = document.querySelector(".restar-cantidad");

cargarProductosBolsa();

function cargarProductosBolsa() {
    if (carrito && carrito.length > 0) {
        
        bolsaProductos.classList.add("carrito-items-compras");
        bolsaTotal.classList.add("carrito-total");

        bolsaProductos.innerHTML = "";

        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.className = "carrito-item";
            div.innerHTML = `
             <img src="${producto.img}" alt="${producto.titulo}" width="80px">
                  <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${producto.titulo}</span>
                    <div class=${producto.unidades}>
                        <i class="bi bi-dash restar-cantidad"></i>
                        <input type="text" value="1" class="carrito-item-cantidad" disabled>
                        <i class="bi bi-plus sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">$${producto.precio * producto.unidades}</span>
                  </div>
                <span id="${producto.id}" class="btn-eliminar">
                   <i class="bi bi-trash2"></i>
                </span>
             `;
            bolsaProductos.appendChild(div);

        })

    } else {
        bolsaProductos.classList.add("carrito-items-compras");
        bolsaTotal.classList.add("carrito-total");
    }

    actualizarBotonItemEliminar();
    totalActualizado();
}



const sumarCantidad = document.querySelector(".sumar-cantidad");
const restarCantidad = document.querySelector(".restar-cantidad");
const cantidadInput = document.querySelector(".carrito-item-cantidad");

sumarCantidad.addEventListener("click", () => {
    let cantidad = parseInt(cantidadInput.value);
    cantidad += 1;
    cantidadInput.value = cantidad;
});

restarCantidad.addEventListener("click", () => {
    let cantidad = parseInt(cantidadInput.value);
    if (cantidad > 1) {
        cantidad -= 1;
        cantidadInput.value = cantidad;
    }
});



function actualizarBotonItemEliminar() {
    btnEliminar = document.querySelectorAll(".btn-eliminar");

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDeLaBolsa);
    });
}

btnEliminar.forEach(boton => {
    boton.addEventListener("click", (e) => {

        btnEliminar.forEach(boton => boton.classList.remove("active"));
        e.target.classList.add("active");

        if (e.target.id != "cantidadBoton") {
            const botonProductos = productos.filter(producto => producto.id === e.currentTarget.id);
            marcarProductos(productos);
        } else {
            marcarProductos(productos);
        }
    })
});

function totalActualizado() {
    const calculoTotal = carrito.reduce((acc, producto) => acc + (producto.unidades * producto.precio), 0);
    total.innerText = `$${calculoTotal}`;

}

function eliminarDeLaBolsa(e) {
    Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        text: 'Se eliminará de tu bolsa de compras',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const idBoton = e.currentTarget.id;
            const index = carrito.findIndex(producto => producto.id === idBoton);
            carrito.splice(index, 1);
            cargarProductosBolsa();
            localStorage.setItem("carrito", JSON.stringify(carrito));
            Swal.fire('Producto eliminado', '', 'success');
        }
    });
    const idBoton = e.currentTarget.id;
    const index = carrito.findIndex(producto => producto.id === idBoton);

    carrito.splice(index, 1);
    cargarProductosBolsa();

    localStorage.setItem(".carrito", JSON.stringify(carrito));
}

function numeroBolsa() {
    let numeritoNuevo = carrito.reduce((acc, producto) => acc + producto.unidades, 0);
    numeritoBolsa.innerText = numeritoNuevo;

    let totalPrecio = carrito.reduce((acc, producto) => acc + (producto.precio * producto.unidades), 0);
    total.innerText = `$${totalPrecio}`;
}
