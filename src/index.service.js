var App = {},
    xhr = new XMLHttpRequest();
    App.questsCollection = [];
    App.mainPageCollection = [];
    App.usersCollection = [];

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
    console.log(App.questsCollection)
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
