import { useEffect, useState } from "react";

const RestartButton = ({ onRestart }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // Mostrar el botón después de 5 segundos

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }, []);

    return (
        isVisible && (
            <button onClick={onRestart} className="restart-button">
                Reiniciar Juego
            </button>
        )
    );
}
export { RestartButton };