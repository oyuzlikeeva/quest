function goOnQuestPage(id) {
    window.parent.App.goOnQuestPage(id);
}

(function() {
    function getData(){
        var template,
            data;

        data = window.parent.App.getQuestsData();
        template = Handlebars.compile($('#template').html());
        $('.quests-gallery-page').append(template(data)) ;
    }
    getData();
})();
