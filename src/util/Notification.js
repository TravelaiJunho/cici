////////////////////////////////////////

// import {NativeModules} from "react-native";
import PushNotification from 'react-native-push-notification';
import {navRef} from "../navigation/RootNavigation";
import Screen from "./type/Screen";
import {PUSH} from "./type/Push";
import {showDetail} from "./Detail";
import Common from "./Common";
////////////////////
const CHANNEL_ID = 'kangdaniel';
const CHANNEL_NAME = 'kangdaniel-channel';

////////////////////////////////////////
// Handler
class Notification {

    onNotification(notification) {
        if (typeof this._onNotification === 'function') {
            this._onNotification(notification);
        }
    }

    onRegister(token) {
        if (typeof this._onRegister === 'function') {
            this._onRegister(token);
        }
    }

    onAction(notification) {
        // console.log('Notification action received:');
        // console.log(notification.action);
        // console.log(notification);
        // if (notification.action === 'Yes') {
        //     PushNotification.invokeApp(notification);
        // }
    }

    onRemoteFetch(data) {
        if (typeof this._onRemoteFetch === 'function') {
            this._onRemoteFetch(data);
        }
    }

    onRegistrationError(err) {
        // console.log(err);
    }

    attachRegister(handler) {
        this._onRegister = handler;
    }

    attachNotification(handler) {
        this._onNotification = handler;
    }

    attachRemoteFetch(handler) {
        this._onRemoteFetch = handler;
    }
}

const handler = new Notification();

////////////////////////////////////////
// FUNCTION
export const initNotification = _ => {
    PushNotification.configure({
        onRegister: handler.onRegister.bind(handler),
        onRegistrationError: handler.onRegistrationError.bind(handler),
        onNotification: handler.onNotification.bind(handler),
        onAction: handler.onAction.bind(handler),
        onRemoteFetch: handler.onRemoteFetch.bind(handler),
        // IOS ONLY
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
    });
}

export const initBadge = _ => {
    // Only iOS
    PushNotification.getApplicationIconBadgeNumber(function (number) {
        if (number > 0) {
            PushNotification.setApplicationIconBadgeNumber(0);
        }
    });
}

export const createDefaultChannels = _ => {
    PushNotification.createChannel({channelId: CHANNEL_ID, channelName: CHANNEL_NAME},
        created => {
            // console.log(`createChannel 'default-channel-id' returned '${created}'`)
        });
}

export const sendNotification = (title, message, data) => {
    PushNotification.localNotification({
        channelId: CHANNEL_ID,
        title: title,
        message: message,
        data: data,
    });
}

const checkShouldNotUseScreen = name => {
    switch (name) {
        case Screen.SCREEN.SPLASH:
        case Screen.SCREEN.LOGIN:
        case Screen.STACK_LOGIN.LOGIN:
        case Screen.STACK_LOGIN.JOIN:
        case Screen.STACK_LOGIN.AUTHENTICATION:
        case Screen.STACK_LOGIN.RESET_PASSWORD:
        case Screen.STACK_LOGIN.CHANGE_PASSWORD:
            return false;
    }
    return true;
}

export const callScreenByData = (type, board, id) => {
    if (Common.isEmpty(navRef.current.getCurrentRoute())) return;
    const {name} = navRef.current.getCurrentRoute();
    if (checkShouldNotUseScreen(name)) {
        // Type
        switch (type) {
            case PUSH.BOARD:
                showDetail(navRef.current, board, id);
                break;

            case PUSH.LEVEL:
                navRef.current.navigate(Screen.TAB_BOTTOM.MORE);
                break;

            case PUSH.QUESTION:
                navRef.current.navigate(Screen.SCREEN_ACTIVITY.INQUIRE_DETAIL, {id: id});
                break;

            case PUSH.SUGGEST:
                navRef.current.navigate(Screen.SCREEN_ACTIVITY.SUGGEST_DETAIL, {id: id});
                break;
        }
    }
}

export const setBadgeCount = (count = 0) => {
    PushNotification.setApplicationIconBadgeNumber(count);
    // NativeModules.Badge.applyCount(count);
}

export const requestPermission = _ => {
    PushNotification.requestPermissions();
}

export const clear = _ => {
    // PushNotification.unregister();
    // PushNotification.abandonPermissions();
}

////////////////////////////////////////

export default handler;
