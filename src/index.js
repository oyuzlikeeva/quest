var App = {},
    xhr = new XMLHttpRequest();
    App.questsCollection = [];
    App.mainPageCollection = [];
    App.usersCollection = [];

//-------------service------------
App.postData = (function(data, path) {
    xhr.open('POST', path, false);
    xhr.send(data);
    if (xhr.status != 200) {
        console.error( xhr.status + ': ' + xhr.statusText );
    } else {
        return 'success'
    }
});

App.getQuestsData = function() {
    xhr.open('GET', '../api/questsData.json', false);
    xhr.send();
    if (xhr.status != 200) {
        console.error(xhr.status + ': ' + xhr.statusText);
    } else {
        App.questData = JSON.parse(xhr.responseText);
    }
    App.createQuestsCollection(App.questData);

    return App.mainPageCollection;
};

App.getUsersData = function(username) {
    var i,
        userData,
        users;

    xhr.open('GET', '../api/usersData.json', false);
    xhr.send();
    if (xhr.status != 200) {
        console.error(xhr.status + ': ' + xhr.statusText);
    } else {
        userData = JSON.parse(xhr.responseText);
        App.createUsersCollection(userData);
        for (i = 0; i < App.usersCollection.length; i++) {
            if (App.usersCollection[i].username === username) {
                return App.usersCollection[i].getUserProfileData();
            }
        }
    }
};

App.getQuestData = function(id) {
    var i,
        quests;

    quests = App.questsCollection;
    for (i = 0; i < quests.length; i++) {
        if (quests[i].id === id) {
            return quests[i];
        }
    }
};

App.createUsersCollection = function(userData) {
    var i,
        id,
        user,
        users = {},
        username,
        comments,
        key;

    for (key in userData) {
        for (i = 0; i < userData[key].length; i++) {
            username = userData[key][i].username;
            comments = userData[key][i].comments;

            if (users[username] !== username) {
                users[username] = { username: username };
            }
            users[username][key] = userData[key][i];
        }
    }

    for (user in users) {
        App.usersCollection.push(new UserModel(users[user]));
    }
};


App.createQuestsCollection = function(questData) {
    var i,
        id,
        quest,
        quests = {},
        key;

    for (key in questData) {
        for (i = 0; i < questData[key].length; i++) {
            id = questData[key][i].id;

            if (quests[id] !== id) {
                quests[id] = { id: id,
                    quest: questData[key][i]};
            }
            quests[id][key] = questData[key][i];
        }
    }

    for (quest in quests) {
        var quest = new QuestModel(quests[quest]);

        App.questsCollection.push(quest.getQuestData());
        App.mainPageCollection.push(quest.getQuestForMainPage());
    }
};


//-------------models--------------

function UserModel(user) {
    this.username = user.username;
    this.comments = user.users.comments;
    this.photo = user.users.photo;
    this.role = user.users.role;

    this.getUserProfileData = function() {
        return {
            username: this.username,
            userRole: this.role,
            userPhoto: this.photo,
            userComments: this.comments
        };
    };

    return this;
}

function QuestModel(quest) {
    this.id = quest.id;
    this.questInfo = quest.quests;
    this.comments = quest.quests.comments;

    this.getQuestForMainPage = function() {
        return this.questInfo;
    };

    this.getQuestData = function() {
        return {
            id: this.id,
            questInfo: this.questInfo,
            comments: this.comments
        };
    };

    this.getQuestID = function() {
        return this.id;
    };

    return this;
}

//---------------controller---------------
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

App.getQuestsData();
