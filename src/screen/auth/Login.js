////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
////////////////////
// Local
import BaseScreen from "@screen/_base/BaseScreen";
import FontStyle from '../../util/style/Font.style';
import s from '../_style/Login.style';
import {IMAGE_LOGO} from "../../../assets";
import Storage from "../../util/Storage";
import Info from "../../util/Info";
import localize from '../../util/Localize';
import {colors} from "../../util/Color";
import Input from "../../util/type/Input";
import Screen from '../../util/type/Screen';
import {createTokenData} from "../../util/type/Token";
import Common from "../../util/Common";
// Component
import BaseButton from "../../component/_base/BaseButton";
import BaseImage from "../../component/_base/BaseImage";
import BaseText from "../../component/_base/BaseText";
import FlatInput from "../../component/text/FlatInput";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import ConfirmCancelAlert from "../../component/alert/_base/ConfirmCancelAlert";
// API
import {changeLanguage, getReportReasonList, isShowLogin} from '../../data/redux/action/Common';
import {login, sendEmail} from "../../data/http/Authentication";
import {getProfile} from "../../data/redux/action/User";
import {getTagListEventForNotice} from "../../data/redux/action/TabEventForNotice";
import {getTagListEventForMemberShip} from "../../data/redux/action/TabEventForMemberShip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Login extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            disableButton: true,
            //
            isShowConfirm: false,
            isShowConfirmCancel: false,
            cancelCallback: null,
            errorMessage: '',
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        this.addBackHandler();
    }
    componentWillUnmount() {
        this.removeBackHandler();
    }

    ////////////////////
    // FUNCTION
    initAfterLogin = info => {
        Info.setUserInfo(info)
        this.props.changeProfile();
        this.props.getReportReasonList();
        this.props.getTagListEventForNotice();
        this.props.getTagListEventForMemberShip();
    }

    setDisableButton = disable => {
        if (this.state.disableButton !== disable) {
            this.setState({disableButton: disable});
        }
    }

    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                errorMessage: message
            });
        }
    }

    setShowConfirmCancel = (isShow, message = '', cancelCallback = null) => {
        if (this.state.isShowConfirmCancel !== isShow) {
            this.setState({
                isShowConfirm: false,
                isShowConfirmCancel: isShow,
                cancelCallback: cancelCallback,
                errorMessage: message
            });
        }
    }

    checkEnableButton = _ => {
        this.setDisableButton(Common.isEmpty(this.email.getText()) || Common.isEmpty(this.password.getText()))
    }

    getSuccessMessage = code => {
        switch (code) {
            // Auth
            case 1:
                return localize.success.auth.email.send_complete;
        }
    }

    getErrorMessage = (code = 0) => {
        switch (code) {
            // Email
            case 10:
                return localize.error.auth.email.empty;
            case 11:
                return localize.error.auth.email.not_match;
            case 12:
                return localize.error.auth.email.not_sign;
            case 13:
                return localize.error.auth.email.not_complete;
            case 14:
                return localize.error.auth.email.send_fail;
            // Password
            case 20:
                return localize.error.auth.password.empty;
            case 21:
                return localize.error.auth.password.not_match;
            // Default (Unknown)
            default:
                return localize.error.auth.login.fail;
        }
    }

    ////////////////////
    // Validation
    ////////////////////

    checkLocal = (email, password) => {
        // Email
        if (Common.isEmpty(email)) {
            this.setShowConfirm(true, this.getErrorMessage(10));
            return false;
        }
        if (!Common.isEmail(email)) {
            this.setShowConfirm(true, this.getErrorMessage(11));
            return false;
        }
        // Password
        if (Common.isEmpty(password)) {
            this.setShowConfirm(true, this.getErrorMessage(20));
            return false;
        }
        return true;
    }

    ////////////////////
    goToAuthentication = (email, name, expireTime) => {
        this.props.navigation.navigate(Screen.STACK_LOGIN.AUTHENTICATION, {
            email: email,
            name: name,
            expireTime: expireTime,
        });
    }

    // Event
    onRePassword = _ => {
        this.props.navigation.navigate(Screen.STACK_LOGIN.RESET_PASSWORD);
    }

    onJoin = _ => {
        this.props.navigation.navigate(Screen.STACK_LOGIN.JOIN);
    }

    onLogin = _ => {
        if (this.checkLocal(this.email.getText(), this.password.getText())) {
            this.login();
        }
    }

    ////////////////////
    // API
    login = _ => {
        login(this.email.getText(), this.password.getText(),
            (success, code, message, data) => {
                if (success) {
                    // Save Local
                    const info = createTokenData(data.refresh, data.access);
                    Storage.setUserInfo(info).then(r => {
                        this.initAfterLogin(info);
                        // Show Home
                        this.props.changeLogin(false);
                        console.warn(this.props.route.params)
                        //let param = this.props.route.params.restore;
                        //if(!Common.isEmpty(param)) {
                            this.props.navigation.navigate(Screen.SCREEN.HOME)
                        //}
                    });
                } else {
                    if (code === '205') {
                        this.setShowConfirmCancel(true, message, _ => this.resendEmail());
                    } else {
                        this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage() : message);
                    }
                }
            });
    }

    resendEmail = _ => {
        this.setShowConfirmCancel(false);
        sendEmail(this.email.getText(), (success, code, message, data) => {
            if (success) {
                this.goToAuthentication(this.email.getText(), data.name, data.expiration_time);
            } else {
                this.setShowConfirmCancel(true, message, _ => this.resendEmail());
            }
        });
    }

    ////////////////////
    // RENDER
    render() {
        const {
            disableButton,
            isShowConfirm, isShowConfirmCancel, cancelCallback, errorMessage
        } = this.state;
        return (
            <KeyboardAwareScrollView bounces={false}>
                <View style={s.container}>
                    {/* Logo */}
                    <View style={s.layout_logo}>
                        <BaseImage style={s.image_logo}
                                   source={IMAGE_LOGO}/>
                    </View>
                    {/* Bottom Layout */}
                    <View style={{flex: 1}}>
                        <View style={s.layout_bottom}>
                            <View style={s.layout_bottom_width}>
                                {/* Input */}
                                <FlatInput ref={ref => this.email = ref}
                                           keyboardType={Input.KEYBOARD_EMAIL_ADDRESS}
                                           placeHolder={localize.login.hint.email_address}
                                           placeholderColor={colors.white}
                                           onChangeText={this.checkEnableButton}/>
                                <FlatInput ref={ref => this.password = ref}
                                           type={Input.PASSWORD}
                                           containerStyle={s.layout_password}
                                           placeHolder={localize.login.hint.password}
                                           placeholderColor={colors.white}
                                           onChangeText={this.checkEnableButton}/>
                                {/* RE Password*/}
                                <View style={s.layout_re_password}>
                                    <TouchableOpacity onPress={this.onRePassword}>
                                        <BaseText style={[FontStyle.Btn13MintRN, s.text_re_password]}>{localize.login.text.password_forgot}</BaseText>
                                    </TouchableOpacity>
                                </View>
                                {/* Button */}
                                <BaseButton disabled={disableButton}
                                            title={localize.login.title}
                                            onPress={this.onLogin}
                                            buttonStyle={s.button_enable}
                                            titleStyle={FontStyle.BtnWhiteCH}
                                            disabledStyle={s.button_disable}
                                            disabledTitleStyle={FontStyle.BtnWhiteCH}/>
                                {/* Join */}
                                <View style={s.layout_join}>
                                    <BaseText style={FontStyle.Cnt13GrayCB}>{localize.login.text.account_not_have}</BaseText>
                                    <TouchableOpacity onPress={this.onJoin}>
                                        <BaseText style={[FontStyle.Btn13MintRN, s.text_button_join]}>{localize.join.title}</BaseText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* //////////////////// */}
                    {/* Modal */}
                    {/* //////////////////// */}

                    {/* Alert */}
                    <ConfirmAlert isVisible={isShowConfirm}
                                  onConfirm={_ => this.setShowConfirm(false)}>
                        <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                    </ConfirmAlert>
                    <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                        onConfirm={_ => this.setShowConfirmCancel(false)}
                                        buttonCancel={localize.common.resend}
                                        onCancel={_ => {
                                            cancelCallback && cancelCallback();
                                            this.setShowConfirmCancel(false)
                                        }}>
                        <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                    </ConfirmCancelAlert>
                </View>
            </KeyboardAwareScrollView>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        language: state.common.get('language'),
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
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Login);
