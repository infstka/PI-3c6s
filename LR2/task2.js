const http = require("http")
const host = "localhost"
const port = 5000;
const fs = require("fs")
const html = fs.readFileSync("pic.png");

const server = http.createServer((req, res) => {
    switch(req.url) {
        case "/":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.end(`Сервер запущен на http://${host}:${port}`)
            break
        case "/png":
            res.statusCode = 200
            res.setHeader("Content-Type", "image/png")
            res.end(html)
            break
    }
})

server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/`)
})
