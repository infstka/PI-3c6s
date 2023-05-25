// Подключение модуля dgram для работы с UDP-сокетами
const dgram = require('dgram');

// Создание UDP-сокета
const client = dgram.createSocket('udp4');

// Создание сообщения в виде буфера с текстом 'test message'
const message = Buffer.from('test message'); // 12 байт

// Отправка сообщения на порт 4000 локального хоста
client.send(message, 4000, 'localhost', (err, bytes) => {
    if (err) {
        console.log(`Ошибка отправки сообщения серверу: ${err}`);
    } else {
        console.log(`Отправлено ${bytes} байт серверу`);
    }
// Закрытие UDP-сокета после отправки сообщения
    //client.close();
});

