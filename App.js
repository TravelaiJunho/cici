////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, {Component} from "react";
import {Platform, SafeAreaView, StatusBar, Text, TextInput} from "react-native";
import {Provider} from 'react-redux';
////////////////////
// Local
// import Sentry from '@util/Sentry';
import Store from '@data/redux/Store';
import {colors} from '@util/Color';
import Layout from '@util/Layout';
import Splash from "@screen/splash/Splash";
import GlobalAlert from "./src/component/alert/GlobalAlert";
import {initAxios} from "./src/data/_base/BaseAxios";
import NetInfo from "@react-native-community/netinfo";

import Orientation, { OrientationLocker, PORTRAIT, LANDSCAPE } from "react-native-orientation-locker";
import CodePush from 'react-native-code-push'

////////////////////////////////////////
// SETTING
////////////////////////////////////////

initAxios();

// Sentry.init()
// LogBox.ignoreLogs(['Require cycle:']);

Text.defaultProps = Text.defaultProps || {};
TextInput.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.underlineColorAndroid = "transparent";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class App extends Component {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);

        this.operation  = PORTRAIT
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._onOrientationDidChange);
        Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        if(this.unsubscribeNetInfo) {
            this.unsubscribeNetInfo();
        }
        Orientation.removeOrientationListener(this._onOrientationDidChange);

    }

    _onOrientationDidChange = (orientation) => {
        if(Platform.OS == "android") {
            if(!Layout.GetOperationLock()) {
                //console.warn("ori lock" + orientation)
                return;
            }
            Layout.GetOperationLock() ? Orientation.lockToPortrait() : Orientation.unlockAllOrientations()

            if (orientation == 'LANDSCAPE-LEFT') {
                //do something with landscape left layout
            } else {
                //do something with portrait layout
            }
        }
        // else{
        //     if(!Layout.GetOperationLock()) {
        //         if (orientation == 'LANDSCAPE-LEFT') {
        //             //do something with landscape left layout
        //             Orientation.lockToLandscapeLeft();
        //         } else {
        //             //do something with portrait layout
        //             Orientation.lockToPortrait();
        //         }
        //     }
        // }

    };

    ////////////////////
    // RENDER
    render() {
        return (
            <Provider store={Store}>
                {/* StatusBar */}
                <StatusBar barStyle="light-content"
                           backgroundColor={colors.background}
                           translucent={false}
                           hidden={false}/>
                {/* Screen */}
                <SafeAreaView style={{flex: 1}}>
                    <Splash/>
                </SafeAreaView>
                {/* Global */}
                <GlobalAlert/>
            </Provider>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////
let codePushOptions = {
    // checkFrequency: CodePush.CheckFrequency.MANUAL
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    updateDialog: true,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    //mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};


export default CodePush(codePushOptions)(App);
//export default App;
