App = window.parent.App;

App.submitLogInData = function() {
    var username,
        password,
        path = '/userData',
        data = {};

    username = document.getElementById('log-in-username').value;
    password = document.getElementById('log-in-password').value;
    data = {username: username,
        password: password};
    App.submitData(path, data);
};

App.submitSignUpData = function() {
    var username,
        password,
        repeatPassword,
        path = '/userData',
        data = {};

    username = $('#sign-up-username').val();
    password = $('#sign-up-password').val();
    repeatPassword = $('#sign-up-repeat-password').val();
    data = {username: username,
        password: password,
        repeatPassword: repeatPassword};
    if (App.validatedSignUpForm()) {
        var response;

        response = window.parent.App.postData(data, path);
        if (response === 'success') {
            App.setUserRole(data.username);
            window.parent.location.hash = '#userProfile/'+ username;
            window.location.hash = '#userProfile/'+ username;
        }
    } else {
        $('#sign-up-error-message').css('display', 'block');
    }
};

App.validatedSignUpForm = function() {
    var password,
        repeatedPassword;

    password = $('#sign-up-password');
    repeatedPassword = ('#sign-up-repeat-password');
    if (password.val() === repeatedPassword.val()) {
        return true;
    } else {
        $('#sign-up-error-message').css('display', 'block');
    }
};

App.submitData = function(path, data) {
    var response,
        newHash;

    response = window.parent.App.postData(data, path);
    if (response === 'success') {
        newHash = App.setUserRole(data.username);
        window.parent.location.hash = newHash;
        window.location.hash = newHash;
    } else  {
        $('#log-in-error-message').css('display', 'block');
    }
};

App.showLogInForm = function() {
    $('.log-in-line').css('display', 'block');
    $('.log-in-form').css('display', 'block');
    $('.sign-up-line').css('display', 'none');
    $('.sign-up-form').css('display', 'none');
};

App.showSignUpForm = function() {
    $('.log-in-line').css('display', 'none');
    $('.log-in-form').css('display', 'none');
    $('.sign-up-line').css('display', 'block');
    $('.sign-up-form').css('display', 'block');
};
