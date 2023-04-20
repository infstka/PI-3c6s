// определение функции, возвращающей Promise
function firstJob() {
  // создание нового Promise, принимающего две функции: resolve и reject
  return new Promise((resolve, reject) => {
    // эмуляция задержки выполнения функции в 2 секунды
    setTimeout(() => {
      // успешное завершение Promise с передачей результата в функцию resolve
      resolve("Hello World");
    }, 2000);
  });
}

// пример использования обработчиков Promise
firstJob()
  .then((result) => {
    // обработка успешного завершения Promise в функции then
    console.log(result); // "Hello World"
  })
  .catch((error) => {
    // обработка ошибок в функции catch
    console.error(error);
  });

// пример использования конструкции async/await с try/catch
async function run() {
  try {
    // ожидание завершения Promise и сохранение результата в переменную
    const result = await firstJob();
    // обработка успешного завершения Promise
    console.log(result); // "Hello World"
  } catch (error) {
    // обработка ошибок с помощью конструкции try/catch
    console.error(error);
  }
}

// вызов функции, использующей async/await и try/catch для обработки Promise
run();
