App = window.parent.App;

App.getQuestPageData = function() {
    var questTemplate,
        photoTemplate,
        commentsTemplate,
        url;

    url = window.parent.location.hash;
    App.getQuestsData();
    App.questData = window.parent.App.getQuestData(+url.split('/')[1]);
    questTemplate = Handlebars.compile($('#quest-template').html());
    photoTemplate = Handlebars.compile($('#photo-template').html());
    commentsTemplate = Handlebars.compile($('#comment-template').html());
    $('.quest-info').append(questTemplate(App.questData.questInfo));
    $('.quest-photo-gallery ul').append(photoTemplate(App.questData.questInfo.photo));
    $('.quest-comments').append(commentsTemplate(App.questData.comments));
};

App.getQuestPageData();

App.openEditModal = function() {
    var template = Handlebars.compile($('#edit-template').html());
    $('#edit-form').append(template(App.questData));
};

App.submitEditedQuestInfo = function() {
    var i,
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

//-------slider in photo gallery-----------

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

function slider(obj, sl) {
    var ul,
        bl,
        step;

    ul = $(sl).find('ul');
    bl = $(sl).find('li.slider' + obj);
    step = $(bl).width();
    $(ul).animate({
        marginLeft: '-' + step * (obj - 1)
    }, 500);
}

$(document).on('click', '.slider .nav span', function() {
    var sl,
        obj;

    sl = $(this).closest('.slider');
    $(sl).find('span').removeClass('on');
    $(this).addClass('on');
    obj = $(this).attr('rel');
    slider(obj, sl);

    return false;
});
