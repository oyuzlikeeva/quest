App.goOnQuestPage = function(id) {
    var hash;

    hash = '#questPage/' + id;
    window.location.hash = hash;
    document.getElementById('iframe').src = hash;
};

App.hiddenHeader = function() {
    var header,
        content,
        iframeUrl;

    iframeUrl = document.getElementById('iframe').src;
    if (iframeUrl === 'http://localhost:8888/logIn') {
        $('.header').css('display', 'none');
    } else {
        $('.header').css('display', 'block');
    }
};

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
    if (username === 'admin') {
        App.userRole = localStorage.setItem('userRole', 'admin');
        $('#user-profile').attr('href', '#adminProfile');
        return '#adminProfile';
    } else {
        if (App.getUserData(username) !== false) {
            App.userRole = localStorage.setItem('username', username);
            $('#user-profile').attr('href', '#userProfile/' + username);
            return '#userProfile/' + username;
        } else {
            return '#logIn';
        }
    }
};

App.getUserRole = function() {
    return App.userRole;
};

App.logOut = function() {
    localStorage.removeItem('userRole');
};

