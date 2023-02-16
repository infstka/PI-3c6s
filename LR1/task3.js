const http = require('http')
const host = 'localhost';
const port = 8001;

function headers(require)
{
    var head = "";
    for(key in require.headers)
    {
        head += "<p>" + key + ": " + require.headers[key];
    }
    return head;
}

const server = http.createServer((request,response) =>{
    let body = 'task3';
    request.on('data', str => {body += str; console.log('Body:', body);})
    response.writeHead(200, {'Content-Type': 'text/html'});
    request.on('end', () => {
        response.write(
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<title>task3</title>' +
            '</head>' +
            '<body>' +
            '<h1 style="font-size:34px">Request</h1>' +
            '<p><b>Method: </b>' + request.method + '</p>' +
            '<p><b>URI: </b>' + request.url + '</p>' +
            '<p><b>HTTP Version: </b>' + request.httpVersion + '</p>' +
            '<p><b>Headers: </b>' + JSON.stringify(request.headers) + '</p>' +
            '<p><b>Body: </b>' + body + '</p>' +
            '</body>' +
            '</html>'
        );
        response.end();
    })
});

server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/`);
  });