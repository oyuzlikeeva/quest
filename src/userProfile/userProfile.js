App = window.parent.App;

( function() {
    var hash,
        data,
        commentTemplate,
        photoTemplate,
        userPhotoTemplate,
        userTemplate;

    hash = window.parent.location.hash;
    window.parent.App.getUsersData();
    data = window.parent.App.getUserData( hash.split('/')[1] );
    userPhotoTemplate = Handlebars.compile( $('#user-photo-template').html() );
    commentTemplate = Handlebars.compile( $('#comment-template').html() );
    userTemplate = Handlebars.compile( $('#user-template').html() );

    $('.user-info').append( userTemplate( data.username) );
    $('.user-gallery').append( commentTemplate( data.userComments ));
    $('.user-photo').append( userPhotoTemplate( data.userProfilePhoto));
} )();

App.goOnQuestPage = function(questId) {
    window.parent.location.hash = '#questPage/' + questId;
};
