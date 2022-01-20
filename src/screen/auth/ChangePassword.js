////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Keyboard, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
////////////////////
// Local
import BaseScreen from "@screen/_base/BaseScreen";
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from '../_style/ChangePassword.style';
import Common from '@util/Common';
import localize from "../../util/Localize";
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";
import Input from "../../util/type/Input";
// Component
import Loader from "../../component/loader/Loader";
import BaseText from "../../component/_base/BaseText";
import BaseTouchableButton from "../../component/button/_base/BaseTouchableButton";
import BackHeader from "../../component/header/BackHeader";
import FlatInput from "../../component/text/FlatInput";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {resetPassword, resetPasswordAuthMail} from "../../data/http/User";
import Storage from "../../util/Storage";
import RNRestart from "react-native-restart";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class ChangePassword extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            expireTime: this.props.route.params.expireTime,
            ////////////
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            ////////////
            // Code
            isErrorCode: false,
            errorCodeMessage: '',
            // Password
            isErrorPassword: false,
            errorPasswordMessage: '',
            isErrorPasswordConfirm: false,
            errorPasswordConfirmMessage: '',
        }
    }

    ////////////////////
    // FUNCTION
    setExpireTime = time => this.setState({expireTime: time});

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message,
                callback: callback
            });
        }
    }

    createDateTimeFormat = date => {
        return Common.isEmpty(date) ? '' : moment(date).format(localize.format.date_time);
    }

    getSuccessMessage = code => {
        switch (code) {
            case 1:
                return localize.success.auth.email.send_complete;
            case 2:
                return localize.success.auth.password.change_login;
            case 3:
                return localize.success.auth.password.change;
        }
    }

    getErrorMessage = code => {
        switch (code) {
            // Auth
            case 10:
                return localize.error.auth.email.send_fail;
            case 11:
                return localize.error.auth.email.time_over;
            case 12:
                return localize.error.auth.email.not_match_code;
            case 13:
                return localize.error.auth.email.empty_code;

            // Password
            case 20:
                return localize.error.auth.password.empty;
            case 21:
                return localize.error.auth.password.combi;

            // Password Confirm
            case 30:
                return localize.error.auth.password_confirm.not_match;
            case 31:
                return localize.error.auth.password_confirm.more;
        }
    }

    ////////////////////
    // Validation
    ////////////////////

    // Code
    checkCode = code => {
        if (Common.isEmpty(code)) {
            this.setShowConfirm(true, this.getErrorMessage(13));
            return false;
        }
        return true;
    }

    // Password
    setErrorPassword = (isError, message = '') => {
        this.setState({
            isErrorPassword: isError,
            errorPasswordMessage: message
        })
    }

    checkPassword = word => {
        if (Common.isEmpty(word)) {
            this.setErrorPassword(true, this.getErrorMessage(20));
            return false;
        }
        if (!Common.checkPassword(word)) {
            // Pattern
            this.setErrorPassword(true, this.getErrorMessage(21));
            return false;
        }
        if (word.length < 8 || word.length > 20) {
            // Length
            this.setErrorPassword(true, this.getErrorMessage(21));
            return false;
        }
        ////
        this.setErrorPassword(false);
        return true;
    }

    setErrorPasswordConfirm = (isError, message = '') => {
        this.setState({
            isErrorPasswordConfirm: isError,
            errorPasswordConfirmMessage: message
        })
    }

    checkPasswordConfirm = (origin, confirm) => {
        if (Common.isEmpty(confirm)) {
            this.setErrorPasswordConfirm(true, this.getErrorMessage(31));
            return false;
        }
        if (origin !== confirm) {
            // Match
            this.setErrorPasswordConfirm(true, this.getErrorMessage(30));
            return false;
        }
        this.setErrorPasswordConfirm(false);
        return true;
    }

    ////////////////////
    checkField = _ => {
        let result = true;
        if (!this.checkPasswordConfirm(this.password.getText(), this.passwordConfirm.getText())) result = false;
        if (!this.checkPassword(this.password.getText())) result = false;
        if (!this.checkCode(this.code.getText())) result = false;
        return result;
    }

    // Event
    onChange = _ => {
        Keyboard.dismiss();
        if (this.checkField()) {
            this.changePassword();
        }
    };

    onLogout = _ => {
        Keyboard.dismiss();
        Storage.resetUserInfo()
        RNRestart.Restart();
    }

    onCancel = _ => {
        Keyboard.dismiss();
        this.props.navigation.pop();
    }

    onReSend = _ => {
        Keyboard.dismiss();
        this.resendEmail();
    }

    ////////////////////
    // API
    resendEmail = _ => {
        resetPasswordAuthMail(this.props.route.params.email, (success, code, message, data) => {
            if (success) {
                this.setExpireTime(data.expiration_time)
                this.setShowConfirm(true, this.getSuccessMessage(1));
            } else {
                this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
            }
        });
    }

    changePassword = _ => {
        resetPassword(
            this.props.route.params.email,
            this.code.getText(),
            this.password.getText(),
            this.passwordConfirm.getText(),
            (success, code, message, data) => {
                if (success) {
                    if (this.props.route.params.isBack) {
                        this.setShowConfirm(true, this.getSuccessMessage(3), this.onCancel);
                    } else {
                        this.setShowConfirm(true, this.getSuccessMessage(2), this.onCancel);
                    }
                } else {
                    this.setShowConfirm(true, message);
                }
            });
    }

    ////////////////////
    // RENDER
    render() {
        const {email} = this.props.route.params;
        const {
            isLoading, expireTime, isShowConfirm, errorMessage, callback,
            isErrorPassword, errorPasswordMessage, isErrorPasswordConfirm, errorPasswordConfirmMessage
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.auth.change_password}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <KeyboardAwareScrollView style={s.layout_contents}>
                    {/* Title */}
                    <BaseText style={{marginTop: Layout.UISize(20)}}>
                        <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.auth.text.change_password.first}</BaseText>
                        <BaseText style={FontStyle.Cnt13OrangeCB}>{email}</BaseText>
                        <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.auth.text.change_password.second}</BaseText>
                    </BaseText>
                    <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.auth.text.change_password.third}</BaseText>
                    {/* Time */}
                    <BaseText style={{marginTop: Layout.UISize(20)}}>
                        <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.auth.text.valid_time}</BaseText>
                        <BaseText style={FontStyle.Cnt13OrangeCB}>{this.createDateTimeFormat(expireTime)}</BaseText>
                    </BaseText>
                    {/* Code */}
                    <FlatInput ref={ref => this.code = ref}
                               textContentType={"oneTimeCode"}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(48)}}
                               label={localize.auth.code}
                               placeHolder={localize.auth.hint.auth_code}/>
                    {/* RE Send*/}
                    <View style={s.layout_resend}>
                        <TouchableOpacity onPress={this.onReSend}>
                            <BaseText style={[FontStyle.Btn13MintRN, s.text_resend]}>
                                {localize.auth.code_resend}
                            </BaseText>
                        </TouchableOpacity>
                    </View>
                    {/* Password */}
                    <FlatInput ref={ref => this.password = ref}
                               textContentType={"oneTimeCode"}
                               type={Input.PASSWORD}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(28)}}
                               maxLength={20}
                               label={localize.auth.new_password}
                               placeHolder={localize.join.hint.password}
                               infoMessage={localize.join.text.info_password}
                               showError={isErrorPassword}
                               errorMessage={errorPasswordMessage}/>
                    <FlatInput ref={ref => this.passwordConfirm = ref}
                               textContentType={"oneTimeCode"}
                               type={Input.PASSWORD}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(28)}}
                               maxLength={20}
                               label={localize.join.password_confirm}
                               placeHolder={localize.join.hint.password_confirm}
                               showError={isErrorPasswordConfirm}
                               errorMessage={errorPasswordConfirmMessage}/>
                </KeyboardAwareScrollView>

                {/* Bottom */}
                <View style={s.layout_bottom}>
                    <View style={s.layout_border}/>
                    {/* Button */}
                    <View style={s.layout_two_button}>
                        <BaseTouchableButton title={localize.common.cancel}
                                             buttonStyle={{backgroundColor: colors.gray}}
                                             onPress={this.onCancel}/>
                        <BaseTouchableButton title={localize.common.change}
                                             buttonStyle={{marginLeft: Layout.UISize(10)}}
                                             onPress={this.onChange}/>
                    </View>
                </View>

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
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default ChangePassword;
