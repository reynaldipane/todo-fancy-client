function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log(response);

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "http://todo.purge-works.com/api/users/signinfb",
            headers: {
                fb_token: response.authResponse.accessToken
            }
        })
            .done(function (data) {
                console.log("Ini data nya " + JSON.stringify(data))
                localStorage.setItem('userid', data.data.id)
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('email', data.data.email)
                location.reload()
            })

    } 
    // else {
    //     document.getElementById('status').innerHTML = 'Please log ' +
    //         'into this app.';
    // }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        console.log(`Check Login !!!!!`)
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '607280472950629',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });

    // FB.getLoginStatus(function (response) {
    //     statusChangeCallback(response);
    // });

};


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log(response);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}