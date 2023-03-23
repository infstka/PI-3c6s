var http = require("http");
const host = "localhost"
const port = 5000;
var url = require("url");
var fs = require("fs");


//расчет факториала
let fact = (n)=> {
    return (n <= 1 ? n : n*fact(n-1));
}

const server = http.createServer((req, res) =>
{
    if (url.parse(req.url).pathname === '/fact')
    {  
        console.log(req.url);
        if (typeof url.parse(req.url, true).query.k != 'undefined')
        {
            let k = parseInt(url.parse(req.url, true).query.k);
            if (Number.isInteger(k))
            {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify({ k:k, fact: fact(k)}));
            }
        }
    }
});

// запуск сервера на порту 5000
server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/`)
})
