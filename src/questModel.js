function QuestModel(quest) {
    this.id = quest.id;
    this.questInfo = quest.quests;
    this.comments = quest.quests.comments;

    this.getQuestForMainPage = function() {
        return this.questInfo;
    };

    this.getQuestData = function() {
        return {
            id: this.id,
            questInfo: this.questInfo,
            comments: this.comments
        };
    };

    this.getQuestID = function() {
        return this.id;
    };

    return this;
}
