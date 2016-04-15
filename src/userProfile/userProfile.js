App = window.parent.App;

(function() {
    var hash,
        data,
        userData,
        commentsData,
        commentTemplate,
        photoTemplate,
        userTemplate;

    hash = window.parent.location.hash;
    data = window.parent.App.getUserProfileData(hash.split('/')[1]);
    userData = data.userData;
    commentsData = data.userComments;
    photoTemplate = Handlebars.compile($('#photo-template').html());
    commentTemplate = Handlebars.compile($('#comment-template').html());
    userTemplate = Handlebars.compile($('#user-template').html());

    $('.user-info').append(userTemplate(userData));
    $('.user-gallery-item').append(commentTemplate(commentsData));
    $('.slider ul').append(photoTemplate(userData));
})();

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
    sliderJS(obj, sl);

    return false;
});