var xhr = new XMLHttpRequest();

xhr.open('GET', 'questData.json', false);

xhr.send();

//if (xhr.status != 200) {
//    alert( xhr.status + ': ' + xhr.statusText );
//
//} else {
//
//}


var quests = JSON.parse(xhr.responseText);
var template = Handlebars.compile($('#template').html());

$('.content').append( template(quests) );
alert( xhr.responseText );

//function goOnQuestPage(id){
//    //var i;
//    //
//    //for (i = 0; i < data.length; i++){
//    //    if (data[i].id === id){
//    //
//    //    }
//    //}
//    return 'location = http://localhost:8888/questPage'
//}