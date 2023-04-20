const express = require('express'); // подключение модуля Express для создания веб-приложения
const nodemailer = require('nodemailer'); // подключение модуля Nodemailer для отправки электронной почты
const app = express(); // создание объекта приложения Express

app.use(express.urlencoded({ extended: true })); // использование middleware для парсинга URL-закодированных данных
app.use(express.static('public')); // использование middleware для обслуживания статических файлов в папке public
app.get('/', (req, res) => { // определение маршрута для GET-запросов к корневой директории
    res.sendFile(__dirname + '/task2.html'); // отправка файла HTML в ответ на GET-запрос
});

app.post('/send', (req, res) => { // определение маршрута для POST-запросов к /send
    const transporter = nodemailer.createTransport({ // создание объекта для отправки электронной почты
        // для Gmail
        host: "smtp.gmail.com", // хост SMTP-сервера
        port: 465, // порт SMTP-сервера
        secure: true, // использование SSL/TLS-шифрования
        auth: {
            // адрес электронной почты
            user: 'email',
            // пароль приложения Gmail
            pass: 'apppassword'
        }
    });

    const mailOptions = { // опции для отправки электронной почты
        from: req.body.from, // адрес отправителя
        to: req.body.to, // адрес получателя
        subject: req.body.subject, // тема письма
        html: req.body.message // HTML-код сообщения
    };

    transporter.sendMail(mailOptions, (error, info) => { // отправка электронной почты
        if (error) { // если произошла ошибка
            console.log(error); // выводим ее в консоль
            res.send('Error: Something went wrong.'); // отправляем ответ клиенту
        } else { // если все прошло успешно
            console.log('Email sent: ' + info.response); // выводим информацию о письме в консоль
            res.send('Email sent successfully!');
        }
    });
}).listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});