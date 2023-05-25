const net = require('net');

// Создание сервера
const server = net.createServer((socket) => {
  console.log('Client connected');

  // Обработчик событий при получении данных от клиента
  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Received message: ${message}`);
    socket.write(`ECHO: ${message}\n`); // Отправка обратно клиенту
  });

  // Обработчик события отключения клиента
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Запуск сервера на порту 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});