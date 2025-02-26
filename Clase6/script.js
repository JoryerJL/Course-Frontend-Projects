function addComment() {
    const input = document.getElementById("commentInput");
    const commentText = input.value.trim();
    if (commentText === "") return; // No agregar comentarios vacíos

    const commentsContainer = document.getElementById("commentsContainer");

    // Crear contenedor del comentario y la fecha
    const commentWrapper = document.createElement("div");
    commentWrapper.classList.add("comment-wrapper");

    // Crear comentario
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    // Crear botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => commentWrapper.remove(); // Eliminar todo el contenedor

    // Agregar fecha y hora
    const now = new Date();
    const timestamp = document.createElement("p");
    timestamp.classList.add("date");
    timestamp.innerText = `Publicado el ${now.toLocaleDateString()} a las ${now.toLocaleTimeString()}`;

    // Insertar el comentario
    const commentTextElement = document.createElement("p");
    commentTextElement.innerText = commentText;

    // Construir la estructura
    commentDiv.appendChild(commentTextElement);
    commentDiv.appendChild(deleteBtn);
    commentWrapper.appendChild(commentDiv);
    commentWrapper.appendChild(timestamp);

    commentsContainer.appendChild(commentWrapper);

    // Limpiar el input
    input.value = "";
}

