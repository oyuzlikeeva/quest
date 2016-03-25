function getQuestInfoData(){
    var data = window.parent.getQuestData();
    var template = Handlebars.compile($('#quest-template').html());

    $('.quest-info').append( template(data) );
    console.log('questData: \n' + data);
}
getQuestInfoData();

function getQuestCommentsData(){
    var data = window.parent.getCommentsData();
    commentTemplate = Handlebars.compile($('#comment-template').html());

    $('.quest-comments').append( commentTemplate(data) );
    console.log('commentsData: \n' + data);
}
getQuestCommentsData();



