// Подключение модуля net для создания клиента TCP
const net = require('net');

// Проверка аргументов командной строки
if (process.argv.length < 4) {
  console.log('Usage: node client.js <server-port> <X>');
  process.exit();
}

// Извлечение порта сервера и значения X из аргументов командной строки
const serverPort = parseInt(process.argv[2]);
const X = parseInt(process.argv[3]);

// Подключение к серверу
const client = net.connect({ port: serverPort }, () => {
  console.log(`Подключен к серверу (порт ${serverPort})`);
});

// Переменная для хранения суммы
let sum = 0;

// Обработка события получения данных от сервера
client.on('data', data => {
  // Чтение промежуточной суммы из полученных данных
  const intermediateSum = data.readInt32LE();
  console.log(`Полученная промежуточная сумма: ${intermediateSum}`);
});

// Обработка события завершения соединения с сервером
client.on('end', () => {
  console.log('Отключен от сервера');
});

// Отправка данных на сервер каждую секунду
setInterval(() => {
  // Увеличение суммы на значение X
  sum += X;

  // Преобразование суммы в буфер и отправка на сервер
  client.write(Buffer.from([sum & 0xff, (sum >> 8) & 0xff, (sum >> 16) & 0xff, (sum >> 24) & 0xff]));
}, 1000);