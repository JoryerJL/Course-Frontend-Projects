// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

// Función para simular la escritura de datos (como si guardáramos en un archivo JSON)
function escribirDatos(nuevosDatos, callback) {
    setTimeout(() => {
        biblioteca = nuevosDatos;
        callback();
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("\n📚 Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };

    leerDatos((datos) => {
        datos.libros.push(nuevoLibro); // agregamos el nuevo libro
        escribirDatos(datos, () => {
            console.log(`✅ Libro "${titulo}" agregado correctamente.`);
        });
    });
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    leerDatos((datos) => {
        const libro = datos.libros.find(l => l.titulo === titulo);
        if (libro) {
            libro.disponible = nuevoEstado;
            escribirDatos(datos, () => {
                console.log(`🔄 Estado del libro "${titulo}" actualizado a: ${nuevoEstado ? 'Disponible' : 'Prestado'}`);
            });
        } else {
            console.log(`❌ Libro "${titulo}" no encontrado.`);
        }
    });
}

// Simulación del flujo de la aplicación
mostrarLibros();

setTimeout(() => {
    agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
}, 1500);

setTimeout(() => {
    actualizarDisponibilidad("1984", false);
}, 3000);

setTimeout(() => {
    mostrarLibros();
}, 5000);
