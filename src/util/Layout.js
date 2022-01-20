////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Dimensions, Platform, StatusBar} from 'react-native';
import Common from "./Common";

////////////////////////////////////////
// VALUE
////////////////////////////////////////

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get("window");

// UI by Design
const UI_WIDTH = 375;
// const UI_HEIGHT = 667;
var DEVICE_WIDTH = W_WIDTH;
var DEVICE_HEIGHT = W_HEIGHT;

// Status Bar
const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;

// X
const X_WIDTH = 375;
const X_HEIGHT = 812;

// XS MAX
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

// 12
const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

// 12 MAX
const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

//
let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhone12_v = false;
let isIPhone12Max_v = false;
let isIPhoneWithMonobrow_v = false;

if (Common.checkIOS() && !Platform.isPad && !Platform.isTVOS) {
    if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneX_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneXMax_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhone12_v = true;
        statusBarHeight = STATUSBAR_IP12_HEIGHT;
    } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhone12Max_v = true;
        statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
    }
}

////////////////////////////////////////
// FUNCTION
////////////////////////////////////////

const relativeWidth = num => (DEVICE_WIDTH * num) / 100;
const relativeHeight = num => (DEVICE_HEIGHT * num) / 100;

const UISize = size => {
    let resize = (size / UI_WIDTH) * DEVICE_WIDTH;
    if (resize > -1 && resize < 1) return 1;
    return resize;
};

// export const isIPhoneX = () => isIPhoneX_v;
// export const isIPhoneXMax = () => isIPhoneXMax_v;
// export const isIPhone12 = () => isIPhone12_v;
// export const isIPhone12Max = () => isIPhone12Max_v;
// export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;

// export function isIphoneX() {
//     const dm = Dimensions.get('window');
//     return (
//         Common.checkIOS() &&
//         !Platform.isPad && !Platform.isTVOS &&
//         ((dm.height === 780 || dm.width === 780)
//             || (dm.height === 812 || dm.width === 812)
//             || (dm.height === 844 || dm.width === 844)
//             || (dm.height === 896 || dm.width === 896)
//             || (dm.height === 926 || dm.width === 926))
//     );
// }

// const ifIphoneX = (iphoneXStyle, regularStyle) => {
//     if (isIphoneX()) return iphoneXStyle;
//     return regularStyle;
// }

const getStatusBarHeight = (skipAndroid = true, skipIOS = true) => {

    return Platform.select({
        ios: skipIOS ? 0 : statusBarHeight,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0,
    });
}

const getBottomSpace = _ => {
    return isIPhoneWithMonobrow_v ? 34 : 0;
}

// const getStatusBarHeight = (safe = true) => {
//     return Platform.select({
//         ios: ifIphoneX(safe ? 44 : 30, 20),
//         android: StatusBar.currentHeight,
//         default: 0
//     });
// }

// const getBottomSpace = _ => {
//     return isIphoneX() ? 34 : 0;
// }


const CreateMargin = (top, left, right, bottom) => {
    return {
        marginTop: top,
        marginLeft: left,
        marginRight: right,
        marginBottom: bottom,
    };
};

const HEADER_HEIGHT = UISize(50);

var OperationLock = true;

const GetOperationLock = () => {
    return OperationLock;
}
const ChangeOperationLock = (lock)=> {
    OperationLock = lock;
}
////////////////////////////////////////
export default {
    DEVICE_WIDTH, DEVICE_HEIGHT, HEADER_HEIGHT,
    UISize,
    getStatusBarHeight, getBottomSpace,
    relativeWidth, relativeHeight,
    CreateMargin,
    ChangeOperationLock, GetOperationLock
};
