const http = require("http");
const host = 'localhost';
const port = 8000;
const requestListener = function (req, res)
{
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`
      <html>
        <head>
          <title>task2</title>
        </head>
        <body>
          <h1>Hello World</h1>
        </body>
      </html>
    `);
}
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}`);
});
