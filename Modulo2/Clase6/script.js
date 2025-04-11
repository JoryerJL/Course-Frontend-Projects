// Lista de regalos
const gifts = ["Muñeca", "Carro de juguete", "Rompecabezas", "Lego", "Pelota"];

// Función recursiva para encontrar un regalo en la lista
function findGift(gifts, giftName, index = 0) {
    // Caso base: Si llegamos al final de la lista
    if (index === gifts.length) {
        return `${giftName} no está en la lista.`;
    }
    
    // Caso base: Si encontramos el regalo en la posición actual
    if (gifts[index] === giftName) {
        return `${giftName} está en la posición ${index}.`;
    }

    // Llamada recursiva con el índice incrementado
    return findGift(gifts, giftName, index + 1);
}

// Casos de ejemplo:

let giftToFind = "Lego";
console.log(findGift(gifts, giftToFind)); 
// Salida esperada: "Lego está en la posición 3."

giftToFind = "Camión";
console.log(findGift(gifts, giftToFind)); 
// Salida esperada: "Camión no está en la lista."
