var dogApi = "https://dog.ceo/api/breeds/image/random";
var flagAutoRotate = false;
var myTimer = null;
var mainBgColor = '#000000';
var mainUserName = "";
var pageTitle = "LaunchDogly";

const context = {
    kind: 'user',
    key: 'my-unique-object-key',
    name: 'YOUR_NAME',
    userType: 'beta',
    location: 'YOUR_STATE'
};

const client = LDClient.initialize(clientKey, context);

client.on('ready', () => {
    if (client.variation('enable-auto-rotate', false) == true) {
        flagAutoRotate = true;
        autoRotate();
    }
    mainBgColor = client.variation('background-color', '#000000');
    document.getElementsByTagName('html')[0].style.backgroundColor = mainBgColor;
    for (item in document.getElementsByClassName('progressbar')) {
        document.getElementsByClassName('progressbar')[item].style.backgroundColor = mainBgColor;
    }
    if (client.variation('new-app-name', false) == true) {
        pageTitle = "LaunchBarkly"
    } else {
        pageTitle = "LaunchDogly"
    }
    document.getElementById('pagetitle').innerText = pageTitle + " Photo App!"
})

client.on('change', (settings) => {
    console.log(settings);
    if (settings['enable-auto-rotate']) {
        if (settings['enable-auto-rotate'].current == true) {
            flagAutoRotate = true;
            autoRotate();
        } else {
            flagAutoRotate = false;
            clearInterval(myTimer);
            setProgress(false);
        }
    }
    if (settings['background-color']) {
        mainBgColor = settings['background-color'].current;
        document.getElementsByTagName('html')[0].style.backgroundColor = mainBgColor;
        for (item in document.getElementsByClassName('progressbar')) {
            document.getElementsByClassName('progressbar')[item].style.backgroundColor = mainBgColor;
        }
    }
    if (settings['new-app-name']) {
        if (settings['new-app-name'].current == true) {
            pageTitle = "LaunchBarkly"
        } else {
            pageTitle = "LaunchDogly"
        }
        document.getElementById('pagetitle').innerText = pageTitle + " Photo App!"
    }
})

function delay(timeInMs) {
    return new Promise(resolve => setTimeout(resolve, timeInMs));
}

function setProgress(value) {
    var bgcolor = mainBgColor;
    if (value == true)
        bgcolor = "#999999";

    for (i = 1; i <= 4; i++) {
        timeBox = document.getElementById("timebox_" + i);
        timeBox.style.backgroundColor = bgcolor;
    }
}

function autoRotate() {
    var secondsPassed = 0;
    setProgress(true);
    myTimer = setInterval(() => {
        if (secondsPassed >= 0 && secondsPassed < 4) {
            timeBox = document.getElementById("timebox_" + (4 - secondsPassed));
            timeBox.style.backgroundColor = mainBgColor;
        }
        secondsPassed++;

        if (secondsPassed >= 5) {
            secondsPassed = 0;
            setProgress(false);
            getDogPhoto();
        }
    }, 1000);
}

function getDogPhoto() {
    var xhr = new XMLHttpRequest();
    var url = dogApi;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var img = document.getElementById("dogphoto_image");
            var res = JSON.parse(this.responseText);
            img.src = res.message;
            setProgress(flagAutoRotate);
        }
    }
    xhr.send();
}

function getUserName() {
    user = this.document.getElementById('username_box').value.trim();
    if (user == "") {
        alert("Please enter a username, then press Login");
        this.document.getElementById('username_box').focus();
        return;
    }
    mainUserName = user;
    this.document.getElementById('myusername').innerHTML = "Username: " + mainUserName + " <a href=\"\"><img src=\"/static/edit-icon.png\" style=\"width:12px; height:12px;\" href=\"javascript:getUserName();\" /></a>";
    this.document.getElementById('myModalBox').style.display = 'none';
    newContext = {
        kind: 'user',
        key: mainUserName,
        name: mainUserName + '-user',
        userType: 'beta',
        location: 'CA'
    };
    client.identify(newContext);
}

window.addEventListener('load', function () {
    getDogPhoto();
    setProgress(false);
    this.document.getElementById('username_box').focus();

    var input = this.document.getElementById('username_box');

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            getUserName();
        }
    });
});
