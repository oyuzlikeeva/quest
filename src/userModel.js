function UserModel(user) {
    var vm = this;

    vm.user = user;
}

UserModel.prototype = {

    getUserProfileData: function() {
        return data = {userData: vm.user,
            userComments: vm.comments};
        }
};

