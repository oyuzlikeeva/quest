var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'text/javascript',
        '.svg': 'image/svg+xml'
    };

function start() {
    function onRequest(request, response) {
        var pathname;

        pathname = url.parse(request.url).pathname;
        if (request.method === 'POST') {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end();
        } else {
            getProcess(pathname, response);
        }
    }
    http.createServer(onRequest).listen(8888);
    console.log('Server has started.');
}


function getProcess(pathname, response) {
    var mimeType,
        filename,
        fileStream;

    if (pathname === '/index') {
        pathname = 'index.html';
    }

    if (pathname.indexOf('.') === -1) {
        pathname += pathname + '.html';
    }
    filename = path.join(process.cwd(), '.', pathname);
    fs.exists(filename, function (exists) {
        if (!exists) {
            console.log('not exists: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
        }
        mimeType = mimeTypes[path.extname(filename)];
        response.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
        fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);

    });
    console.log('Request for ' + pathname + ' received.');
}

start();
