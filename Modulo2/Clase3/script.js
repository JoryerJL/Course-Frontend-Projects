// Arreglo de productos
const productos = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" },
    { nombre: "Auriculares", precio: 30, categoria: "Electrónica" },
    { nombre: "Mochila", precio: 90, categoria: "Accesorios" }
];

// 1. Filtrar productos con precio menor a $100
const productosBaratos = productos.filter(producto => producto.precio < 100);
console.log("Productos con precio menor a $100:", productosBaratos);

// 2. Ordenar alfabéticamente por nombre
const productosOrdenados = productosBaratos.sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log("Productos ordenados alfabéticamente:", productosOrdenados);

// 3. Obtener solo los nombres de los productos
const nombresProductos = productosOrdenados.map(producto => producto.nombre);
console.log("Nombres de los productos filtrados y ordenados:", nombresProductos);

// 4. Usando reduce para calcular el total de los productos filtrados
const totalPrecio = productosBaratos.reduce((total, producto) => total + producto.precio, 0);
console.log("Suma total de los productos filtrados:", totalPrecio);

// 5. Usando some para verificar si hay algún producto de la categoría 'Ropa'
const hayRopa = productosBaratos.some(producto => producto.categoria === "Ropa");
console.log("¿Hay productos de la categoría 'Ropa' en la lista filtrada?", hayRopa);

// 6. Usando every para verificar si todos los productos filtrados cuestan menos de $100
const todosMenosDe100 = productosBaratos.every(producto => producto.precio < 100);
console.log("¿Todos los productos filtrados cuestan menos de $100?", todosMenosDe100);

// 7. Usando includes para verificar si "Libro" está en la lista final de nombres
const incluyeLibro = nombresProductos.includes("Libro");
console.log("¿La lista final incluye 'Libro'?", incluyeLibro);
