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
    submitData(path, data, newHash)
}

function submitSignUpData() {
    var username,
        password,
        repeatPassword,
        newHash,
        path = '/userData',
        data = {};

    username = document.getElementById('sign-up-username').value;
    password = document.getElementById('sign-up-password').value;
    repeatPassword = document.getElementById('sign-up-repeat-password').value;
    data = {username: username,
        password: password,
        repeatPassword: repeatPassword};
    newHash = '#main';
    submitData(path, data, newHash)
}

function submitData(path, data, newHash) {
    var response;

    response = window.parent.postData(data, path);
    if (response === 'success') {
        window.parent.location.hash = newHash;
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