var data;

function getData(){
    var template;

    data = window.parent.getQuestsData();
    template = Handlebars.compile($('#template').html());
    $('.quests-gallery-page').append(template(data)) ;
}
 getData();

function goOnQuestPage(id) {
    window.parent.goOnQuestPage(id);
}
