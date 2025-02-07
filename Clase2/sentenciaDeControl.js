function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

let nota = getRandomInt(0, 100);
console.log('Nota aleatoria:', nota);

if (nota >=90){
    console.log('Excelente');
} else{
    if (nota>=60){
        if (nota<75){
            console.log('Suficiente');
        }
        else {
            console.log('Bien');
        }

    }
    else {
        console.log('El estudiante no aprueba');
    }
}