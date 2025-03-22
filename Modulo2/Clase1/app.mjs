// app.js
import { registrarDestino, mostrarItinerario } from './viajes.mjs';

// Iniciar la aplicación
const iniciarApp = () => {
    registrarDestino("Paris", "2024-06-15", "Avión", 2);
    registrarDestino("Londres", "2024-07-01", "Tren", 4);
    registrarDestino("Roma", "2024-08-20", "Barco", 5);

    mostrarItinerario();
};

iniciarApp();
