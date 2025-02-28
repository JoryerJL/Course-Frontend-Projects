function verificarLogin() {
    var usuario = document.getElementById("username").value;
    var clave = document.getElementById("password").value;

    if (usuario === "joryer" && clave === "hola123") {
        localStorage.setItem("autenticado", "true");
        window.location.href = "menu.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

if (window.location.pathname.includes("menu.html")) {
    if (localStorage.getItem("autenticado") !== "true") {
        alert("Acceso no autorizado.");
        window.location.href = "index.html";
    }
}

function cerrarSesion() {
    localStorage.removeItem("autenticado");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    cargarComentarios();
});

function agregarComentario(platillo) {
    let comentarioInput = document.getElementById(`comment-${platillo}`);
    let comentarioTexto = comentarioInput.value.trim();

    if (comentarioTexto === "") {
        alert("No puedes agregar un comentario vacío.");
        return;
    }

    let fecha = new Date();
    let fechaFormato = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;

    let comentario = {
        texto: comentarioTexto,
        fecha: fechaFormato
    };

    let comentarios = JSON.parse(localStorage.getItem(`comentarios-${platillo}`)) || [];
    comentarios.push(comentario);
    localStorage.setItem(`comentarios-${platillo}`, JSON.stringify(comentarios));

    comentarioInput.value = "";
    mostrarComentarios(platillo);
}

function mostrarComentarios(platillo) {
    let comentarios = JSON.parse(localStorage.getItem(`comentarios-${platillo}`)) || [];
    let listaComentarios = document.getElementById(`comments-${platillo}`);

    listaComentarios.innerHTML = "";

    comentarios.forEach((comentario, index) => {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <strong>${comentario.fecha}:</strong> ${comentario.texto}
            <button class="btn btn-sm btn-danger float-end" onclick="eliminarComentario('${platillo}', ${index})">X</button>
        `;
        listaComentarios.appendChild(li);
    });
}

function eliminarComentario(platillo, index) {
    let comentarios = JSON.parse(localStorage.getItem(`comentarios-${platillo}`)) || [];
    comentarios.splice(index, 1);
    localStorage.setItem(`comentarios-${platillo}`, JSON.stringify(comentarios));
    mostrarComentarios(platillo);
}

function cargarComentarios() {
    let platillos = ["bruschetta"];
    platillos.forEach(platillo => mostrarComentarios(platillo));
}

