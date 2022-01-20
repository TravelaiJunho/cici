////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, {Component} from 'react';
import {BackHandler} from "react-native";
////////////////////
// Local
import {navRef} from '../../navigation/RootNavigation';
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseScreen extends Component {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.onFocus && this.onFocus();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    ////////////////////
    // FUNCTION
    checkExit = state => {
        switch (Common.getScreenRouteName(state)) {
            case Screen.SCREEN.HOME:
                return true;
        }
        return false;
    }

    checkBack = state => {
        switch (Common.getScreenRouteName(state)) {
            case Screen.SCREEN_ACTIVITY.COMMENT:
            case Screen.SCREEN_ACTIVITY.ALARM_LIST:
            case Screen.STACK_MORE.REQUEST_MEMBER:
            // Media
            case Screen.SCREEN_ACTIVITY.MEDIA_IMAGE:
            case Screen.SCREEN_ACTIVITY.MEDIA_WALLPAPER:
            case Screen.SCREEN_ACTIVITY.MEDIA_VIDEO:
            case Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE:
            case Screen.SCREEN_ACTIVITY.MEDIA_AUDIO:
            // Post
            case Screen.SCREEN_ACTIVITY.POST:
            case Screen.SCREEN_ACTIVITY.POST_EVENT:
            case Screen.SCREEN_ACTIVITY.POST_INQUIRE:
            case Screen.SCREEN_ACTIVITY.POST_SUGGEST:
            // Detail
            // case Screen.SCREEN_ACTIVITY.POST_DETAIL:
            case Screen.SCREEN_ACTIVITY.POST_DETAIL2:
            case Screen.SCREEN_ACTIVITY.NOTICE_DETAIL:
            case Screen.SCREEN_ACTIVITY.INQUIRE_DETAIL:
            case Screen.SCREEN_ACTIVITY.SUGGEST_DETAIL:
            case Screen.SCREEN_ACTIVITY.BANNER_DETAIL:
            case Screen.SCREEN_ACTIVITY.EVENT_DETAIL:
                // viewer
            case Screen.SCREEN_ACTIVITY.IMAGE_VIEWER:
            case Screen.SCREEN_ACTIVITY.MEDIA_VIEWER:
                // post
            case Screen.SCREEN_ACTIVITY.POST_VOTE:
            case Screen.SCREEN_ACTIVITY.POST_PUBLIC_BROADCAST:
                return true;
        }
        return false;
    }

    handleBackButton = _ => {
        if (this.checkExit(navRef.current.getRootState())) {
            BackHandler.exitApp();
            return false;
        }
        if (this.checkBack(navRef.current.getRootState())) {
            navRef.current.canGoBack();
            return false;
        }
        return true;
        // Common.showAlert();
    };

    addBackHandler = _ => {
        if (Common.checkAndroid()) BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    removeBackHandler = _ => {
        if (Common.checkAndroid()) BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseScreen;
