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
    $('.user-photo-gallery').append(photoTemplate(userData));
})();
