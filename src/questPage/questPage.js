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

    //var photosCount = (App.questData.questInfo.photo).length;
    //var windowWidth = $('body').width();
    //$('.quest-photo-gallery ul').css('width', photosCount*1100 + 'px');
    //$('.quest-photo-gallery img').css('margin-left', ((windowWidth - 1100)/2) + 'px');
    //$('.quest-photo-gallery img').css('margin-right', ((windowWidth - 1100)/2) + 'px');
};

App.getQuestPageData();

App.goOnUserProfile = function(username) {
    window.parent.location.hash = '#userProfile/' + username;
};

//-------slider in photo gallery-----------

//$(document).ready(function() {
//    $('.slider').each(function () {
//        var obj = $(this);
//
//        $(obj).append('<div class="nav"></div>');
//        $(obj).find('li').each(function () {
//            $(obj).find('.nav').append('<span rel=' + $(this).index() + '></span>');
//            $(this).addClass('slider' + $(this).index());
//        });
//        $(obj).find('span').first().addClass('on');
//    });
//});
//
//function slider(obj, sl) {
//    var ul,
//        bl,
//        step;
//
//    ul = $(sl).find('ul');
//    bl = $(sl).find('li.slider' + obj);
//    step = $(bl).width();
//    $(ul).animate({
//        marginLeft: '-' + step * (obj - 1)
//    }, 500);
//}
//
//$(document).on('click', '.slider .nav span', function() {
//    var sl,
//        obj;
//
//    sl = $(this).closest('.slider');
//    $(sl).find('span').removeClass('on');
//    $(this).addClass('on');
//    obj = $(this).attr('rel');
//    slider(obj, sl);
//
//    return false;
//});
