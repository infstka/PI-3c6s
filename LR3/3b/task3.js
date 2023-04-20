// Создаем функцию, которая возвращает новый Promise с функцией-обработчиком
function thirdJob(data) {
    return new Promise((resolve, reject) => {
// Проверяем, что data - число, если нет, то вызываем reject и передаем ему объект ошибки
        if (typeof data !== "number") {
            reject(new Error("error"));
        }
// Если data - нечетное число, то вызываем resolve через 1 секунду и передаем ему строку "odd"
else if (data % 2 === 1) {
    setTimeout(() => {
        resolve("odd");
    }, 1000);
}
// Если data - четное число, то вызываем reject через 2 секунды и передаем ему объект ошибки с сообщением "even"
else {
    setTimeout(() => {
        reject(new Error("even"));
    }, 2000);
}
    });
}

// Пример использования обработчиков Promise
thirdJob(5)
    .then((result) => {
    console.log(result); // "odd"
})
.catch((error) => {
    console.error(error.message); // "error"
});

// Пример использования конструкции async/await с try/catch
async function run() {
    try {
        const result = await thirdJob(6);
        console.log(result); // "even"
    } catch (error) {
        console.error(error.message); // "even"
    }
}

run();  