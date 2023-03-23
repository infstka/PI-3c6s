var http = require("http");
const host = "localhost"
const port = 5000;
var url = require("url");
var fs = require("fs");

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
                process.nextTick(() =>
                {
                    let fact_result = fact(k);
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify({ k:k, fact: fact_result }));
                })
            }
        }
    }
    else if (url.parse(req.url).pathname==='/')
    {
        let html = fs.readFileSync('D:\\BSTU\\PI-3c6s\\LR3\\3a\\task3.html');
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
    }
});

// запуск сервера на порту 5000
server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/`)
})
