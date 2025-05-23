const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1;

// Evento: clic para agregar un nuevo pedido
addOrderBtn.addEventListener('click', () => {
  const order = { id: orderId++, status: 'En Proceso' };
  addOrder(order);
  processOrder(order);
});

// Añadir el pedido a la interfaz
function addOrder(order) {
  const listItem = document.createElement('li');
  listItem.id = `order-${order.id}`;
  listItem.textContent = `Pedido #${order.id}: ${order.status}`;
  orderList.appendChild(listItem);
}

// Actualizar el estado visual del pedido
function updateOrderStatus(order, status) {
  const listItem = document.getElementById(`order-${order.id}`);
  if (listItem) {
    listItem.textContent = `Pedido #${order.id}: ${status}`;
  }
}

// Simular preparación del pedido con una promesa
function simulatePreparationTime() {
  const time = Math.floor(Math.random() * 4000) + 1000; // entre 1s y 5s
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// Procesar el pedido de forma asincrónica
async function processOrder(order) {
  await simulatePreparationTime();
  order.status = 'Completado';
  updateOrderStatus(order, order.status);
}
