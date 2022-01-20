////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from '../../screen/_style/Home.style'
import Screen from "../../util/type/Screen";
import localize from "../../util/Localize";
import {getGradeType, GRADE} from "../../util/type/User";
import Notification, {callScreenByData, createDefaultChannels, initNotification, sendNotification, setBadgeCount} from "../../util/Notification";
import Storage from "../../util/Storage";
import Info from "../../util/Info";
import {BOARD} from "../../util/type/Board";
import {showDetail} from "../../util/Detail";
import Common from "../../util/Common";
// Asset
import {IMAGE_LOGO_FONT} from "../../../assets";
// Component
import BaseScreen from "../../screen/_base/BaseScreen";
import Loader from "../../component/loader/Loader";
import NotiHeader from "../../component/header/NotiHeader";
import BaseImage from "../../component/_base/BaseImage";
import BaseText from "../../component/_base/BaseText";
import HomeList from "../../component/list/home/HomeList";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import EmptyView from "../../component/list/EmptyView";
// API
import {changeAlarm} from "../../data/redux/action/Badge";
import {getNewConfirm} from "../../data/redux/action/New";
import {getList} from "../../data/redux/action/Home";
import {setRead} from "../../data/http/Alarm";
import {convertApnsToFcm, resendPushToken} from "../../data/http/Util";
import {refreshToken2} from "../../data/http/Authentication";
import NetInfo, {NetInfoStateType} from "@react-native-community/netinfo";

