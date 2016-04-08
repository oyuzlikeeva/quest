var data;

function getAdminData(){
    var template;

    data = window.parent.getCommentsData();
    template = Handlebars.compile($('#template').html());

    $('tbody').append( template(data) );
    console.log(data);
}
getAdminData();


function submitAddedData() {
    var questName,
        projectName,
        reservationURL,
        numberOfPersons,
        coast,
        time,
        address,
        keywords,
        description,
        photo,
        newHash,
        path = '/questData',
        data = {};

    questName = $('#quest-name').val();
    projectName = $('#project-name').val();
    reservationURL = $('#reservation-url').val();
    numberOfPersons = $('#number-of-persons').val();
    coast = $('#coast').val();
    time = $('#time').val();
    address = $('#address').val();
    keywords = $('#keywords').val();
    description = $('#description').val();
    photo = $('#photo').val();
    data = {photo: photo,
        name: questName,
        projectName: projectName,
        coast: coast,
        keywords: keywords,
        numberOfPersons: numberOfPersons,
        timeOfQuest: time,
        description: description,
        address: address,
        siteForReservation: reservationURL};
    newHash = '#questPage';
    submitData(path, data, newHash)
}

function submitData(path, data, newHash) {
    var response;

    response = window.parent.postData(data, path);
    if (response === 'success') {
        window.parent.location.hash = newHash;
    }
}

function deletedComment(id) {
    var i,
        response,
        comments = data.comments;

    for (i = 0; i < comments.length; i++) {
        if (comments[i].questID === id) {
            response = window.parent.postData(comments[i], '/deleteCommentData');
            if (response === 'success') {
                $('#'+id ).remove();
                comments.splice(i,1);
                console.log(id, comments);
            }
        }
    }
}

function markNotSpoil(id) {
    var i,
        response,
        comments = data.comments;

    for (i = 0; i < comments.length; i++) {
        if (comments[i].questID === id) {
            console.log(comments[i]);
            comments[i].spoiler = false;
            console.log(comments[i]);
            response = window.parent.postData(comments[i], '/updateCommentsData');
            if (response === 'success') {
                $('#'+id ).remove();
            }
        }
    }
}
