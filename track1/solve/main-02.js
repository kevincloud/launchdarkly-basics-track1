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
})
