const net = require('net');

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
  console.log('Connected to server');
  client.write('Hello, server!');
});

// Обработчик события 'data', вызывается при получении данных от сервера
client.on('data', (data) => {
  const message = data.toString().trim();
  console.log(`Received message: ${message}`);

  // Проверяем сообщение от сервера
  if (message.startsWith('ECHO:')) {
    const echoedMessage = message.slice(5).trim();

    // Проверяем, что полученное сообщение является ожидаемым ответом
    if (echoedMessage === 'Hello, server!') {
      console.log('Server is working correctly');
    } else {
      console.log('Server returned an unexpected message');
    }
  } else {
    console.log('Server returned an invalid message');
  }
});

// Обработчик события 'close', вызывается при закрытии соединения с сервером
client.on('close', () => {
  console.log('Connection closed');
});