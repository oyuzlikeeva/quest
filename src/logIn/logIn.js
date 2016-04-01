function submitLogInData() {
    var username,
        password,
        newHash,
        path = '/userData',
        data = {};

    username = document.getElementById('log-in-username').value;
    password = document.getElementById('log-in-password').value;
    data = {username: username,
        password: password};
    newHash = '#main';
    if (validatedLogInForm()) {
        submitData(path, data, newHash)
    } else {
        $('#log-in-error-message').css('display', 'block');
    }
}

function submitSignUpData() {
    var username,
        password,
        repeatPassword,
        newHash,
        path = '/userData',
        data = {};

    username = $('#sign-up-username').val();
    password = $('#sign-up-password').val();
    repeatPassword = $('#sign-up-repeat-password').val();
    data = {username: username,
        password: password,
        repeatPassword: repeatPassword};
    newHash = '#main';
    if (validatedSignUpForm()) {
        submitData(path, data, newHash)
    } else {
        $('#sig-up-error-message').css('display', 'block');
    }
}

function submitData(path, data, newHash) {
    var response;

    response = window.parent.postData(data, path);
    if (response === 'success') {
        window.parent.location.hash = newHash;
    }
}

function validatedLogInForm() {
    var username,
        password;

    username = $('#log-in-username');
    password = $('#log-in-password');
    if (username.val() !== '' || password.val() !== '') {
        return true;
    } else {
        return false;
    }
}

function validatedSignUpForm() {
    var username,
        password,
        repeatedPassword;

    username = $('#sign-up-username');
    password = $('#sign-up-password');
    repeatedPassword = ('#sign-up-repeat-password');
    if (username.val() === '' || password.val() === '' || repeatedPassword.val() === '') {
        return false;
    } else if (password.val() === repeatedPassword.val()) {
        return true;
    }
}

function showLogInForm() {
    $('.log-in-line').css('display', 'block');
    $('.log-in-form').css('display', 'block');
    $('.sign-up-line').css('display', 'none');
    $('.sign-up-form').css('display', 'none');
}
function showSignUpForm() {
    $('.log-in-line').css('display', 'none');
    $('.log-in-form').css('display', 'none');
    $('.sign-up-line').css('display', 'block');
    $('.sign-up-form').css('display', 'block');
}