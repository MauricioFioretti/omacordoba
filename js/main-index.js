//seleccionamos el body, creamos el main y lo agregamos
const body = document.querySelector("body")
const main = document.createElement("main")
main.className = "main__libros"
body.appendChild(main)

//creamos y agregamos el section title
const sectionTitle = document.createElement("section")
sectionTitle.className = "compra__libros"
main.appendChild(sectionTitle)

//creamos y agregamos el title h1
const titleLibros = document.createElement("h1")
titleLibros.innerText = "¡Bienvenido al portal de libros de olimpiadas!"
sectionTitle.appendChild(titleLibros)

//creamos y agregamos el p description
const descriptionP = document.createElement("p")
descriptionP.innerText = "En esta sección podrás ver los libros con sus portadas, ver su precio y agregarlos a un carrito de compras que aparecerá al final de la página."
sectionTitle.appendChild(descriptionP)

//creamos el contenedor de las cards de una especie de libros
const sectionNandu = document.createElement("section")
sectionNandu.className = "nandu"
main.appendChild(sectionNandu)

//creamos el contenedor para las cards
const divCards = document.createElement("div")
divCards.className = "container-cards"
sectionNandu.appendChild(divCards)

//creamos cada card con el fetch
const promesa = fetch("/libros.json")
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
        for (obj of respuesta) {
            const card = document.createElement("div")
            const precioLibro = obj.precio
            const nombreLibro = obj.alt
            card.className = "card"
            card.innerHTML = `
            <img src="${obj.src}" class="card-img-top" alt="${nombreLibro}">
            <div class="card-body">
                <h5 class="card-title">${nombreLibro}</h5>
                <hr>
                $${precioLibro}
                <button type="button" class="btn btn-success" id="agregar-carrito">Agregar al carrito</button>
            </div>
            `
            const botonAgregarCarrito = card.querySelector("#agregar-carrito")
            botonAgregarCarrito.addEventListener("click", () => agregarAlCarrito(nombreLibro, precioLibro))

            if (obj.disponibilidad === "si") {
                divCards.appendChild(card)
            }
        }
    }
    )

//Comienzan las funciones para agregar productos al carrito
const agregarAlCarrito = (nombre, precio) => {
    let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []

    const productoExistente = carrito.find(item => item.nombre === nombre)

    if (!productoExistente) {
        carrito.push({ nombre, precio })
        localStorage.setItem("carrito", JSON.stringify(carrito))

        Toastify({
            text: `El producto ${nombre} fue agregado correctamente.`,
            duration: 2000,
            style: { background: "linear-gradient(to right, #1146ff, #3396DA)" }
        }).showToast()

        actualizarTablaCarrito()
    } else {
        Toastify({
            text: `El producto ${nombre} ya fue agregado al carrito.`,
            duration: 2000,
            style: { background: "linear-gradient(to right, #D43377, #EB79A9)" }
        }).showToast()
    }
}

//Empieza la creacion de la tabla que muestra los pruductos del carrito
//creamos y agregamos una tabla
const tabla = document.createElement("table")
tabla.className = "table"
main.appendChild(tabla)

//creamos y agregamos los items de la tabla
const thead = document.createElement("thead")
thead.innerHTML = ` <thead>
                        <tr>
                            <th scope="col">Nombre del libro</th>
                            <th scope="col">Disponibilidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Eliminar Articulo</th>
                        </tr>
                    </thead>`
tabla.appendChild(thead)

const tbody = document.createElement("tbody")
tabla.appendChild(tbody)


//Actualizacion de la tabla con los productos
const actualizarTablaCarrito = () => {
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = ""
    let acumulador = 0

    const productos = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []

    if (productos.length > 0) {
        main.appendChild(botonEliminarTodos)
        main.appendChild(botonFinalizarCompra)
    }

    for (const item of productos) {
        const nombre = item.nombre
        const precio = item.precio
        acumulador += precio
        const fila = document.createElement("tr")
        fila.innerHTML = `  <td>${nombre}</td>
                            <td>Si disponible</td>
                            <td>$${precio}</td>
                            <td><button type="button" class="btn btn-secondary" id="eliminar">Eliminar</button></td>`
        tbody.appendChild(fila)
    }

    const totalFila = document.createElement("tr")
    totalFila.innerHTML = ` <td>------</td>
                            <td>TOTAL</td>
                            <td>$${acumulador}</td>
                            <td>------</td>`
    tbody.appendChild(totalFila)
}

//Empeiza la creacion de eliminar productos individualmente
const eliminarDelCarrito = (nombre) => {
    let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
    carrito = carrito.filter((item) => item.nombre !== nombre) //Actualizo el carrito pero sin el libro buscado
    if (carrito.length === 0) {
        botonEliminarTodos.remove()
        botonFinalizarCompra.remove()
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarTablaCarrito()
}

tbody.addEventListener("click", (event) => {
    if (event.target.id === "eliminar") {
        const fila = event.target.closest("tr") // Obtiene la fila padre del botón clickeado
        const nombreLibro = fila.querySelector("td:first-child").textContent // Obtiene el nombre del libro de la fila
        eliminarDelCarrito(nombreLibro) //Llama a la funcion que se encarga de remover el elemento del local Storage
        fila.remove() // Elimina la fila de la tabla
    }
})


//Empeiza la creacion de eliminar todos productos
const botonEliminarTodos = document.createElement("button")
botonEliminarTodos.innerText = "Eliminar Todos"
botonEliminarTodos.className = "btn btn-danger boton-eliminar"

const eliminarTodosLosProductos = () => {
    // Elimino todos los productos del carrito
    localStorage.removeItem("carrito")
    // Actualizo la tabla para reflejar la eliminación
    actualizarTablaCarrito()
    botonEliminarTodos.remove()
    botonFinalizarCompra.remove()
}
botonEliminarTodos.addEventListener("click", eliminarTodosLosProductos)


//Empeiza la creacion de Finalizar compra
const botonFinalizarCompra = document.createElement("button")
botonFinalizarCompra.innerText = "Finalizar Compra"
botonFinalizarCompra.className = "btn btn-primary boton-finalizar"

botonFinalizarCompra.addEventListener("click", () => {
    // Mostrar SweetAlert para confirmar la compra
    Swal.fire({
        title: '¿Estás seguro de finalizar la compra?',
        text: 'Una vez finalizada, todos los productos del carrito serán eliminados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma la compra, eliminar todos los productos del carrito y los botones
            localStorage.removeItem("carrito")
            actualizarTablaCarrito()
            botonEliminarTodos.remove()
            botonFinalizarCompra.remove()
            Swal.fire(
                'Compra Finalizada',
                '¡Gracias por tu compra!',
                'success'
            )
        }
    })
})


actualizarTablaCarrito()