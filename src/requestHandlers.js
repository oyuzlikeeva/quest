var exec = require("child_process").exec;
var fs = require('fs');


function f(fileName, mimeType){
    return function (response) {
        console.log('Request handler was called for ' + fileName);

        fs.readFile(fileName, { encoding: 'utf8' }, function(error, file) {
            if (!error) {
                response.writeHead(200, { 'Content-Type': mimeType + '; charset=utf-8'});
                response.write(file);
                response.end();
            } else {
                response.writeHead(403, {"Content-Type": "text/plain"});
                response.write("403 Internal error");
                console.log(error);
                response.end();
            }
        });
    }
}

exports.start = f;