import React, { useReducer, useRef, useCallback, useEffect } from "react";

const initialState = { count: 0, history: [], lastState: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increment": {
      const value = action.value ?? 1;
      return {
        count: state.count + value,
        history: [...state.history, `+${value} (Nuevo valor: ${state.count + value})`],
        lastState: [...state.lastState, { count: state.count, history: state.history }]
      };
    }
    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`],
        lastState: [...state.lastState, { count: state.count, history: state.history }]
      };
    case "reset":
      return initialState;
    case "undo":
      if (state.lastState.length === 0) return state;
      const previousState = state.lastState[state.lastState.length - 1];
      return {
        ...previousState,
        lastState: state.lastState.slice(0, -1)
      };
    case "setState":
      // Para inicializar el estado completo desde localStorage
      return {
        ...state,
        ...action.state
      };
    default:
      return state;
  }
}


function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementBtnRef = useRef(null);
  const [inputValue, setInputValue] = React.useState(1);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Recuperar estado al cargar (primero)
  useEffect(() => {
    const savedState = localStorage.getItem("contador_estado");
    if (savedState) {
      dispatch({ type: "setState", state: JSON.parse(savedState) });
    }
    setIsLoaded(true);
    // eslint-disable-next-line
  }, []);

  // Fijar el foco en el botón de incremento al renderizar
  useEffect(() => {
    if (isLoaded && incrementBtnRef.current) {
      incrementBtnRef.current.focus();
    }
  }, [isLoaded]);

  // Guardar todo el estado en localStorage cada vez que cambie (solo después de cargar)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("contador_estado", JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const handleIncrement = useCallback(() => {
    const value = parseInt(inputValue, 10) || 1;
    dispatch({ type: "increment", value });
  }, [inputValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  return (
    <div>
      <h2>Contador: {state.count}</h2>
      <input
        type="number"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        min="1"
        style={{ width: "60px", marginRight: "8px" }}
      />
      <button ref={incrementBtnRef} onClick={handleIncrement}>+ (sumar)</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={() => dispatch({ type: "undo" })}>Deshacer</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}



export default CounterGame