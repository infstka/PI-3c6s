const http = require('http');
const host = "localhost"
const port = 5000;
const readline = require('readline');

// начальное состояние приложения - norm
let appState = 'norm';

// создание readline интерфейса для чтения ввода из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `Состояние(norm, stop, test, idle, exit): ${appState}> `
});

// обработка ввода из консоли
rl.on('line', (input) => {
  input = input.trim();
  if (input === 'exit') {
    rl.close();
    process.exit();
  } 
    else if (['norm', 'stop', 'test', 'idle'].includes(input)) {
    appState = input;
    rl.setPrompt(`Состояние(norm, stop, test, idle, exit): ${appState}> `);
    rl.prompt();
  } 
    else {
    console.log(`Неверный ввод: ${input}`);
    rl.prompt();
  }
});

// создание HTTP сервера
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write(`<h1>Текущее состояние: ${appState}</h1>`);
  res.end();
});

// запуск сервера на порту 5000
server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/`)
})
