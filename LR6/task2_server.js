const net = require('net');

const PORTS = [40000, 50000];
const INTERMEDIATE_SUM_INTERVAL = 5000; // 5 seconds

// Создание серверов для каждого порта
const servers = PORTS.map((port) => {
  const server = net.createServer();

  // Обработчик события 'connection', вызывается при подключении клиента
  server.on('connection', (socket) => {
    console.log(`Клиент подключен к порту ${port}`);
    let numbers = []; // Массив для хранения полученных чисел от клиента

    // Обработчик события 'data', вызывается при получении данных от клиента
    socket.on('data', (data) => {
      const number = data.readInt32BE(); // Чтение 32-битного целого числа из полученных данных
      numbers.push(number); // Добавление числа в массив numbers
      console.log(`Получено число ${number} от клиента (порт ${port})`);

      const currentSum = numbers.reduce((sum, num) => sum + num, 0); // Вычисление текущей суммы чисел в массиве numbers
      if (numbers.length % 5 === 0) {
        console.log(`Отправка промежуточной суммы ${currentSum} клиенту (порт ${port})`);
        // Отправка промежуточной суммы клиенту в формате 32-битного целого числа
        socket.write(Buffer.from([currentSum >> 24, currentSum >> 16, currentSum >> 8, currentSum]));
      }
    });

    // Отправка промежуточной суммы клиенту через определенные интервалы времени
    setInterval(() => {
      if (numbers.length > 0) {
        const currentSum = numbers.reduce((sum, num) => sum + num, 0); // Вычисление текущей суммы чисел в массиве numbers
        console.log(`Отправка промежуточной суммы ${currentSum} клиенту (порт ${port})`);
        // Отправка промежуточной суммы клиенту в формате 32-битного целого числа
        socket.write(Buffer.from([currentSum >> 24, currentSum >> 16, currentSum >> 8, currentSum]));
      }
    }, INTERMEDIATE_SUM_INTERVAL);

    // Обработчик события 'close', вызывается при отключении клиента
    socket.on('close', () => {
      console.log(`Клиент отключился от порта ${port}`);
    });
  });

  // Запуск прослушивания сервера на указанном порту
  server.listen(port, () => {
    console.log(`Сервер прослушивает порт ${port}`);
  });

  return server;
});