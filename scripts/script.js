
// CARRITO //


let carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];


const ctnSectionShop = document.getElementById(`ctn-productos`);
const verCarrito = document.getElementById(`verCarrito`);
const modal = document.getElementById(`ctn-modal`);
const cantidadCarrito = document.getElementById(`cantidadCarrito`);



const crearCarrito = () =>{
    modal.innerHTML = "";
    modal.style.display = "flex";
    const modalHeader = document.createElement(`div`);
    modalHeader.className = `modal-header`;

    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;

    modal.append(modalHeader);

    const modalButton = document.createElement(`h1`);
    modalButton.innerText = "X";
    modalButton.classList = `modal-header-button`;

    modalButton.addEventListener(`click`, () =>{
        modal.style.display = "none";
    })

    modalHeader.append(modalButton);

    carrito.forEach((product)=>{
        let carritoCtn = document.createElement(`div`);
        carritoCtn.classList.add(`modal-ctn`);
        carritoCtn.innerHTML = `
        <h3>${product.nombre}</h3>
        <p class="ctn-precio">$${product.precio}</p>
        <span class="restar"> - </span>
        <p class="ctn-cantidad">${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p class="ctn-total-precio">total: $${product.cantidad*product.precio}</p>
        <span class="delete-product">❌</span>
        `
        modal.append(carritoCtn);

        let eliminar = carritoCtn.querySelector(`.delete-product`);

        eliminar.addEventListener(`click`, () =>{
            eliminarProducto(product.id);
        })


        let restar = carritoCtn.querySelector(`.restar`);

        restar.addEventListener(`click`, () =>{

            // product.cantidad !== 1 ? product.cantidad--;
            
            if(product.cantidad !== 1){
                product.cantidad--;
            }

            saveLocal();                 
            crearCarrito();
        });

        let sumar = carritoCtn.querySelector(`.sumar`);

        sumar.addEventListener(`click`, () =>{
            product.cantidad++;
            saveLocal();
            crearCarrito();
        });

        console.log(carrito.length);
    });



    const precioTotal = carrito.reduce((acc, el)=>  acc + el.precio * el.cantidad, 0);

    const total = document.createElement(`div`);
    total.classList.add(`ctn-total`);
    total.innerHTML = `Total: $${precioTotal}`;

    modal.append(total);

};


verCarrito.addEventListener(`click`, crearCarrito);


const eliminarProducto = (id) =>{
const foundId = carrito.find((element) => element.id === id);
console.log("🚀 ~ file: carrito.js:139 ~ eliminarProducto ~ foundId:", foundId)

carrito = carrito.filter((carritoId) =>{
    return carritoId !== foundId;
});

crearCarrito();
saveLocal()
carritoCounter();
};

const carritoCounter = () =>{
cantidadCarrito.style.display = `block`;

const carritoLength = carrito.length;

localStorage.setItem(`carritoLength`, JSON.stringify(carritoLength));

cantidadCarrito.innerText = JSON.parse(localStorage.getItem(`carritoLength`));
};

const saveLocal = () =>{
localStorage.setItem(`carrito`, JSON.stringify(carrito));
};

carritoCounter();


// BUSCADOR
let barsSearch = document.getElementById("ctn-bars-search");
let inputSeach = document.getElementById("inputSearch");
let boxSearch = document.getElementById("box-search");

//creando filtrado de busqueda
const buscadorInterno = () => {
    let filter = inputSeach.value.toUpperCase();
    let li = boxSearch.getElementsByTagName("li");

// recorriendo elementos a filtrar
    for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    let textValue = a.textContent || a.innerText;

    if (textValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        boxSearch.style.display = "block";
        if (inputSeach.value === "") {
        boxSearch.style.display = "none";
        }
    }else{
        li[i].style.display = "none";
    }
    }
};

//activar funcion
document.getElementById("inputSearch").addEventListener("keyup", buscadorInterno);