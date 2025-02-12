//Tabla de multiplicar
let multiplicar = function(pA) {
    let resultado = "";
    for (let i = 1; i <= 10; i++) {
        resultado += `${pA} x ${i} = ${pA * i}\n`;
    }
    return resultado;
};

let valor = parseInt(prompt('Escribe el valor de la tabla de multiplicar'));
alert(multiplicar(valor));
