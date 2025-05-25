document.getElementById('registroEvento').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const intereses = document.querySelectorAll('input[name="intereses"]:checked');
  const horario = document.querySelector('input[name="horario"]:checked');
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const archivo = document.getElementById('archivo').files[0];

  // Validación básica campos obligatorios
  if (!nombre) {
    alert('Por favor, ingresa tu nombre completo.');
    return;
  }

  if (!correo) {
    alert('Por favor, ingresa tu correo electrónico.');
    return;
  }

  if (!validateEmail(correo)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return;
  }

  if (!telefono) {
    alert('Por favor, ingresa tu número de teléfono.');
    return;
  }

  if (!validatePhone(telefono)) {
    alert('Por favor, ingresa un teléfono válido (solo números, 10 dígitos).');
    return;
  }

  if (intereses.length === 0) {
    alert('Por favor, selecciona al menos un interés.');
    return;
  }

  if (!horario) {
    alert('Por favor, selecciona un horario preferido.');
    return;
  }

  if (!fecha) {
    alert('Por favor, selecciona la fecha del evento.');
    return;
  }

  if (!validateFutureDate(fecha)) {
    alert('La fecha del evento debe ser hoy o en el futuro.');
    return;
  }

  if (!hora) {
    alert('Por favor, selecciona la hora preferida.');
    return;
  }

  if (archivo && !validateFileType(archivo)) {
    alert('Solo se permiten archivos PDF, JPG, PNG o GIF.');
    return;
  }

  alert('Registro exitoso. ¡Gracias por registrarte!');
  this.reset();
});

// Función para validar email básico
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función para validar teléfono (solo números, 10 dígitos)
function validatePhone(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

// Validar que la fecha sea hoy o posterior
function validateFutureDate(dateString) {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0,0,0,0);
  return selectedDate >= today;
}

// Validar tipo de archivo (PDF, JPG, PNG, GIF)
function validateFileType(file) {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
  return allowedTypes.includes(file.type);
}
