// Referencias a elementos
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');

// Función para renderizar personajes
function renderCharacters(characters) {
  dataContainer.innerHTML = ''; // Limpiar contenido previo
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.style.border = '1px solid #ccc';
    characterElement.style.margin = '10px';
    characterElement.style.padding = '10px';
    characterElement.style.display = 'inline-block';
    characterElement.style.textAlign = 'center';
    characterElement.style.width = '150px';

    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}" style="width: 100%; border-radius: 8px;">
    `;
    dataContainer.appendChild(characterElement);
  });
}

// Solicitud usando Fetch
fetchBtn.addEventListener('click', () => {
  dataContainer.textContent = 'Cargando personajes con Fetch...';
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(data => {
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos con Fetch.';
    });
});

// Solicitud usando Axios
axiosBtn.addEventListener('click', () => {
  dataContainer.textContent = 'Cargando personajes con Axios...';
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      renderCharacters(response.data.results);
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos con Axios.';
    });
});
