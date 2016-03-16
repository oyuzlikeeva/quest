//var xhr = new XMLHttpRequest();
//
//xhr.open('GET', '../JavaScript/questData.json', true);
//
//xhr.send();
//
//if (xhr.status != 200) {
//    // обработать ошибку
//    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
//} else {
//    var quests = JSON.parse(xhr.responseText);
//    alert( xhr.responseText ); // responseText -- текст ответа.
//}
//var xhr = new XMLHttpRequest();
//
//xhr.open('GET', '../JavaScript/questData.json', true);
//
//xhr.send();
//
//if (xhr.status != 200) {
//    // обработать ошибку
//    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
//} else {
//    var quests = JSON.parse(xhr.responseText);
//    alert( xhr.responseText ); // responseText -- текст ответа.
//}
var data = {comments: [{
    questName: 'Человек, которого не было',
    username: 'Bacя',
    rating: '4',
    comment: 'Здесь умопомрачительная история',
    dataAddedComent: '11.01.16',
    spoiler: true
}, {
    questName: 'Тайна третьего Рейха',
    username: 'Коля',
    rating: '4',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '05.05.15'
}, {
    questName: 'Комната Шелока Холмса',
    username: 'Петя',
    rating: '3.5',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '31.12.15'
}, {
    questName: 'Капсульный отель',
    username: 'Маша',
    rating: '5',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '01.01.16',
    spoiler: true
}, {
    questName: 'Замок святого ангела',
    username: 'Саша',
    rating: '3.5',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '15.03.15'
}, {
    questName: 'Блейд',
    username: 'Марина',
    rating: '4',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '20.06.15'
}, {
    questName: 'Тайная лаборатория',
    username: 'Настя',
    rating: '3.5',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '07.07.15'
}, {
    questName: '1408',
    username: 'Лена',
    rating: '5',
    comment: 'Здесь умопомрачительная история',
    dataAddedComment: '01.11.15',
    spoiler: true
}]};

var template = Handlebars.compile($('#template').html());
$('tbody').append( template(data) );



