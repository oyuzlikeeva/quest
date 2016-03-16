var http = require("http");
var url = require("url");
var fs = require('fs');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response);

    }

    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

//function getQuestData(callback) {
//
//    return http.get({
//        host: 'localhost:8888',
//        path: '/questData.json'
//    }, function(response) {
//        // Continuously update stream with data
//        var body = '';
//        response.on('data', function(d) {
//            body += d;
//        });
//        response.on('end', function() {
//            var parsed = JSON.parse(body);
//            callback({
//                name: parsed.name,
//                id: parsed.id
//            });
//        });
//    });
//
//}

exports.start = start;
