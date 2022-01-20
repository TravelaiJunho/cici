////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, {Component} from "react";
import {Animated, Linking, View} from "react-native";
import SplashScreen from 'react-native-splash-screen';
import {connect} from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import VersionCheck from "react-native-version-check";
////////////////////
// Local
import {Navigator} from '../../navigation/Navigator';
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from '../_style/Splash.style';
import {IMAGE_LOGO} from '../../../assets';
// Component
import BaseButton from "../../component/_base/BaseButton";
import BaseImage from "../../component/_base/BaseImage";
// Util
import Storage from '../../util/Storage';
import Info from '../../util/Info';
import localize from '../../util/Localize';
import {initBadge, requestPermission} from "../../util/Notification";
import {colors} from "../../util/Color";
import {ANDROID_PACKAGE, IOS_APP_ID} from "../../util/Constants";
import Common from "../../util/Common";
// Redux
import {changeLanguage, getReportReasonList, initDownloadOption, isShowLogin} from "../../data/redux/action/Common";
import {getProfile} from "../../data/redux/action/User";
import {setSearchTextForCommunity} from "../../data/redux/action/Community";
import {setSearchTextForMemberShip} from "../../data/redux/action/MemberShip";
import {setFilterForTalkTalk} from "../../data/redux/action/TabTalkTalk";
import {setFilterForToDaniel} from "../../data/redux/action/TabToDaniel";
import {setFilterForTalk} from "../../data/redux/action/TabTalk";
import {getTagListEventForNotice, setFilterEventForNotice, setSearchTextEventForNotice} from "../../data/redux/action/TabEventForNotice";
import {getTagListEventForMemberShip, setFilterEventForMemberShip, setSearchTextEventForMemberShip} from "../../data/redux/action/TabEventForMemberShip";
import {initTargetLanguage, initTranslateCount} from "../../data/redux/action/Translate"
////////////////////////////////////////
// LOCAL VALUE
////////////////////////////////////////

