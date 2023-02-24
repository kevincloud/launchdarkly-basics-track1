var dogApi = "https://dog.ceo/api/breeds/image/random";
var flagAutoRotate = false
var myTimer = null

function delay(timeInMs) {
    return new Promise(resolve => setTimeout(resolve, timeInMs));
}

function setProgress(value) {
    var bgcolor = "#000000";
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
            timeBox.style.backgroundColor = "#000000";
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

window.addEventListener('load', function () {
    getDogPhoto();
    setProgress(false);
});
