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
})

client.on('change', (settings) => {
    console.log(settings);
    if (settings['enable-auto-rotate'].current == true) {
        flagAutoRotate = true;
        autoRotate();
    } else {
        flagAutoRotate = false;
        clearInterval(myTimer);
        setProgress(false);
    }
})
