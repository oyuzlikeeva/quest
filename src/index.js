var xhr = new XMLHttpRequest(),
    questData,
    commentsData,
    userData;

function postData(data, path) {
    xhr.open('POST', path, false);
    xhr.send(data);

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        console.log('Success post data')
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
        return(questData);
}

function getQuestData() {
    var i,
        data;

    data = getQuestsData();
    questData = data.quests;
    for (i = 0; i < questData.length; i++) {
        console.log(questData[i].id);
        if (questData[i].id === '3') {
            console.log(questData[i]);
            return questData[i];
        }
    }
}

function getCommentsData() {
    var i;

    xhr.open('GET', '../commentsData.json', false);
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        commentsData = JSON.parse(xhr.responseText);
        return commentsData;
    }
}

function getUserData() {
    var i,
        data,
        userComments = {};

    data = getCommentsData();
    questData = data.comments;
    for (i = 0; i < questData.length; i++) {
        console.log(questData[i].username);
        if (questData[i].username === 'Вася') {
            console.log(questData[i]);
            return questData[i];
        }
    }

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

//function goOnQuestPage() {
//    var windowUrl,
//        iframe;
//    windowUrl = window.location.hash.substring(1);
//    console.log(windowUrl);
//    iframe = document.getElementById('iframe');
//    iframe.src = windowUrl;
//}


window.onhashchange = changeUrl;
window.onload = function() {
    document.getElementById('iframe').style.display = 'block';
    changeUrl();
};