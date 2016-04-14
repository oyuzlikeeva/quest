App = window.parent.App;

App.openEditModal = function() {
    var template = Handlebars.compile($('#edit-template').html());
    $('#edit-form').append(template(App.questData));
};

App.submitEditedQuestInfo = function() {
    var i,
        data = {},
        title,
        rating,
        comment,
        questData = App.questData,
        keyword,
        keywords = [];

    rating = $('#quest-rating').val();
    title = $('#comment-title').val();
    comment = $('#comment').val();
    keywords = questData.keywords.split(',');
    for (i = 0; i < keywords.length; i++) {
        keyword = keywords[i].trim();
        if (comment.indexOf(keyword) !== -1) {
            questData.spoil = true;
        }
    }
};

App.goOnUserProfile = function(username) {
    console.log(username);
    window.parent.location.hash = '#userProfile/' + username;
};

document.onload = function() {
    var userRole = App.getUserRole();

    if (userRole !== 'admin') {
        $('#edit-quest-info').attr('class', 'hidden');
    }
};

App.getQuestInfoData = function() {
    var template,
        url;

    url = window.parent.location.hash;
    App.questData = window.parent.App.getQuestData(url.split('/')[1]);
    template = Handlebars.compile($('#quest-template').html());
    $('.quest-info').append(template(App.questData));
};

App.getQuestInfoData();

App.getCommentData = function() {
    var data,
        commentTemplate;

    data = window.parent.App.getQuestCommentsData();
    commentTemplate = Handlebars.compile($('#comment-template').html());
    $('.quest-comments').append(commentTemplate(data));
};

App.getCommentData();
