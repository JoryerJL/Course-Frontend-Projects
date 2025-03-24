// Lista de compras inicial vacía
let listaDeCompras = [];

// Función para agregar un producto a la lista
const agregarProducto = (producto) => {
  if (!producto) {
    alert("Por favor ingrese un producto.");
    return;
  }
  
  // Verificar si el producto ya existe en la lista
  if (listaDeCompras.includes(producto)) {
    alert("El producto ya está en la lista.");
    return;
  }
  
  listaDeCompras.push(producto);
  mostrarLista();
};

// Función para eliminar un producto de la lista
const eliminarProducto = (producto) => {
  const index = listaDeCompras.indexOf(producto);
  
  if (index === -1) {
    alert("El producto no se encuentra en la lista.");
    return;
  }

  listaDeCompras.splice(index, 1);
  mostrarLista();
};

// Función para mostrar todos los productos de la lista
const mostrarLista = () => {
  const listaElement = document.getElementById("listaDeCompras");
  listaElement.innerHTML = "";  // Limpiar la lista antes de mostrar la actualizada
  
  listaDeCompras.forEach(producto => {
    const li = document.createElement("li");
    li.textContent = producto;
    listaElement.appendChild(li);
  });
};

// Event Listeners
document.getElementById("agregarBtn").addEventListener("click", () => {
  const producto = document.getElementById("producto").value.trim();
  agregarProducto(producto);
  document.getElementById("producto").value = "";  // Limpiar el input
});

document.getElementById("eliminarBtn").addEventListener("click", () => {
  const producto = document.getElementById("producto").value.trim();
  eliminarProducto(producto);
  document.getElementById("producto").value = "";  // Limpiar el input
});

document.getElementById("mostrarBtn").addEventListener("click", () => {
  mostrarLista();
});