const LOGO_TIME = 3000;

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Splash extends Component {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowSplash: true,
            isShowStartedButton: false,
            isShowLogin: true,
            // Animate
            logoAnimateValue: new Animated.Value(0),
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        this.unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) Common.showAlert(localize.error.network);
        });
        SplashScreen.hide();
        this.init();
        this.checkVersion();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.isShowLogin !== nextProps.isShowLogin) {
            this.setShowLogin(nextProps.isShowLogin)
        }
        return true;
    }

    ////////////////////
    // FUNCTION
    setShowStartedButton = (isShow = false) => this.setState({isShowStartedButton: isShow})

    setShowLogin = (isShow = false) => {
        this.setState({
            isShowSplash: false,
            isShowLogin: isShow,
        });
        // }, _ => this.props.changeLogin(isShow));
    }

    checkVersion = async _ => {
        try {
            const currentVersion = await VersionCheck.getCurrentVersion();
            const latestVersion = await VersionCheck.getLatestVersion();
            if (!Common.isEmpty(currentVersion) && !Common.isEmpty(latestVersion)) {
                // 0.0.0
                const last = latestVersion.split(Common.SEPARATOR_DOT);
                const current = currentVersion.split(Common.SEPARATOR_DOT);
                // Major 버전만 체크
                if (last[0] !== current[0]) {
                    Common.showAlert(localize.app.force_update, _ => {
                        if (Common.checkIOS()) {
                            VersionCheck.getAppStoreUrl({appID: IOS_APP_ID})
                                .then(value => Linking.openURL(value))
                                .catch(reason => Common.debug(reason, true));
                        } else {
                            VersionCheck.getPlayStoreUrl({packageName: ANDROID_PACKAGE})
                                .then(value => Linking.openURL(value))
                                .catch(reason => Common.debug(reason, true));
                        }
                    });
                }
            }
        } catch (e) {
        }
    }

    // Init
    init = async _ => {
        // Push
        initBadge();
        requestPermission();
        this.getPushToken();
        // Language
        this.checkLanguage();
        // Init
        this.props.initSearchTextForCommunity();
        this.props.initSearchTextForMemberShip();
        this.props.initSearchTextEventForNotice();
        this.props.initSearchTextEventForMemberShip();
        this.props.initFilterByTalkTalk();
        this.props.initFilterByToDaniel();
        this.props.initFilterByTalk();
        this.props.initFilterEventForNotice();
        this.props.initFilterEventForMemberShip();
        this.props.initTargetLanguage();
        this.props.initTranslateCount();
        this.props.initDownloadOption();
        // Logo
        this.playLogo();
    }

    initAfterLogin = info => {
        Info.setUserInfo(info)
        this.props.changeProfile();
        this.props.getReportReasonList();
        this.props.getTagListEventForNotice();
        this.props.getTagListEventForMemberShip();
    }

    // Logo
    getOpacity = (value, start, end) => {
        return value.interpolate({
            inputRange: [0, 1],
            outputRange: [start, end],
            extrapolate: 'clamp',
            useNativeDriver: false
        })
    }

    playLogo = _ => {
        Animated.timing(this.state.logoAnimateValue, {
            toValue: 1,
            duration: LOGO_TIME,
            useNativeDriver: false
        }).start(({finished}) => {
            this.checkLogin();
        });
    }

    // Check
    checkLanguage = _ => {
        Storage.getLanguage().then(lang => {
            if (Common.isEmpty(lang)) {
                this.props.changeLanguage(Common.getLocaleLanguage());
            } else {
                localize.setLanguage(lang);
                Info.setLanguage(lang);
                this.props.changeLanguage(lang);
            }
        })
    }

    checkLogin = _ => {
        Storage.getUserInfo().then(info => {
            if (Common.isEmpty(info.token)) {
                this.setShowStartedButton(true)
            } else {
                this.initAfterLogin(info);
                this.setShowLogin(false);
            }
        });
    }

    // Push
    getPushToken = _ => {
        Storage.getPushToken().then(r => {
            if (r) Info.setPushToken(r);
        });
    }

    ////////////////////
    // RENDER
    renderSplash = _ => {
        const {logoAnimateValue, isShowStartedButton} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Logo */}
                <Animated.View style={[s.layout_logo, {opacity: this.getOpacity(logoAnimateValue, 0, 1)}]}>
                    <BaseImage style={s.image_logo}
                               source={IMAGE_LOGO}/>
                </Animated.View>
                {/* Button */}
                {isShowStartedButton &&
                <View style={s.layout_button}>
                    <BaseButton title={localize.common.started}
                                onPress={_ => this.setShowLogin(true)}
                                buttonStyle={s.button_start}
                                titleStyle={[FontStyle.BtnGrayDkCH, {color: colors.white}]}/>
                </View>}
            </View>);
    }

    render() {
        const {isShowSplash, isShowLogin} = this.state;
        // const {isShowLogin} = this.props;
        return isShowSplash ? this.renderSplash() : <Navigator isLogin={isShowLogin}/>;
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        isShowLogin: state.common.get('isShowLogin'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: lang => {
            return dispatch(changeLanguage(lang));
        },
        changeLogin: isShow => {
            return dispatch(isShowLogin(isShow));
        },
        changeProfile: _ => {
            return dispatch(getProfile());
        },
        getReportReasonList: _ => {
            return dispatch(getReportReasonList());
        },
        getTagListEventForNotice: _ => {
            return dispatch(getTagListEventForNotice());
        },
        getTagListEventForMemberShip: _ => {
            return dispatch(getTagListEventForMemberShip());
        },
        // Init
        initSearchTextForCommunity: _ => {
            return dispatch(setSearchTextForCommunity());
        },
        initSearchTextForMemberShip: _ => {
            return dispatch(setSearchTextForMemberShip());
        },
        initSearchTextEventForNotice: _ => {
            return dispatch(setSearchTextEventForNotice());
        },
        initSearchTextEventForMemberShip: _ => {
            return dispatch(setSearchTextEventForMemberShip());
        },
        initFilterByTalkTalk: _ => {
            return dispatch(setFilterForTalkTalk());
        },
        initFilterByToDaniel: _ => {
            return dispatch(setFilterForToDaniel());
        },
        initFilterByTalk: _ => {
            return dispatch(setFilterForTalk());
        },
        initFilterEventForNotice: _ => {
            return dispatch(setFilterEventForNotice());
        },
        initFilterEventForMemberShip: _ => {
            return dispatch(setFilterEventForMemberShip());
        },
        initTargetLanguage: _ => {
            return dispatch(initTargetLanguage());
        },
        initTranslateCount: _ => {
            return dispatch(initTranslateCount());
        },
        initDownloadOption: _ => {
            return dispatch(initDownloadOption());
        }
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
