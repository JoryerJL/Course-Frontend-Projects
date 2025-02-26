class Libro {
    constructor(titulo, autor, anio, estado) {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.estado = estado;
        this.capitulos = [];
    }

    describirLibro() {
        return `Libro titulado "${this.titulo}", escrito por ${this.autor} en el año ${this.anio}, el estado es: ${this.estado}.`;
    }

    agregarCapitulo(capitulo) {
        this.capitulos.push(capitulo);
    }

    eliminarCapitulo(capitulo) {
        this.capitulos = this.capitulos.filter(c => c !== capitulo);
    }
}

// Ejemplo de uso
const libro1 = new Libro("El Principito", "Antoine de Saint-Exupéry", 1943, "disponible");
console.log(libro1.describirLibro());
libro1.agregarCapitulo("Capítulo 1: El encuentro");
libro1.agregarCapitulo("Capítulo 2: El viaje");
console.log(libro1.capitulos);
libro1.eliminarCapitulo("Capítulo 1: El encuentro");
console.log(libro1.capitulos);
