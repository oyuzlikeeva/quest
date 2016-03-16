var server = require('./server.js');
var router = require('./router.js');
var requestHandlers = require('./requestHandlers.js');

var handle = {};
handle['/'] = requestHandlers.start('logIn/logIn.html','text/html');
handle['/main'] = requestHandlers.start('main/main.html','text/html');
handle['/questPage'] = requestHandlers.start('questPage/questPage.html', 'text/html');
handle['/userProfile'] = requestHandlers.start('userProfile/userProfile.html', 'text/html');
handle['/adminProfile'] = requestHandlers.start('adminProfile/adminProfile.html', 'text/html');
handle['/logIn.html'] = requestHandlers.start('logIn/logIn.html', 'text/html');
handle['/logIn.css'] = requestHandlers.start('logIn/logIn.css', 'text/css');
handle['/logIn.js'] = requestHandlers.start('logIn/logIn.js', 'text/javascript');
handle['/main.html'] = requestHandlers.start('main/main.html', 'text/html');
handle['/main.css'] = requestHandlers.start('main/main.css', 'text/css');
handle['/main.js'] = requestHandlers.start('main/main.js', 'text/javascript');
handle['/questPage.html'] = requestHandlers.start('questPage/questPage.html', 'text/html');
handle['/questPage.css'] = requestHandlers.start('questPage/questPage.html', 'text/css');
handle['/questPage.js'] = requestHandlers.start('questPage/questPage.html', 'text/javascript');
handle['/userProfile.html'] = requestHandlers.start('userProfile/userProfile.html', 'text/html');
handle['/userProfile.css'] = requestHandlers.start('userProfile/userProfile.css', 'text/css');
handle['/userProfile.js'] = requestHandlers.start('userProfile/userProfile.js', 'text/javascript');
handle['/adminProfile.html'] = requestHandlers.start('adminProfile/adminProfile.html', 'text/html');
handle['/adminProfile.css'] = requestHandlers.start('adminProfile/adminProfile.css', 'text/css');
handle['/adminProfile.js'] = requestHandlers.start('adminProfile/adminProfile.js', 'text/javascript');
handle['/allPageStyle.css'] = requestHandlers.start('allPageStyle.css', 'text/css');
handle['/jquery-2.2.1.js'] = requestHandlers.start('jquery-2.2.1.js', 'text/javascript');
handle['/questData.json'] = requestHandlers.start('questData.json', 'text/javascript');
handle['/handlebars-v4.0.5.js'] = requestHandlers.start('handlebars-v4.0.5.js', 'text/javascript');
handle['/img/icons/ic_arrow_back_white_36px.svg'] = requestHandlers.start('img/icons/ic_arrow_back_white_36px.svg', 'image/svg+xml');
handle['/img/icons/ic_add_white_36px.svg'] = requestHandlers.start('img/icons/ic_add_white_36px.svg', 'image/svg+xml');
handle['/img/icons/ic_close_white_24px.svg'] = requestHandlers.start('img/icons/ic_close_white_24px.svg', 'image/svg+xml');
handle['/img/icons/ic_check_white_24px.svg'] = requestHandlers.start('img/icons/ic_check_white_24px.svg', 'image/svg+xml');
handle['/img/icons/ic_person_white_36px.svg'] = requestHandlers.start('img/icons/ic_person_white_36px.svg', 'image/svg+xml');
handle['/img/icons/ic_person_white_48px.svg'] = requestHandlers.start('img/icons/ic_person_white_48px.svg', 'image/svg+xml');
handle['/img/icons/ic_more_edit_white_18px.svg'] = requestHandlers.start('img/icons/ic_more_edit_white_18px.svg', 'image/svg+xml');
handle['/img/icons/ic_group_black_32px.svg'] = requestHandlers.start('img/icons/ic_group_black_32px.svg', 'image/svg+xml');
handle['/img/icons/ic_clear_black_24px.svg'] = requestHandlers.start('img/icons/ic_clear_black_24px.svg', 'image/svg+xml');

function addStaticHandler(url, handle) {
    handle[url]
}


server.start(router.route, handle);