App = window.parent.App;
App.menuElements = $('.admin-menu nav').children();
App.objectOnDelete = {};

(function() {
  var template;

  App.usersData = window.parent.App.getAllUsersData();
  window.parent.App.getUsersData();
  App.questsData = window.parent.App.getQuestsData();
  App.commentsData = window.parent.App.getCommentsData();
  commentsTemplate = Handlebars.compile($('#comments-template').html());
  questsTemplate = Handlebars.compile( createQustTableTemplate());
  usersTemplate = Handlebars.compile($('#users-template').html());
  $('.notifications-table').append( commentsTemplate(App.commentsData));
  $('.quests-table tbody').append( questsTemplate(App.questsData));
  $('.users-table').append( usersTemplate(App.usersData));
})();

//Navigation in tables (notifications, quests, users)
$('.admin-menu nav a').click(function() {
  var newActive = $(this),
      newActiveID = $(this).attr('id'),
      allElements = App.menuElements;

  for (var i = 0; i < allElements.length; i++) {
    if ($(allElements[i]).hasClass('active'))
      $(allElements[i]).removeClass('active')
  }

  $('.table').addClass('hidden');

  newActive.addClass('active');
  $('.'+ newActiveID).removeClass('hidden');
});

//Added new quest
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
  App.submitData(path, data, newHash);
};

App.submitData = function(path, data, newHash) {
  var response;

  response = window.parent.App.postData(data, path);
  if (response === 'success') {
    window.parent.location.hash = newHash;
  }
};

App.openEditModal = function(id) {
  var template,
    data = (App.questData).quests;

  for (var i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      template = Handlebars.compile($('#edit-template').html());
      $('#edit-form').append(template(data[i]));
    }
  }
};

App.submitEditedQuestInfo = function() {
  var i,
    title,
    rating,
    comment,
    questData = App.questData,
    keyword,
    keywords = [];

  rating = $('#quest-rating').val();
  title = $('#comment-title').val();
  comment = $('#comment').val();
  keywords = questData.keywords.split(',');
  for (i = 0; i < keywords.length; i++) {
    keyword = keywords[i].trim();
    if (comment.indexOf(keyword) !== -1) {
      questData.spoil = true;
    }
  }
};

App.deletedComment = function(id) {
  var i,
    j,
    response,
    comments = App.commentsData;

  for (i = 0; i < comments.length; i++) {
    if (comments[i] !== undefined) {
      for (j = 0; j < comments[i].length; j++) {
        if (comments[i][j].questID === id) {
          response = window.parent.App.postData(comments[i], '/deleteCommentData');
          if (response === 'success') {
            $('#comment' + id ).remove();
            comments.splice(i,1);
          }
        }
      }
    }
  }
};

App.markNotSpoil = function(id) {
  var i,
    j,
    response,
    comments = App.commentsData;

  for (i = 0; i < comments.length; i++) {
    if (comments[i] !== undefined) {
      for (j = 0; j < comments[i].length; j++) {
        if (comments[i][j].questID === id) {
          comments[i][j].spoiler = false;
          response = window.parent.App.postData(comments[i], '/updateCommentsData');
          if (response === 'success') {
            $('#comment' + id).remove();
          }
        }
      }
    }
  }
};

App.setOnDelete = function(key, id) {
  App.objectOnDelete = {
    key: key,
    id: id
  }
};

App.objectDelete = function() {
  var response;
  switch (App.objectOnDelete.key) {
    case 'quest':
      console.log('quest: ', App.objectOnDelete);
      deleteObject(App.questsData, '/deleteQuestData', App.objectOnDelete.id, 'quest');
      break;
    case 'user':
      console.log('user: ',App.objectOnDelete);
      deleteObject(App.usersData, '/deleteUserData', App.objectOnDelete.id, 'user');
      break;
  }
  App.objectOnDelete = {};
  $('#request-close').click();
};

App.sortColumn = function(arrName, key) {
  switch (arrName) {
    case 'quests':
      //App.questsData.sort(
      //  function compare(a,b) {
      //    if (a.name < b.name)
      //      return -1;
      //    if (a.name > b.name)
      //      return 1;
      //    return 0;
      //  });
      $('.quests-table tbody tr').remove();
      questsTemplate = Handlebars.compile( createQustTableTemplate() );
      $('.quests-table').append( questsTemplate(compare(App.questsData, 'name')));
      break;
    case 'users':
      _.sortBy( App.usersData, key );
      break;
    case 'comments':
      _.sortBy( App.comments, key );
      break;
  }
};

//function sortingColumn (data, key) {
//  console.log(key);
//  data.sort(compare.bind(key));
//  return data;
//}

function compare (field, reverse, primer){
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}


function createQustTableTemplate() {
  return('{{#each this}}' +
  '<tr id="quest{{id}}" class="row">' +
  '<td class="questName col-md-2" onclick="App.goOnQuestPage({{id}})">{{name}}</td>' +
  '<td class="projectName col-md-2">{{projectName}}</td>' +
  '<td class="coast col-md-1">{{coast}}</td>' +
  '<td class="numberOfPersons col-md-1">{{numberOfPersons}}</td>' +
  '<td class="address col-md-2">{{address}}</td>' +
  '<td class="siteForReservation col-md-3">{{siteForReservation}}</td>' +
  '<td class="actions col-md-1">' +
  '<a title="Удалить квест" href="#request-object-delete" onclick="App.setOnDelete(\'quest\', {{id}})">' +
  '<img src="../img/icons/ic_delete_black_36px.svg"' +
  'alt="Delete comment"/>' +
  '</a>' +
  '<a title="Изменить квест" href="#edit-quest-info" onclick="App.openEditModal({{id}})">' +
  '<img src="../img/icons/ic_mode_edit_black_36px.svg"' +
  '    alt="Stay comment"/>' +
  '</a>' +
  '</td>' +
  '</tr>' +
  '{{/each}}');
}
function deleteObject(data, api, id, objectType) {
  for (i = 0; i < data.length; i++) {
    if (data[i] !== undefined) {
        if (data[i].id === id) {
          //var response = window.parent.App.postData(data[i], api);
          //if (response === 'success') {
            $('#' + objectType + id).remove();
          //}
        }

    }
  }
}

App.goOnQuestPage = function(questId) {
  window.parent.location.hash = '#questPage/' + questId;
};

App.goOnUserProfile = function(username) {
  window.parent.location.hash = '#userProfile/' + username;
};