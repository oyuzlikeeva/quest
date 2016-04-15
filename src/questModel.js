function QuestModel(quest){
    var vm = this;

    vm.quest = quest;
}

QuestModel.prototype = {
    getItems: function() {
        return vm.quest;
    },

    getQuestData: function(url) {
        var i,
            questCollection;

        questCollection= App.questCollection;
        for (i = 0; i < questCollection.length; i++) {
            if(questCollection[i].id === +url) {
                return questCollection[i].quests;
            }
        }
    }
};