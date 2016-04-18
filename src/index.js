var App = {},
    xhr = new XMLHttpRequest();
    App.questCollection = [];

App.postData = (function(data, path) {
    xhr.open('POST', path, false);
    xhr.send(data);
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        return 'success'
    }
});

App.getQuestsData = function() {
    xhr.open('GET', '../api/questData.json', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        App.questData = JSON.parse(xhr.responseText);
    }
    App.createQuestCollection(App.questData);

    return(App.questData);
};

App.getQuestData = function(url) {
    var i,
        questCollection;

    questCollection= App.questCollection;
    for (i = 0; i < questCollection.length; i++) {
        if(questCollection[i].id === +url) {
            return questCollection[i].quests;
        }
    }
};

App.getCommentsData = function() {
    xhr.open('GET', '../api/commentsData.json', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        App.commentsData = JSON.parse(xhr.responseText);
        return App.commentsData;
    }
};

App.getQuestCommentsData = function() {
    var i,
        comment,
        comments = {},
        commentsData,
        questComments = [];

    commentsData = App.getCommentsData();
    for (key in commentsData) {
        for (i = 0; i < commentsData[key].length; i++) {
            comment = commentsData[key][i];
            if (comment.questID === App.questID) {
                questComments.push(comment);
            }
        }
    }
    return {comments: questComments};

};

App.getUserData = function(username) {
    var i,
        userData,
        users;

    xhr.open('GET', '../api/usersData.json', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        userData = JSON.parse(xhr.responseText);
        users = userData.users;
    }

    for (i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }

    return false;
};

App.getUserProfileData = function(username) {
    var i,
        commentsData,
        userData,
        userComments = [],
        data = {};

    userData = App.getUserData(username);
    commentsData = App.getCommentsData().comments;
    for (i = 0; i < commentsData.length; i++) {
        if (commentsData[i].username === username) {
            userComments.push(commentsData[i]);
        }
    }

    return data = {userData: userData,
        userComments: userComments};

};

App.createQuestCollection = function(questData) {
    var i,
        id,
        quest,
        quests = {},
        key;

    for (key in questData) {
        for (i = 0; i < questData[key].length; i++) {
            id = questData[key][i].id;

            if (quests[id] !== id) {
                quests[id] = { id: id };
            }
            quests[id][key] = questData[key][i];
        }
    }

    for (quest in quests) {
        App.questCollection.push(quests[quest]);
    }
};

App.User = new Object();
App.Quest = new Object();

App.goOnQuestPage = function(id) {
    var i,
        hash,
        questCollection = App.questCollection;

    for (i = 0; i < questCollection.length; i++) {
        if(questCollection[i].id === id) {
            hash = '#questPage/' + id;
            App.questID = id;
        }
    }
    window.location.hash = hash;
    document.getElementById('iframe').src = hash;
};

App.hiddenHeader = function() {
    var header,
        content,
        iframeUrl;

    iframeUrl = document.getElementById('iframe').src;
    if (iframeUrl === 'http://localhost:8888/logIn') {
        $('#header').css('display', 'none');
    } else {
        $('#header').css('display', 'block');
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
        localStorage.setItem('userRole', 'admin');
        $('#user-profile').attr('href', '#adminProfile');
        return '#adminProfile';
    } else {
        if (App.getUserData(username) !== false) {
            localStorage.setItem('userRole', 'user');
            $('#user-profile').attr('href', '#userProfile/' + username);
            return '#userProfile/' + username;
        } else {
            return '#logIn'
        }
    }
};

App.getUserRole = function() {
    return localStorage.getItem('userRole');
};

App.logOut = function() {
    localStorage.removeItem('userRole');
};

App.getQuestsData();
