console.log("Hola Mundo");

// Ejemplos de tipos de datos en JavaScript

// Números
let numeroPositivo = 42;
let numeroNegativo = -666;
let numeroCero = 0;
console.log(typeof numeroPositivo, numeroPositivo); // number
console.log(typeof numeroNegativo, numeroNegativo); // number
console.log(typeof numeroCero, numeroCero); // number

// Cadenas de texto
let texto = 'Veinticinco';
let textoVacio = '';
let saludo = "Hello World!";
console.log(typeof texto, texto); // string
console.log(typeof textoVacio, textoVacio); // string
console.log(typeof saludo, saludo); // string

// Booleanos
let verdadero = true;
let falso = false;
console.log(typeof verdadero, verdadero); // boolean
console.log(typeof falso, falso); // boolean

// Valores nulos y no definidos
let valorNulo = null;
let valorIndefinido;
console.log(typeof valorNulo, valorNulo);
console.log(typeof valorIndefinido, valorIndefinido); // undefined

// Tipos especiales y curiosidades
let simbolo = Symbol('identificador');
console.log(typeof simbolo, simbolo); // symbol


// Mis propios ejemplos
let numeroGrande = BigInt(12345678901234567890n);
let fechaActual = new Date();
console.log(typeof numeroGrande, numeroGrande); // bigint
console.log(typeof fechaActual, fechaActual); // object
// Objetos y funciones
let Carro = {
    marca: 'Toyota',
    modelo: 'Corolla',
    anio: 2021
};
let resta = function resta(pA, pB) {return pA - pB};
console.log(typeof Carro, Carro.marca); // object
console.log(typeof resta, resta(10,5)); // function
