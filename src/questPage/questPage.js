var questData;


function getQuestInfoData(){
    questData = window.parent.getQuestData();
    var template = Handlebars.compile($('#quest-template').html());

    $('.quest-info').append( template(questData) );
    console.log('questData: \n' + questData);
}
getQuestInfoData();

function getCommentsData(){
    var data = window.parent.getQuestCommentsData();
    commentTemplate = Handlebars.compile($('#comment-template').html());

    $('.quest-comments').append( commentTemplate(data) );
    console.log('commentsData: \n' + data);
}
getCommentsData();


function openEditModal() {
    var template = Handlebars.compile($('#edit-template').html());
    $('#edit-form').append( template(questData) );
    console.log('questData: \n' + questData);
}