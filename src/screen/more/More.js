////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import RNRestart from 'react-native-restart';
import {ListItem} from 'react-native-elements';
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from "../_style/More.style"
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import Screen from "../../util/type/Screen";
import Icon from "../../util/Icon";
import Storage from "../../util/Storage";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import CircleBorderImage from "../../component/image/CircleBorderImage";
import BaseText from "../../component/_base/BaseText";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import NotiHeader from "../../component/header/NotiHeader";
import ConfirmCancelAlert from "../../component/alert/_base/ConfirmCancelAlert";
// API
import {changeLanguage, isShowLogin} from "../../data/redux/action/Common";
import {getProfile} from "../../data/redux/action/User";
import {getNewConfirm} from "../../data/redux/action/New";
import {logout} from "../../data/http/Authentication";
import {changeAlarm} from "../../data/redux/action/Badge";
import {getGradeType, GRADE} from "../../util/type/User";
import DeviceInfo from "react-native-device-info";
import {navRef} from "../../navigation/RootNavigation";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class More extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            // Alert
            isShowConfirm: false,
            isShowConfirmCancel: false,
            errorMessage: '',
            callback: null,
            cancelCallback: null,
            //
            topHeight: 0,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.getInfo()
    }

    onFocus = _ => {
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: true});
        this.getInfo();
        this.props.updateAlarm();
    }

    ////////////////////
    // FUNCTION
    getInfo = () => {
        this.props.changeProfile();
        this.props.changeNew();
    }

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                callback: callback,
                errorMessage: message
            });
        }
    }

    setShowConfirmCancel = (isShow, message = '', callback = null, cancelCallback = null) => {
        if (this.state.isShowConfirmCancel !== isShow) {
            this.setState({
                isShowConfirm: false,
                isShowConfirmCancel: isShow,
                callback: callback,
                cancelCallback: cancelCallback,
                errorMessage: message
            });
        }
    }

    getMenuList = _ => {
        return [
            {
                id: 0,
                name: localize.more.edit_my_information,
                tagNew: false,
                leftIcon: true,
            },
            {
                id: 1,
                name: localize.more.rating_information,
                tagNew: this.props.newConfirm ? this.props.newConfirm.membership : false,
                leftIcon: true,
            },
            {
                id: 2,
                name: localize.more.product_certification_detail.title,
                tagNew: false,
                leftIcon: true,
            },
            {
                id: 3,
                name: localize.more.downloadFile_management,
                tagNew: false,
                leftIcon: true,
            },
            {
                id: 4,
                name: localize.more.change_password,
                tagNew: false,
                leftIcon: true,
            },
            {
                id: 5,
                name: localize.more.service_center.title,
                tagNew: false,
                leftIcon: true,
            },
            {
                id: 6,
                name: localize.more.preferences.title,
                tagNew: false,
                leftIcon: true,
            },
            {
                id: 7,
                name: localize.more.logout,
                tagNew: false,
                leftIcon: false,
            },
            __DEV__ &&
            {
                id: 8,
                name: "Download Test",
                tagNew: false,
                leftIcon: false,
            }
        ]
    }

    // Event
    onNotification = _ => {
        console.warn("onNotification")
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.ALARM_LIST);
    }

    onMenu = selectMenu => {
        switch (selectMenu.id) {
            case 0: {
                this.props.navigation.navigate(Screen.STACK_MORE.PROFILE, {
                    myProfile: this.props.profile,
                });
                break;
            }
            case 1: {
                this.props.navigation.navigate(Screen.STACK_MORE.MEMBERSHIP_INFO, {
                    myProfile: this.props.profile,
                });
                break;
            }
            case 2: {
                this.props.navigation.navigate(Screen.STACK_MORE.PRODUCT_CERTIFICATION_LIST);
                break;
            }
            case 3: {
                this.props.navigation.navigate(Screen.STACK_MORE.DOWNLOAD_FILE_MNG);
                break;
            }
            case 4: {
                this.props.navigation.navigate(Screen.STACK_MORE.RESET_PASSWORD, {
                    email: this.props.profile ? this.props.profile.email : null,
                    fromMore: true,
                });
                this.props.navigation.dangerouslyGetParent().setOptions({
                    tabBarVisible: false
                });
                break;
            }
            case 5: {
                this.props.navigation.navigate(Screen.STACK_MORE.SERVICE_CENTER);
                break;
            }
            case 6: {
                this.props.navigation.navigate(Screen.STACK_MORE.SETTING);
                break;
            }
            case 7: {
                this.sendLogout();
                break;
            }
            case 8: {
                navRef.current.navigate(Screen.SCREEN_ACTIVITY.TEST_PAGE);
                break;
            }
        }
    }

    onMyPost = _ => {
        const {group} = this.props.profile;
        if (Common.isEmpty(group)) return;
        // Check
        switch (getGradeType(group.id)) {
            case GRADE.NORMAL:
            case GRADE.ASSOCIATE:
                this.setShowConfirm(true, localize.grade.text_access)
                return;
        }
        // My Post
        this.props.navigation.navigate(Screen.STACK_MORE.MY_POST);
    }

    // API
    sendLogout = _ => {
        // 로그아웃 하시겠어요? message box
        this.setShowConfirmCancel(true, localize.more.logout_question, this.onLogout)
    }

    onLogout = _ => {
        logout((success, code, message, data) => {
            if (success) {
                this.setState({
                    isLoading: true,
                })
                this.logoutAsync();
            } else {
                this.setShowConfirm(true, localize.error.Failed)
            }
        });
    }

    logoutAsync = async () => {
        await Storage.resetUserInfo();
        // 번역 초기화
        await Storage.resetTranslateCount();
        //RNRestart.Restart();
        this.props.changeLogin(true)
        this.props.navigation.navigate(Screen.TAB_BOTTOM.HOME);
        this.props.navigation.navigate(Screen.SCREEN.LOGIN_RE, {restore:true})
        // await removeContent(() => {
        //     RNRestart.Restart();
        // });
    }

    ////////////////////
    // RENDER
    renderTop = _ => {
        const {profile} = this.props;
        let grade = localize.common.member_associate;
        let gradeColor = colors.grayLight;
        if (profile && profile.group) {
            switch (getGradeType(profile.group.id)) {
                case GRADE.REGULAR:
                    grade = localize.common.member_regular;
                    gradeColor = colors.yellow;
                    break;

                case GRADE.HONORS:
                    grade = localize.common.member_honors;
                    gradeColor = colors.orange;
                    break;

                case GRADE.ARTIST:
                    grade = localize.common.member_artist;
                    gradeColor = colors.purple;
                    break;

                case GRADE.OPERATOR:
                    grade = localize.common.member_operator;
                    gradeColor = colors.mint;
                    break;

                case GRADE.SUPPORTERS:
                    grade = localize.common.member_supporters;
                    gradeColor = colors.skyblue;
                    break;
            }
        }
        return (
            <View style={{width: "100%"}}>
                <View style={s.topContainer}>
                    <CircleBorderImage size={126}
                                       gradeRight={30}
                                       borderWidth={4}
                                       source={profile ? profile.image_url : null}
                                       userGrade={profile ? profile.group.id : 0}/>
                </View>
                <BaseText style={FontStyle.HeadlineCntWhiteCH}>{profile ? profile.nickname : ''}</BaseText>
                <View style={s.topMenuContainer}>
                    <TouchableOpacity activeOpacity={1} style={s.rectangle}>
                        <BaseText
                            style={[FontStyle.SubCntGrayCB, {marginBottom: Layout.UISize(5)}]}>{localize.more.membership_level}</BaseText>
                        <BaseText
                            style={[FontStyle.MemberHeadlineAdministratorCH, {color: gradeColor}]}>{grade}</BaseText>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.rectangle}
                                      onPress={this.onMyPost}>
                        <BaseText
                            style={[FontStyle.SubCntGrayCB, {marginBottom: Layout.UISize(5)}]}>{localize.more.my_writing}</BaseText>
                        <BaseText
                            style={FontStyle.HeadlineCntWhiteCH}>{Common.toNumberFormat(profile ? profile.count_content : 0, 0)}</BaseText>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={s.rectangle}>
                        <BaseText
                            style={[FontStyle.SubCntGrayCB, {marginBottom: Layout.UISize(5)}]}>{localize.more.my_comments}</BaseText>
                        <BaseText
                            style={FontStyle.HeadlineCntWhiteCH}>{Common.toNumberFormat(profile ? profile.count_comment : 0, 0)}</BaseText>
                    </TouchableOpacity>
                </View>
            </View>);
    }

    renderItem = ({item, index}) =>
        <ListItem containerStyle={s.listItemContainer}
                  onPress={() => {
                      this.onMenu(item)
                  }}>
            <ListItem.Content>
                <ListItem.Title style={FontStyle.CntWhiteLN}>{item.name}</ListItem.Title>
            </ListItem.Content>
            {item.tagNew &&
            <View style={s.newTag}>
                <BaseText style={FontStyle.CaptionWhiteCH}>NEW</BaseText>
            </View>}
            {item.leftIcon &&
            <Icon.SignRight size={Layout.UISize(14)} color={colors.white}/>}
        </ListItem>

    renderMenu = _ => <FlatList showsVerticalScrollIndicator={false}
                                contentContainerStyle={s.menuContainer}
                                keyExtractor={(item, index) => index.toString()}
                                data={this.getMenuList()}
                                renderItem={this.renderItem}/>

    render() {
        const {isShowConfirm, isShowConfirmCancel, errorMessage, callback, cancelCallback} = this.state;
        return (
            <View style={BaseStyle.container}>

                {/* Top */}
                <View
                    style={{
                        zIndex: 10000,
                        position: 'absolute',
                        top: 0,
                        width: "100%",
                        backgroundColor:  colors.background
                    }}
                    onLayout={(event) => {
                        let {x, y, width, height} = event.nativeEvent.layout;
                        this.setState({topHeight: height});
                    }}>
                    <NotiHeader skipAndroidStatusBar={false}
                                useBorder={false}
                                onNotiPress={this.onNotification}/>
                </View>

                {/* List */}
                <ScrollView>
                    <View style={{height: this.state.topHeight}}/>
                    {this.renderTop()}
                    {this.renderMenu()}
                </ScrollView>


                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
                <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                    buttonConfirm={localize.common.ok}
                                    onConfirm={_ => {
                                        callback && callback();
                                        this.setShowConfirmCancel(false)
                                    }}
                                    buttonCancel={localize.common.cancel}
                                    onCancel={_ => {
                                        cancelCallback && cancelCallback();
                                        this.setShowConfirmCancel(false)
                                    }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmCancelAlert>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        language: state.common.get('language'),
        profile: state.user.get('profile'),
        newConfirm: state.new.get('confirm'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: lang => {
            return dispatch(changeLanguage(lang));
        },
        changeProfile: _ => {
            return dispatch(getProfile());
        },
        changeNew: _ => {
            return dispatch(getNewConfirm());
        },
        updateAlarm: _ => {
            return dispatch(changeAlarm());
        },
        changeLogin: isShow => {
            return dispatch(isShowLogin(isShow));
        },

    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(More);
