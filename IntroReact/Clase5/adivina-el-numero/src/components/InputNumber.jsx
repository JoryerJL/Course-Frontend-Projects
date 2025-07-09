import { useEffect, useState } from "react";

const InputNumber = ({ onGuess }) => {
    const [guess, setGuess] = useState('');
    
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Validar que solo se ingresen números
        setGuess(value);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (guess) {
        onGuess(Number(guess));
        setGuess('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <input
            type="number"
            value={guess}
            onChange={handleChange}
            placeholder="Adivina el número"
        />
        <button type="submit">Enviar</button>
        </form>
    );
}
export { InputNumber };