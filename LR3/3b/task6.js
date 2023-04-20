// Функция для вычисления квадрата числа
function square(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof n !== 'number') {
        reject('Invalid input');
      } else {
        resolve(n * n);
      }
    }, 1000);
  });
}

// Функция для вычисления куба числа
function cube(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof n !== 'number') {
        reject('Invalid input');
      } else {
        resolve(n * n * n);
      }
    }, 3000);
  });
}

// Функция для вычисления четвертой степени числа
function fourthPower(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof n !== 'number') {
        reject('Invalid input');
      } else {
        resolve(n * n * n * n);
      }
    }, 5000);
  });
}

// Пример использования метода Promise.race()
// Создаем массив из трех промисов
// Метод race() выполняет все промисы параллельно, но возвращает результат первого завершившегося промиса
Promise.race([square("n"), cube(2), fourthPower(2)])
  .then(value => console.log(value)) // Выводим результат первого завершившегося промиса
  .catch(error => console.log("race"));

// Пример использования метода Promise.any()
// Создаем массив из трех промисов
// Метод any() выполняет все промисы параллельно и возвращает результат первого успешно выполненного промиса
// Если все промисы завершаются с ошибкой, возвращается AggregateError
Promise.any([square(2), cube(2), fourthPower("n")])
  .then(value => console.log(value)) // Выводим результат первого успешно выполненного промиса
  .catch(error => console.log("any"));

// Пример использования метода Promise.all()
// Создаем массив из трех промисов
// Метод all() выполняет все промисы параллельно и возвращает массив со значениями, полученными от каждого промиса
// Если хотя бы один промис завершается с ошибкой, метод all() возвращает отклоненный промис
Promise.all([square(2), cube(2), fourthPower(2)])
  .then(values => {
    const [square, cube, fourthPower] = values; // Деструктуризируем массив и выводим каждое значение
    console.log(square, cube, fourthPower)
  })
  .catch(error => console.log(error));
