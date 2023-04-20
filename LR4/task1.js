const http = require("http")  // подключение модуля для создания HTTP-сервера
const host = "localhost"     // адрес хоста
const port = 5000;           // номер порта
const fs = require("fs")     // подключение модуля для работы с файловой системой
const url = require('url');  // подключение модуля для работы с URL
const DB = require('./db');  // подключение модуля для работы с базой данных

const server = http.createServer((req,res)=> { // создание сервера
    if(req.url == '/') {    // если запрос на корневой URL
        let html = fs.readFileSync('./task1.html') // читаем содержимое файла task1.html
        res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}) // отправляем заголовок с типом контента и кодировкой
        res.end(html) // отправляем содержимое файла
    }
    else if(url.parse(req.url).pathname === '/api/db') { // если запрос на URL /api/db
        DB.emit(req.method, req, res) // вызываем соответствующий метод базы данных
    }
})

server.listen(port, host, () => { // запускаем сервер
    console.log(`Сервер запущен на http://${host}:${port}/`) // выводим в консоль сообщение о запуске
})

DB.on("GET",(req,res)=> { // обработка GET-запроса
    DB.select().then((data) => { // выбираем данные из базы данных
        res.end(JSON.stringify(data)); // отправляем данные в виде JSON
    } );

});

DB.on("POST",(req,res)=> { // обработка POST-запроса
    let block
     req.on('data', (data)=>{ // получаем данные из запроса
        block = JSON.parse(data); // парсим JSON
     })
     req.on('end', () => { // когда данные получены полностью
        DB.insert(block).then((block)=> { // добавляем данные в базу
            res.end(JSON.stringify(block)); // отправляем данные в виде JSON
        })
        .catch((errorMessage) => { // если есть ошибки, обрабатываем их
            res.statusCode = 400; // устанавливаем код ошибки
            return res.end(errorMessage); // отправляем сообщение об ошибке
        });;
    })
});

DB.on("PUT",(req,res)=> { // обработка PUT-запроса
    req.on("data", (data)=> { // получаем данные из запроса
        var block = JSON.parse(data); // парсим JSON
        DB.update(block).then(block => {  // обновляем данные в базе
            res.end(JSON.stringify(block)); // отправляем обновленные данные в виде JSON
        });
    })
});

DB.on("DELETE",(req,res)=> { // обработка DELETE-запроса
    if(typeof url.parse(req.url,true).query.id != 'undefined' ){ // если указан ID записи
        var id = parseInt(url.parse(req.url,true).query.id); // получаем ID записи
        if(Number.isInteger(id)){ // если ID является целым числом
            res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
            DB.delete(id).then(ID => {
                res.end(JSON.stringify(ID)); 
            }); 
        }
    }
});