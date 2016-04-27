App = window.parent.App;

(function() {
    var template;

    window.parent.App.getUsersData();
    App.data = window.parent.App.getCommentsData();
    template = Handlebars.compile($('#template').html());
    $('tbody').append( template(App.data) );
})();

App.submitAddedData = function() {
    var path = '/questData',
        newHash,
        data = {};

    data = {photo: $('#photo').val(),
        name: $('#quest-name').val(),
        projectName: $('#project-name').val(),
        coast: $('#coast').val(),
        keywords: $('#keywords').val(),
        numberOfPersons: $('#number-of-persons').val(),
        timeOfQuest: $('#time').val(),
        description: $('#description').val(),
        address: $('#address').val(),
        siteForReservation: $('#reservation-url').val()};
    newHash = '#questPage';
    App.submitData(path, data, newHash)
};

App.submitData = function(path, data, newHash) {
    var response;

    response = window.parent.App.postData(data, path);
    if (response === 'success') {
        window.parent.location.hash = newHash;
    }
};

App.deletedComment = function(id) {
    var i,
        response,
        comments = App.data.comments;

    for (i = 0; i < comments.length; i++) {
        if (comments[i].questID === id) {
            response = window.parent.App.postData(comments[i], '/deleteCommentData');
            if (response === 'success') {
                $('#'+id ).remove();
                comments.splice(i,1);
            }
        }
    }
};

App.markNotSpoil = function(id) {
    var i,
        response,
        comments = App.data.comments;

    for (i = 0; i < comments.length; i++) {
        if (comments[i].questID === id) {
            comments[i].spoiler = false;
            response = window.parent.App.postData(comments[i], '/updateCommentsData');
            if (response === 'success') {
                $('#'+id ).remove();
            }
        }
    }
};
