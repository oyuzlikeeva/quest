function UserModel(user) {
    this.username = user.username;
    this.userPhoto = user.users.userPhoto;
    this.comments = user.users.comments;
    this.photo = user.users.photo;
    this.role = user.users.role;

    this.getUserProfileData = function() {
        return {
            userID: this.userID,
            username: this.username,
            userProfilePhoto: this.userPhoto,
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
