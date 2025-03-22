// viajes.js

// Array para guardar los destinos
const destinos = [];

// Función para registrar un destino
export const registrarDestino = (destino, fecha, transporte, personas = 1) => {
    const costo = calcularCosto(destino, transporte, personas);
    
    const nuevoViaje = {
        destino,
        fecha,
        transporte,
        personas,
        costo
    };

    destinos.push(nuevoViaje);
};

// Función para calcular el costo
const calcularCosto = (destino, transporte, personas) => {
    let costoBase = 0;

    // Costo base por destino
    const preciosDestino = {
        "Paris": 500,
        "Londres": 400,
        "New York": 600,
        "Tokio": 700,
        "Roma": 450
    };

    costoBase = preciosDestino[destino] || 300;  // Precio por defecto

    // Costo adicional por transporte
    const preciosTransporte = {
        "Avión": 200,
        "Tren": 100,
        "Barco": 150,
        "Auto": 50
    };

    costoBase += preciosTransporte[transporte] || 0;

    // Descuento por grupos grandes
    if (personas > 3) {
        costoBase *= 0.9;  // 10% de descuento
    }

    return costoBase * personas;
};

// Función para mostrar el itinerario
export const mostrarItinerario = () => {
    console.log("\n🔹 Itinerario de viajes 🔹");
    destinos.forEach(({ destino, fecha, transporte, personas, costo }, i) => {
        console.log(`Viaje #${i + 1}`);
        console.log(`Destino: ${destino}`);
        console.log(`Fecha: ${fecha}`);
        console.log(`Transporte: ${transporte}`);
        console.log(`Personas: ${personas}`);
        console.log(`Costo total: $${costo.toFixed(2)}`);
        console.log('---------------------------');
    });
};
