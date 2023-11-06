document.addEventListener("DOMContentLoaded", function() {
    const todoContainer = document.querySelector(".todo-container");
    const doingContainer = document.querySelector(".doing-container");
    const doneContainer = document.querySelector(".done-container");

    function guardarPublicacion(contenido, estado) {
        const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        publicaciones.push({ contenido, estado });
        localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
        mostrarPublicaciones();
    }

    function mostrarPublicaciones() {
        const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        todoContainer.innerHTML = ""; //
        doingContainer.innerHTML = ""; //
        doneContainer.innerHTML = ""; //

        if (todoContainer.childElementCount === 0) {
            todoContainer.innerHTML = "<h2>To Do</h2>";
        }
        if (doingContainer.childElementCount === 0) {
            doingContainer.innerHTML = "<h2>Doing</h2>";
        }
        if (doneContainer.childElementCount === 0) {
            doneContainer.innerHTML = "<h2>Done</h2>";
        }

        for (let i = 0; i < publicaciones.length; i++) {
            const publicacion = publicaciones[i];
            const cuadro = document.createElement("div");
            cuadro.classList.add("cuadro");
            cuadro.innerHTML = `
                <span class="close-button">X</span>
                <p class="cuadro-content">${publicacion.contenido}</p>
                <button class="red-button"></button>
                <button class="blue-button"></button>
            `;

            cuadro.querySelector(".close-button").addEventListener("click", () => cerrarCuadro(i));
            cuadro.querySelector(".red-button").addEventListener("click", () => moverTarjeta(i, "left"));
            cuadro.querySelector(".blue-button").addEventListener("click", () => moverTarjeta(i, "right"));

            if (publicacion.estado === "todo") {
                todoContainer.appendChild(cuadro);
            } else if (publicacion.estado === "doing") {
                doingContainer.appendChild(cuadro);
            } else if (publicacion.estado === "done") {
                doneContainer.appendChild(cuadro);
            }
        }
    }

    const publicacionForm = document.querySelector(".task-form");
    const contenidoInput = document.querySelector(".contenido");

    publicacionForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const contenido = contenidoInput.value;
        guardarPublicacion(contenido, "todo");
        contenidoInput.value = "";
        mostrarPublicaciones();
    });

    function cerrarCuadro(index) {
        const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        publicaciones.splice(index, 1);
        localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
        mostrarPublicaciones();
    }

    function moverTarjeta(index, direccion) {
        const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
        const publicacion = publicaciones[index];

        if (direccion === "left") {
            if (publicacion.estado === "doing") {
                publicacion.estado = "todo";
            } else if (publicacion.estado === "done") {
                publicacion.estado = "doing";
            }
        } else if (direccion === "right") {
            if (publicacion.estado === "todo") {
                publicacion.estado = "doing";
            } else if (publicacion.estado === "doing") {
                publicacion.estado = "done";
            }
        }

        localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
        mostrarPublicaciones();
    }

    mostrarPublicaciones();
});
