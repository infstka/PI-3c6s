const http = require("http")
const host = "localhost"
const port = 5000;
const fs = require("fs")
const html = fs.readFileSync("fetch.html");

const server = http.createServer((req, res) => {
    switch(req.url) {
        case "/":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.end(`Сервер запущен на http://${host}:${port}`)
            break
        case "/api/name":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.end("Бобрович Глеб Сергеевич")
            break
        case "/fetch":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.end(html)
            break
    }
})

server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/`)
})
