function getAdminData(){
    var data,
        template;

    data = window.parent.getCommentsData();
    template = Handlebars.compile($('#template').html());

    $('tbody').append( template(data) );
    console.log(data);
}
getAdminData();





