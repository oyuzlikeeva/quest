var questData;


function getQuestInfoData(){
    questData = window.parent.getQuestData();
    var template = Handlebars.compile($('#quest-template').html());

    $('.quest-info').append(template(questData));
}
getQuestInfoData();

function getCommentsData(){
    var data = window.parent.getQuestCommentsData();
    commentTemplate = Handlebars.compile($('#comment-template').html());

    $('.quest-comments').append(commentTemplate(data));
}
getCommentsData();


function openEditModal() {
    var template = Handlebars.compile($('#edit-template').html());
    $('#edit-form').append(template(questData));
}

function submitEditedQuestInfo() {
    var i,
        title,
        rating,
        comment,
        keyword,
        keywords = [];

    rating = $('#quest-rating').val();
    title = $('#comment-title').val();
    comment = $('#comment').val();
    console.log(comment);
    keywords = questData.keywords.split(',');
    for (i = 0; i < keywords.length; i++) {
        keyword = keywords[i].trim()
        if (comment.indexOf(keyword) !== -1) {
            questData.spoil = true;
        }
    }
}