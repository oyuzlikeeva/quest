var xhr = new XMLHttpRequest(),
    questData,
    commentsData,
    quests = {},
    goOnQuestData = {},
    questID = '',
    questCollection = [];

function postData(data, path) {
    xhr.open('POST', path, false);
    xhr.send(data);

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        console.log('Success post data');
        return 'success'
    }
}

function getQuestsData() {
    xhr.open('GET', '../questData.json', false);
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        questData = JSON.parse(xhr.responseText);
    }
    createCollection(questData);

    return(questData);
}

function getQuestData() {
    return goOnQuestData;
}

function getCommentsData() {
    var i,
        comment,
        comments = {},
        questComments = [];

    xhr.open('GET', '../commentsData.json', false);
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        commentsData = JSON.parse(xhr.responseText);
        for (key in commentsData) {
            for (i=0; i < commentsData[key].length; i++) {
                comment = commentsData[key][i];
                if (comment.questID === questID) {
                    questComments.push(comment);

                    console.log(questComments);
                }
            }
        }
console.log(questComments);
        return {comments: questComments};
    }
}

function getUserData() {
    var i,
        data,
        userComments = {};

    data = getCommentsData();
    questData = data.comments;
    for (i = 0; i < questData.length; i++) {
        if (questData[i].username === 'Вася') {
            return questData[i];
        }
    }
}

function createCollection(questData) {
    var id,
        quest,
        key,
        i;

    for (key in questData) {
        for (i = 0; i < questData[key].length; i++) {
            id = questData[key][i].id;

            if (quests[id] !== id) {
                quests[id] = { id: id };
                quests[id][key] = questData[key][i];
            } else {
                quests[id][key] = questData[key][i];
            }
        }
    }

    for (quest in quests) {
        questCollection.push(quests[quest]);
    }
}

function goOnQuestPage(id) {
    var i;
    for (i = 0; i < questCollection.length; i++) {
        if(questCollection[i].id === id) {
            questID = id;
            goOnQuestData = questCollection[i].quests;
        }
    }

    window.location.hash = '#questPage';
}

function hiddenHeader() {
    var header,
        content,
        iframeUrl;


    header = document.getElementsByClassName('header')[0];
    content = document.getElementsByClassName('content')[0];
    iframeUrl = document.getElementById('iframe').src;
    if (iframeUrl === 'http://localhost:8888/logIn') {
        header.style.display = 'none';
        content.style.marginTop = '0';
    } else {
        header.style.display = 'block';
    }
}

function changeUrl() {
    var windowUrl,
        iframe;
    windowUrl = window.location.hash.substring(1);
    console.log(windowUrl);
    iframe = document.getElementById('iframe');
    iframe.src = windowUrl;
}

window.onhashchange = changeUrl;
window.onload = function() {
    document.getElementById('iframe').style.display = 'block';
    changeUrl();
};