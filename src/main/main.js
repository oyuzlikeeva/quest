function getData(){
    var data = window.parent.getQuestsData();
    var template = Handlebars.compile($('#template').html());

    $('.quests-gallery-page').append( template(data) );
    console.log(data);
}
 getData();