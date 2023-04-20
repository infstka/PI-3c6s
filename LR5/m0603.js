// Импортируем модуль nodemailer, который позволяет отправлять электронные письма
const nodemailer = require('nodemailer');

// Объявляем функцию send, которая будет отправлять письма с помощью nodemailer
function send(from, password, to, message) {
// Создаем объект transporter, который будет использоваться для отправки письма
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'email', // адрес электронной почты отправителя
        pass: 'apppassword' // пароль от этого адреса
    }
});

// Определяем объект mailOptions, который содержит информацию о письме, которое мы хотим отправить
let mailOptions = {
    from: 'from', // адрес электронной почты отправителя
    to: 'to', // адрес электронной почты получателя
    subject: 'subject', // тема письма
    text: "text" // текст письма
};

// Отправляем письмо с помощью объекта transporter и объекта mailOptions
transporter.sendMail(mailOptions, (error, info) => {
    if (error) { // если произошла ошибка при отправке письма
        console.log(error); // выводим ошибку в консоль
    } else { // если письмо отправлено успешно
        console.log('Message sent: %s', info.messageId); // выводим сообщение об успешной отправке в консоль
    }
});
}

// Экспортируем функцию send из модуля, чтобы она была доступна из других файлов
module.exports = { send };