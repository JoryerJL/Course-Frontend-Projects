import { useEffect, useState } from "react";

const Message = ({ text }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Ocultar el mensaje después de 3 segundos

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }, []);

    return (
        isVisible && (
            <div className="message">
                <p>{text}</p>
            </div>
        )
    );
}
export { Message };