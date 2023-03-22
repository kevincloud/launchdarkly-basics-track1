// BEGIN: Challenge 03
const context = {
    kind: 'browser',
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
    // BEGIN: Challenge 05
    // Code Section
    mainBgColor = client.variation('background-color', '#000000');
    document.getElementsByTagName('html')[0].style.backgroundColor = mainBgColor;
    for (item in document.getElementsByClassName('progressbar')) {
        document.getElementsByClassName('progressbar')[item].style.backgroundColor = mainBgColor;
    }
    // End Code Section
    // END: Challenge 05
})

// BEGIN: Challenge 04
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
    // BEGIN: Challenge 05
    // Code Section
    if (settings['background-color']) {
        mainBgColor = settings['background-color'].current;
        document.getElementsByTagName('html')[0].style.backgroundColor = mainBgColor;
        for (item in document.getElementsByClassName('progressbar')) {
            document.getElementsByClassName('progressbar')[item].style.backgroundColor = mainBgColor;
        }
    }
    // End Code Section
    // END: Challenge 05
})
// END: Challenge 04

// END: Challenge 03
