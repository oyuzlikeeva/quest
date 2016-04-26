( function() {
    var hash,
        data,
        commentTemplate,
        photoTemplate,
        userTemplate;

    hash = window.parent.location.hash;
    data = window.parent.App.getUsersData( hash.split('/')[1] );
    photoTemplate = Handlebars.compile( $('#photo-template').html() );
    commentTemplate = Handlebars.compile( $('#comment-template').html() );
    userTemplate = Handlebars.compile( $('#user-template').html() );

    $('.user-info').append( userTemplate( data.username) );
    $('.user-gallery-item').append( commentTemplate( data.userComments ));
    $('.user-photo-gallery ul').append( photoTemplate( data.userPhoto));
} )();

//-------slider in photo gallery---------

$(document).ready( function() {
    $('.slider').each( function() {
        var obj = $(this);

        $(obj).append('<div class="nav"></div>');
        $(obj).find('li').each( function() {
            $(obj).find('.nav').append('<span rel=' + $(this).index() + '></span>');
            $(this).addClass('slider' + $(this).index());
        });
        $(obj).find('span').first().addClass('on');
    } );
} );

function slider(obj, sl) {
    var ul,
        bl,
        step;

    ul = $(sl).find('ul');
    bl = $(sl).find('li.slider' + obj);
    step = $(bl).width();
    $(ul).animate( {
        marginLeft: '-' + step * (obj -1)
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
} );
