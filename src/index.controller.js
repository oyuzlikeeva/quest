App.goOnQuestPage = function(id) {
    var hash;

    hash = '#questPage/' + id;
    window.location.hash = hash;
    document.getElementById('iframe').src = hash;
};

//App.hiddenHeader = function() {
//    var header,
//        content,
//        iframeUrl;
//
//    iframeUrl = document.getElementById('iframe').src;
//    if (iframeUrl === 'http://localhost:8888/logIn') {
//        $('.header').css('display', 'none');
//    } else {
//        $('.header').css('display', 'block');
//    }
//};

function changeUrl() {
    var windowUrl,
        iframe;

    windowUrl = window.location.hash.substring(1).split('/')[0];
    iframe = document.getElementById('iframe');
    iframe.src = windowUrl;
}

window.onhashchange = changeUrl;
window.onload = function() {
    $('#iframe').css('display', 'block');
    changeUrl();
};

App.goOnMainPage = function() {
    document.getElementById('iframe').src = '#main';
    window.location.hash = '#main';
};

App.setUserRole = function(username) {
    document.cookie = 'userRole=' + username;

    if (username === 'admin') {
        localStorage.setItem('username', username);
        $('#user-profile').attr('href', '#adminProfile');
        return '#adminProfile';
    } else {
        if (App.getUserData(username) !== false) {
            localStorage.setItem('username', username);
            $('#user-profile').attr('href', '#userProfile/' + document.cookie.split('userRole=')[1]);
            return '#userProfile/' + document.cookie.split('userRole=')[1];
        }
    }
};

App.goUserProfile = function() {
    if (document.cookie.split('userRole=')[1] === 'admin') {
        $('#user-profile').attr('href', '#adminProfile');
    } else {
        $('#user-profile').attr('href', '#userProfile/' + document.cookie.split('userRole=')[1]);
    }
};

App.getUserRole = function() {
    return document.cookie.split('userRole=')[1];
};

App.logOut = function() {
    document.cookie = '';
};

