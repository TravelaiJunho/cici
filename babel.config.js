module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['module-resolver', {
            alias: {
                "@component": "./src/component",
                "@navigation": "./src/navigation",
                "@screen": "./src/screen",
                "@data": "./src/data",
                "@util": "./src/util",
                "@assets": "./assets",
            }
        }]
    ]
}
