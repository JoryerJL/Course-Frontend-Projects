import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Asegúrate de tener este archivo

function App() {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputImagenRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del planeta es requerido';
    } else if (nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    } else if (descripcion.length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, imagen: 'Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)' }));
        return;
      }
      
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, imagen: 'El archivo debe ser menor a 5MB' }));
        return;
      }
      
      setImagen(file);
      setPreviewImagen(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, imagen: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simular un delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const nuevoPlaneta = {
        id: Date.now(), // Mejor ID único
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        imagen: imagen ? URL.createObjectURL(imagen) : null,
        fechaCreacion: new Date().toISOString(),
      };

      setPlanetas([...planetas, nuevoPlaneta]);
      
      // Limpiar formulario
      setNombre('');
      setDescripcion('');
      setImagen(null);
      setPreviewImagen(null);
      setErrors({});

      if (inputImagenRef.current) {
        inputImagenRef.current.value = '';
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este planeta?')) {
      setPlanetas(planetas.filter(planeta => planeta.id !== id));
    }
  };

  const clearForm = () => {
    setNombre('');
    setDescripcion('');
    setImagen(null);
    setPreviewImagen(null);
    setErrors({});
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 Bitácora de Exploración Espacial</h1>
        <p>Registra tus descubrimientos planetarios</p>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2>Registrar Nuevo Planeta</h2>
          
          <form onSubmit={handleSubmit} className="planeta-form">
            <div className="form-group">
              <label htmlFor="nombre">
                <span>Nombre del Planeta *</span>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ej: Kepler-442b"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={errors.nombre ? 'input-error' : ''}
                  disabled={isSubmitting}
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">
                <span>Descripción *</span>
                <textarea
                  id="descripcion"
                  placeholder="Describe las características del planeta, su atmósfera, superficie, etc."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className={errors.descripcion ? 'input-error' : ''}
                  disabled={isSubmitting}
                  rows="4"
                />
                <small className="char-count">{descripcion.length}/500</small>
                {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="imagen">
                <span>Imagen del Planeta</span>
                <input
                  id="imagen"
                  type="file"
                  accept="image/*"
                  onChange={handleImagenChange}
                  ref={inputImagenRef}
                  className={errors.imagen ? 'input-error' : ''}
                  disabled={isSubmitting}
                />
                {errors.imagen && <span className="error-message">{errors.imagen}</span>}
              </label>
              
              {previewImagen && (
                <div className="image-preview">
                  <img src={previewImagen} alt="Vista previa" />
                  <button 
                    type="button" 
                    onClick={() => {
                      setImagen(null);
                      setPreviewImagen(null);
                      if (inputImagenRef.current) inputImagenRef.current.value = '';
                    }}
                    className="remove-image"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={clearForm}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Limpiar
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : '💾 Guardar Planeta'}
              </button>
            </div>
          </form>
        </div>

        <div className="planetas-container">
          <h2>Planetas Registrados ({planetas.length})</h2>
          
          {planetas.length === 0 ? (
            <div className="empty-state">
              <p>🪐 No hay planetas registrados aún</p>
              <p>¡Comienza explorando el universo!</p>
            </div>
          ) : (
            <div className="planetas-grid">
              {planetas.map((planeta) => (
                <div key={planeta.id} className="planeta-card">
                  <div className="planeta-header">
                    <h3>{planeta.nombre}</h3>
                    <button 
                      onClick={() => handleDelete(planeta.id)}
                      className="btn-delete"
                      title="Eliminar planeta"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="planeta-content">
                    <p>{planeta.descripcion}</p>
                    
                    {planeta.imagen && (
                      <div className="planeta-image">
                        <img 
                          src={planeta.imagen} 
                          alt={planeta.nombre}
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="planeta-meta">
                      <small>
                        Registrado: {new Date(planeta.fechaCreacion).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;