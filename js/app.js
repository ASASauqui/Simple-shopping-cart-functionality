// -----------------Variables-----------------
const cart = document.querySelector("#carrito");
const cartContainer = document.querySelector("#lista-carrito tbody");
const clearCartBtn = document.querySelector("#vaciar-carrito");
const courseList = document.querySelector("#lista-cursos");
let shoppingCart = [];



// -----------------Listeners-----------------
loadEventListeners();
function loadEventListeners(){
    // Agregar curso al presionar el botón agregar carrito.
    courseList.addEventListener("click", addCourse);

    // Eliminar cursos del carrito.
    cart.addEventListener("click", deleteCourse);

    // Cuando cargue la página.
    document.addEventListener("DOMContentLoaded", () => {
        // Obtener cursos del local storage.
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

        // Mostrar cursos.
        HTMLCart();
    });

    // Vaciar carrito de compras.
    clearCartBtn.addEventListener("click", () => {
        shoppingCart = [];  // Resetear arreglo.
        clearHTMLCart();    // Eliminar todo el HTML.
    });
}



// -----------------Funciones-----------------
// Añadir curso al carrito de compras.
function addCourse(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        const selectedCourse = e.target.parentElement.parentElement;
        readCourseData(selectedCourse);
    }
}

// Eliminar curso del carrito de compras.
function deleteCourse(e){
    if(e.target.classList.contains("borrar-curso")){
        const courseID = e.target.getAttribute("data-id");

        // Eliminar del arreglo del carrito de compras por el data-id.
        shoppingCart = shoppingCart.filter( (_course) => _course.idCourse !== courseID );

        // Mostrar HTML.
        HTMLCart();
    }
}
    

// Leer info del curso.
function readCourseData(course){
    // Crear objeto con el contenido del curso seleccionado.
    const courseInfo = {
        idCourse: course.querySelector("a").getAttribute("data-id"),
        img: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".precio span").textContent,
        amount: 1
    }

    // Comprobar si el elemento ya está en el carrito.
    const articleExists = shoppingCart.some( (_course) => _course.idCourse === courseInfo.idCourse );

    if(articleExists){
        const courses = shoppingCart.map( (_course) => {
            if(_course.idCourse === courseInfo.idCourse){
                _course.amount++;
                return _course;
            }
            else{
                return _course;
            }
        });

        shoppingCart = [...courses];
    }
    else{
        // Agregar elemento al arreglo del carrito.
        shoppingCart.push(courseInfo);
    }

    // Hacer el HTML del carrito.
    HTMLCart();
}

// Crear HTML del carrito.
function HTMLCart(){
    // Limpiar el HTML del carrito.
    clearHTMLCart();

    // Iterar por cada curso que haya en el carrito de compra.
    shoppingCart.forEach( (course) => {
        const {idCourse, img, title, price, amount} = course;
        
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <img src="${img}" width="100">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${idCourse}"> X </a>
            </td>
        `;

        // Agregar el HTML del carrito en el tbody.
        cartContainer.appendChild(row);
    });

    // Agregar el carrito de compras al local storage.
    syncLocalStorage();
}

// Limpiar HTML del carrito de compras.
function clearHTMLCart(){
    while(cartContainer.firstChild){
        cartContainer.removeChild(cartContainer.firstChild);
    }
}

// Sincronizar con el local storage.
function syncLocalStorage(){
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}