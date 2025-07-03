import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todas'); // 'todas', 'cortas', 'largas'
  const [filtroRecientes, setFiltroRecientes] = useState(false);

  // Cargar tareas desde localStorage al inicializar el componente
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);  // Se ejecuta cada vez que cambia el total calculado

  

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fechaCreacion: new Date().toISOString() // Agregamos fecha para el filtro recientes
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Función para filtrar tareas según los criterios seleccionados
  const tareasFiltradas = useMemo(() => {
    let resultado = tareas;

    // Filtrar por tipo de duración
    if (filtroTipo === 'cortas') {
      resultado = resultado.filter(tarea => tarea.duracion <= 30);
    } else if (filtroTipo === 'largas') {
      resultado = resultado.filter(tarea => tarea.duracion > 30);
    }

    // Filtrar por tareas recientes (últimas 24 horas)
    if (filtroRecientes) {
      const ahora = new Date();
      const hace24Horas = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);
      resultado = resultado.filter(tarea => {
        const fechaTarea = new Date(tarea.fechaCreacion);
        return fechaTarea >= hace24Horas;
      });
    }

    return resultado;
  }, [tareas, filtroTipo, filtroRecientes]);

  // Función para eliminar una tarea
  const eliminarTarea = (indice) => {
    const nuevasTareas = tareas.filter((_, index) => index !== indice);
    setTareas(nuevasTareas);
  };

  return (
    <div className="container">
      <h1>📝 Contador de Tareas</h1>
      
      {/* Formulario para agregar tareas */}
      <div className="form-container">
        <input 
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea"
          className="input-field"
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Duración en minutos"
          className="input-field"
        />
        <button onClick={agregarTarea} className="add-button">
          ➕ Agregar tarea
        </button>
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <div className="filter-group">
          <label>Filtrar por duración:</label>
          <select 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas las tareas</option>
            <option value="cortas">Tareas cortas (≤ 30 min)</option>
            <option value="largas">Tareas largas (&gt; 30 min)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>
            <input 
              type="checkbox" 
              checked={filtroRecientes}
              onChange={(e) => setFiltroRecientes(e.target.checked)}
            />
            Solo tareas recientes (últimas 24h)
          </label>
        </div>
      </div>

      {/* Lista de tareas */}
      <h2>📋 Tareas ({tareasFiltradas.length} de {tareas.length})</h2>
      <ul className="tasks-list">
        {tareasFiltradas.map((tarea, index) => (
          <li key={index} className="task-item">
            <div className="task-info">
              <strong>{tarea.nombre}</strong>
              <span className="task-duration">⏱️ {tarea.duracion} minutos</span>
            </div>
            <button 
              onClick={() => eliminarTarea(tareas.indexOf(tarea))}
              className="delete-button"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {tareasFiltradas.length === 0 && tareas.length > 0 && (
        <p className="no-tasks">No hay tareas que coincidan con los filtros seleccionados.</p>
      )}

      {tareas.length === 0 && (
        <p className="no-tasks">¡Agrega tu primera tarea!</p>
      )}

      {/* Resumen */}
      <div className="summary">
        <h3>⏰ Total de tiempo: {calcularTiempoTotal} minutos</h3>
        <p>💡 Esto equivale a {Math.round(calcularTiempoTotal / 60 * 100) / 100} horas</p>
      </div>
    </div>
  );
}

export default App;