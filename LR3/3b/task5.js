// Функция для вычисления квадрата числа
function square(n) {
    return new Promise((resolve, reject) => {
        if (typeof n !== "number") {
            reject("Invalid input");
        } else {
            resolve(n * n);
        }
    });
}

// Функция для вычисления куба числа
function cube(n) {
    return new Promise((resolve, reject) => {
        if (typeof n !== "number") {
            reject("Invalid input");
        } else {
            resolve(n * n * n);
        }
    });
}

// Функция для вычисления четвертой степени числа
function fourthPower(n) {
    return new Promise((resolve, reject) => {
        if (typeof n !== "number") {
            reject("Invalid input");
        } else {
            resolve(n * n * n * n);
        }
    });
}

// Использование Promise.all() для вычисления квадрата, куба и четвертой степени числа
Promise.all([square(2), cube(3), fourthPower(4)])
    .then((results) => {
    console.log(results); // [4, 27, 256]
})
    .catch((error) => {
    console.log(error);
});
// Вывод: Promise.all() позволяет выполнить несколько промисов одновременно и получить результаты выполнения всех промисов в виде массива. Если хотя бы один из промисов отклонен, то Promise.all() вернет отклоненный промис.