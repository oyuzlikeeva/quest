function getData(){
    var data,
        template,
        userTemplate;

    data = window.parent.getUserData();
    userTemplate = Handlebars.compile($('#user-template').html());
    $('.user-info').append( userTemplate(data) );
    console.log(data);
    template = Handlebars.compile($('#comment-template').html());
    $('.user-gallery-item').append( template(data) );
    console.log(data);
}
getData();

