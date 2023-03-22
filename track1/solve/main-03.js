const context = {
    kind: 'user',
    key: 'my-unique-object-key',
    name: 'launchdarkly',
    userType: 'beta',
    location: 'CA'
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
})
