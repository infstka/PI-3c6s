const dgram = require('dgram');

// Создание UDP-сокета
const server = dgram.createSocket('udp4');

// Обработка ошибок
server.on('error', err => {
  console.log(`Ошибка сервера:\n${err.stack}`);
  server.close();
});

// Обработка входящих сообщений
server.on('message', (msg, rinfo) => {
  console.log(`Получено сообщение от клиента ${rinfo.address}:${rinfo.port}: ${msg}`);

  // Формирование ответного сообщения
  const response = Buffer.from(`ECHO:${msg}`);

  // Отправка ответа клиенту
  server.send(response, rinfo.port, rinfo.address, (err, bytes) => {
    if (err) {
      console.log(`Ошибка отправки ответа клиенту ${rinfo.address}:${rinfo.port}: ${err}`);
    } else {
      console.log(`Отправлено ${bytes} байт клиенту ${rinfo.address}:${rinfo.port}`);
    }
  });
});

// Обработка события прослушивания порта
server.on('listening', () => {
  const address = server.address();
  console.log(`Сервер запущен на ${address.address}:${address.port}`);
});

// Привязка сервера к порту 4000
server.bind(4000);