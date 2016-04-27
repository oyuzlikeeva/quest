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
        pathnamePrefix,
        filename,
        fileStream;

    if (pathname === '/index') {
        pathname = 'index.html';
    }

    if (pathname.indexOf('.') === -1) {
        pathname += pathname + '.html';
    }

    if (pathname.indexOf('bower_components') === -1) {
        pathnamePrefix = './src/';
    } else {
        pathnamePrefix = '.';
    }
    filename = path.join(process.cwd(), pathnamePrefix, pathname) ;
    fs.exists(filename, function (exists) {
        if (!exists) {
            console.log('not exists: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }
        mimeType = mimeTypes[path.extname(filename)];
        response.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
        fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);

    });
}

start();
