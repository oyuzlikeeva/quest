function UserModel(user) {
    this.username = user.username;
    this.comments = user.users.comments;
    this.photo = user.users.photo;
    this.role = user.users.role;

    this.getUserProfileData = function() {
        return {
            username: this.username,
            userRole: this.role,
            userPhoto: this.photo,
            userComments: this.comments
        };
    };

    this.getComments = function() {
        return this.comments;
    };

    return this;
}
