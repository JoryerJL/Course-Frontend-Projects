import { useState, useEffect } from "react";
import {InputNumber} from "./InputNumber";
import {Message} from "./Message";
import {RestartButton} from "./RestartButton";

const Game = () => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setTargetNumber(generateRandomNumber());
    }, []);

    const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

    return (
        <div className="game-container">
            <h1>Adivina el Número</h1>
            <InputNumber onGuess={(num) => {
                setGuess(num);
                if (num === targetNumber) {
                    setMessage("¡Felicidades! Adivinaste el número.");
                } else if (num < targetNumber) {
                    setMessage(`El número es mayor. Era ${targetNumber}.`);
                } else {
                    setMessage(`El número es menor. Era ${targetNumber}.`);
                }
            }} />
            {message && <Message text={message} />} 
            <RestartButton onRestart={() => {
                setTargetNumber(generateRandomNumber());
                setGuess('');
                setMessage('');
            }} />
        </div>
    );
}
export { Game };