import ConfirmCancelAlert from "../../component/alert/_base/ConfirmCancelAlert";
import RefManager from "../../util/RefManager";
////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Home extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowLoader: false,
            // Language
            language: props.language,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            buttonConfirm: localize.common.ok,
            // alert c
            isShowConfirmCancel: false,
            callback_cancelAlert: null,
            callback_okAlert:null,
            errorMessage_cancelAlert: '',
        }

        this.loadMoreCnt = 0;
        this.unsubscribeNetInfo = null;

        //
        this.firstRun = true;
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['status'])) this.setStatusRefresh(nextProps.status);
        if (Common.shouldUpdate(this.props, nextProps, ['page', 'isRefresh', 'list'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['profile', 'newConfirm', 'downloadOption'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['isLoading', 'isShowLoader', 'isShowConfirm', 'isShowConfirmCancel', 'callback_cancelAlert', 'errorMessage_cancelAlert', 'callback_okAlert'])) return true;
        return false;
    }

    async componentDidMount() {
        super.componentDidMount();
        this.initPush();
        this.init();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if(this.unsubscribeNetInfo) {
            this.unsubscribeNetInfo();
        }
    }

    onFocus = _ => {
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: true});
        this.props.changeNew();
        this.props.updateAlarm();
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        this.setShowLoader(true);
        this.loadRefreshList();
        //this.initWifiState2();
    }


    initPush = _ => {
        initNotification();
        createDefaultChannels();
        Notification.attachRegister(this.onRegister)
        Notification.attachNotification(this.onNotification)
    }

    setLoading = isLoad => {
        if (this.state.isLoading !== isLoad) {
            this.setState({isLoading: isLoad});
        }
    }

    setShowLoader = isShow => {
        if (this.state.isShowLoader !== isShow) {
            this.setState({isShowLoader: isShow});
        }
    }

    setLanguage = lang => this.setState({language: lang}, this.init);

    setShowConfirm = (isShow, title = null, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                callback: callback,
                errorMessage: message,
                buttonConfirm: title ? title : localize.common.ok
            });
        }
    }

    showAlertCancel = (message, callback, cancelCallback=null) => {
        this.setState({
            isShowConfirmCancel:true,
            callback_cancelAlert: cancelCallback,
            errorMessage_cancelAlert: message,
            callback_okAlert: callback,
        })
    }

    showScreen = (screen, item = null) => {
        if (Common.isEmpty(screen)) return;
        if (Common.isEmpty(item)) {
            this.props.navigation.navigate(screen);
        } else {
            this.props.navigation.navigate(screen, item);
        }
    }

    checkMemberShip = type => {
        switch (type) {
            case BOARD.MEMBERSHIP_NOTICE:
            case BOARD.MEMBERSHIP_TALK:
            case BOARD.MEMBERSHIP_MEDIA:
            case BOARD.MEMBERSHIP_EVENT_NOTICE:
            case BOARD.MEMBERSHIP_EVENT_PART:
                return true;
            default:
                return false;
        }
    }

    checkGrade = item => {
        try {
            const honors = this.checkMemberShip(item.board_type);
            const {group} = this.props.profile;
            switch (getGradeType(group.id)) {
                case GRADE.NORMAL:
                case GRADE.ASSOCIATE:
                    if (honors) {
                        this.setShowConfirm(true, null, localize.grade.text_honors_access);
                        return false;
                    } else {
                        switch (item.board_type) {
                            case BOARD.NOTICE_NOTICE:
                            case BOARD.NOTICE_MEDIA:
                                break;

                            default:
                                this.setShowConfirm(true, localize.grade.btn_gradeup, localize.grade.text_access, () => {
                                    this.showScreen(Screen.STACK_MORE.REQUEST_MEMBER);
                                });
                                return false;
                        }
                    }
                case GRADE.REGULAR:
                    if (honors) {
                        this.setShowConfirm(true, null, localize.grade.text_honors_access);
                        return false;
                    }
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    // Load Data
    loadRefreshList = _ => {
        this.setLoading(true);
        this.props.refreshList();
    }

    loadMoreList = _ => {
        this.setLoading(true);
        this.props.loadMoreList(this.props.page + 1)
    }

    setStatusRefresh = status => {
        this.setShowLoader(false);
        this.setLoading(false);
        if (!Common.isEmpty(this.list)) this.list.setStatusFooter(status);
    };

    // Event
    onSelectItem = item => {
        if (Common.isEmpty(item)) return;
        if (!this.checkGrade(item)) return;
        // Detail
        this.setShowLoader(true);
        showDetail(this.props.navigation, item.board_type, item.id, _ => {
            this.setShowLoader(false);
        });
    }

    ////////////
    // Push
    setPushToken = token => {
        Storage.setPushToken(token).then(r => {
            if (r) Info.setPushToken(token);
            this.sendPushToken();
        });
    }

    onRegister = token => {
        if (Common.checkIOS()) {
            this.sendConvertApnsToFcm(token.token);
        } else {
            this.setPushToken(token.token);
        }
    }

    onNotification = notification => {
        // Android/iOS 동작이 상이
        const {foreground, userInteraction} = notification;
        if (userInteraction) {
            // Call Screen
            this.sendReadAndCallScreen(notification.data);
            // Call Badge
            this.props.updateAlarm();
            setBadgeCount(); // iOS 리셋
            return;
        }
        if (foreground) {
            const {title, message, data} = notification;
            sendNotification(title, message, data);
        }
    }

    ////////////
    // API
    sendReadAndCallScreen = data => {
        if (Common.isEmpty(data)) return;
        const {id, type, board_type, data_id} = data;
        callScreenByData(type, board_type, data_id);
        setRead(id, (success, code, message, data) => {
            //
        });
    }

    sendPushToken = _ => {
        resendPushToken((success, code, message, data) => {
            //
        });
    }

    sendConvertApnsToFcm = token => {
        convertApnsToFcm(token, (success, code, message, data) => {
            if (success) this.setPushToken(data);
        });
    }

    ////////////////////
    // RENDER
    renderHeaderTitle = _ => {
        const {newConfirm} = this.props;
        return (
            <View style={s.layout_title}>
                <TouchableOpacity
                    onPress={_ => this.showScreen(Screen.STACK_HOME.KANGDANIEL)}
                >
                    <BaseImage style={s.image_title}
                               resizeMode={'contain'}
                               source={IMAGE_LOGO_FONT}/>
                    {newConfirm && newConfirm.daniel &&
                        <View style={s.layout_badge}>
                            <BaseText style={FontStyle.CaptionWhiteCH}>N</BaseText>
                        </View>}
                </TouchableOpacity>
            </View>);
    }

    render() {
        const {
            isLoading, isShowLoader,
            isShowConfirm, errorMessage, callback, buttonConfirm,
            isShowConfirmCancel, callback_cancelAlert, errorMessage_cancelAlert, callback_okAlert
        } = this.state;
        const {list} = this.props;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isShowLoader}/>
                {/* Header */}
                <NotiHeader skipAndroidStatusBar={false}
                            title={this.renderHeaderTitle}
                            onNotiPress={_ => this.showScreen(Screen.SCREEN_ACTIVITY.ALARM_LIST)}
                />
                {/* List */}
                <View style={{flex: 1}}>
                    {/* List */}
                    <HomeList ref={ref => this.list = ref}
                              list={list}
                              onLoadRefresh={this.loadRefreshList}
                              onLoadMore={this.loadMoreList}
                              onSelectItem={this.onSelectItem}/>
                    {/* Empty */}
                    {!isLoading && !Common.checkListSize(list) && <EmptyView/>}
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              buttonConfirm={buttonConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
                <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                    onConfirm={_ => {
                                        //
                                        callback_okAlert && callback_okAlert()
                                        this.setState({isShowConfirmCancel:false})
                                    }}
                                    onCancel={_ => {
                                        callback_cancelAlert && callback_cancelAlert()
                                        this.setState({isShowConfirmCancel:false})
                                    }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage_cancelAlert}</BaseText>
                </ConfirmCancelAlert>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        // Common
        language: state.common.get('language'),
        profile: state.user.get('profile'),
        newConfirm: state.new.get('confirm'),
        // Home
        status: state.home.get('status'),
        list: state.home.get('list'),
        page: state.home.get('page'),
        isRefresh: state.home.get('isRefresh'),
        downloadOption: state.common.get('downloadOption'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeNew: _ => {
            return dispatch(getNewConfirm());
        },
        updateAlarm: _ => {
            return dispatch(changeAlarm());
        },
        refreshList: _ => {
            return dispatch(getList(1, true));
        },
        loadMoreList: page => {
            return dispatch(getList(page, false));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Home);
