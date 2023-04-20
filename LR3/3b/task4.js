// Импортируем функцию v4 из библиотеки uuid
const { v4: uuidv4 } = require('uuid');

// Функция для валидации номера карты
function validateCard(cardNumber) {
    console.log('Card number:', cardNumber);
// Генерируем случайное число от 0 до 1 и проверяем, больше ли оно или равно 0.5
// Если больше или равно, то возвращаем true, иначе - false
    return Math.random() >= 0.5;
}

// Функция для создания заказа
function createOrder(cardNumber) {
// Возвращаем новый Promise с функцией-обработчиком
    return new Promise((resolve, reject) => {
// Если номер карты не проходит валидацию, то вызываем reject с сообщением "Card is not valid"
        if (!validateCard(cardNumber)) {
            reject('Card is not valid');
            return;
        }
// Иначе генерируем уникальный идентификатор заказа и вызываем resolve с этим идентификатором
const orderId = uuidv4();
        setTimeout(() => {
            resolve(orderId);
        }, 5000);
    });
}

// Функция для проведения платежа по заказу
function proceedToPayment(orderId) {
    console.log('Order ID:', orderId);
// Возвращаем новый Promise с функцией-обработчиком
    return new Promise((resolve, reject) => {
// Генерируем случайное число от 0 до 1 и проверяем, больше ли оно или равно 0.5
        const paymentSuccess = Math.random() >= 0.5;
        setTimeout(() => {
// Если платеж прошел успешно, вызываем resolve с сообщением "Payment successful"
            if (paymentSuccess) {
                resolve('Payment successful');
            }
// Иначе вызываем reject с сообщением "Payment failed"
else {
    reject('Payment failed');
}
        }, 5000);
    });
}

// Функция для обработки заказов
async function processOrders(cardNumbers) {
// Используем цикл for...of для последовательной обработки каждого номера карты из переданного массива
    for (const cardNumber of cardNumbers) {
        try {
// Создаем новый заказ и получаем его идентификатор
            const orderId = await createOrder(cardNumber);
// Проводим платеж по заказу
            const paymentResult = await proceedToPayment(orderId);
            console.log(paymentResult); // Выводим сообщение об успешности платежа
        } catch (error) {
            console.log(error); // Выводим сообщение об ошибке в случае, если не удалось создать заказ или провести платеж
        }
    }
}

// Массив с номерами карт для обработки
const cardNumbers = ['1234 5678 9012 3456', '9876 5432 1098 7654', '1111 2222 3333 4444'];

// Вызываем функцию для обработки заказов
processOrders(cardNumbers);