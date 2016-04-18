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
    window.parent.location.hash = '#userProfile/' + username;
};

(function() {
    var userRole = App.getUserRole();

    if (userRole !== 'admin') {
        $('#edit-quest-info').css('display', 'none');
    }
})();

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

$(document).ready(function() {
    $('.slider').each(function () {
        var obj = $(this);

        $(obj).append('<div class="nav"></div>');
        $(obj).find('li').each(function () {
            $(obj).find('.nav').append('<span rel=' + $(this).index() + '></span>');
            $(this).addClass('slider' + $(this).index());
        });
        $(obj).find('span').first().addClass('on');
    });
});
function sliderJS (obj, sl) {
    var ul,
        bl,
        step;

    ul = $(sl).find('ul');
    bl = $(sl).find('li.slider' + obj);
    step = $(bl).width();
    $(ul).animate({
        marginLeft: '-' + step * (obj)
    }, 500);
}
$(document).on('click', '.slider .nav span', function() {
    var sl,
        obj;

    sl = $(this).closest('.slider');
    $(sl).find('span').removeClass('on');
    $(this).addClass('on');
    obj = $(this).attr('rel');
    sliderJS(obj, sl);

    return false;
});
