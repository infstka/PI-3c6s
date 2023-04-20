// определение функции, возвращающей Promise
function secondJob() {
  // создание нового Promise, принимающего две функции: resolve и reject
  return new Promise((resolve, reject) => {
    // эмуляция задержки выполнения функции в 3 секунды
    setTimeout(() => {
      // завершение Promise с ошибкой
      reject(new Error("Something went wrong"));
    }, 3000);
  });
}

// пример использования обработчиков Promise
secondJob()
  .then((result) => {
    // обработка успешного завершения Promise в функции then
    console.log(result);
  })
  .catch((error) => {
    // обработка ошибок в функции catch
    console.error(error.message); // "Something went wrong"
  });

// пример использования конструкции async/await с try/catch
async function run() {
  try {
    // ожидание завершения Promise, который завершается с ошибкой
    await secondJob();
  } catch (error) {
    // обработка ошибок с помощью конструкции try/catch
    console.error(error.message); // "Something went wrong"
  }
}

// вызов функции, использующей async/await и try/catch для обработки Promise
run();
