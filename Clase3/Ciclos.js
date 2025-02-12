// Declarar el arreglo de frutas
const frutas = ['manzana', 'plátano', 'naranja', 'manzana', 'pera', 'naranja', 'manzana'];

// Crear un objeto para almacenar la cantidad de cada fruta
let cantidadFrutas = {};

// Usar un ciclo for para recorrer el arreglo y contar las frutas
for (let i = 0; i < frutas.length; i++) {
  let fruta = frutas[i];
  if (cantidadFrutas[fruta]) {
    cantidadFrutas[fruta] += 1;  // Si la fruta ya está en el objeto, incrementar la cantidad
  } else {
    cantidadFrutas[fruta] = 1;  // Si no, agregar la fruta con cantidad 1
  }
}

// Imprimir la cantidad de cada tipo de fruta
console.log(cantidadFrutas);
