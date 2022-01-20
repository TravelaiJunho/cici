////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Keyboard, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
////////////////////
// Local
import BaseScreen from "../_base/BaseScreen";
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from '../_style/Authentication.style';
import Common from '@util/Common';
import localize from "../../util/Localize";
import Layout from "../../util/Layout";
import Screen from "../../util/type/Screen";
// Component
import BaseText from "../../component/_base/BaseText";
import BaseButton from "../../component/_base/BaseButton";
import BackHeader from "../../component/header/BackHeader";
import FlatInput from "../../component/text/FlatInput";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import ConfirmCancelAlert from "../../component/alert/_base/ConfirmCancelAlert";
import Loader from "../../component/loader/Loader";
// API
import {sendEmail, verifyEmail} from "../../data/http/Authentication";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Authentication extends BaseScreen {

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
            confirmCallback: null,
            isShowConfirmCancel: false,
            cancelCallback: null,
            errorMessage: '',
        }
    }

    ////////////////////
    // FUNCTION
    setExpireTime = time => this.setState({expireTime: time});

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                confirmCallback: callback,
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

    createDateTimeFormat = date => {
        return Common.isEmpty(date) ? '' : moment(date).format(localize.format.date_time);
    }

    getSuccessMessage = code => {
        switch (code) {
            case 1:
                return localize.success.auth.email.auth_complete;
            case 2:
                return localize.success.auth.email.send_complete;
        }
    }

    getErrorMessage = code => {
        switch (code) {
            case 10:
                return localize.error.auth.email.time_over;
            case 11:
                return localize.error.auth.email.not_match_code;
            case 12:
                return localize.error.auth.email.empty_code;
            case 13:
                return localize.error.auth.email.send_fail;
        }
    }

    ////////////////////
    // Validation
    ////////////////////

    // Code
    checkCode = code => {
        if (Common.isEmpty(code)) {
            this.setShowConfirm(true, this.getErrorMessage(12));
            return false;
        }
        return true;
    }

    ////////////////////
    goToLogin = _ => {
        this.props.navigation.pop();
        // this.props.navigation.navigate(Screen.STACK_LOGIN.LOGIN);
    }

    goToJoin = _ => {
        this.props.navigation.pop();
        this.props.navigation.navigate(Screen.STACK_LOGIN.JOIN);
    }

    // Event
    onReSend = _ => {
        Keyboard.dismiss();
        this.resendEmail();
    }

    onEmailAuthentication = _ => {
        Keyboard.dismiss();
        if (this.checkCode(this.code.getText())) {
            this.verifyEmail();
        }
    };

    ////////////////////
    // API
    resendEmail = _ => {
        const {email} = this.props.route.params;
        sendEmail(email, (success, code, message, data) => {
            if (success) {
                this.setExpireTime(data.expiration_time)
                this.setShowConfirm(true, this.getSuccessMessage(2));
            } else {
                this.setShowConfirmCancel(true, message, _ => this.resendEmail());
            }
        });
    }

    verifyEmail = _ => {
        const {email} = this.props.route.params;
        verifyEmail(email, this.code.getText(), (success, code, message, data) => {
            if (success) {
                this.setShowConfirm(true, this.getSuccessMessage(1), _ => this.goToLogin());
            } else {
                if (code === '245') {
                    this.setShowConfirm(true, message, _ => this.goToJoin());
                } else {
                    this.setShowConfirm(true, message);
                }
            }
        });
    }

    ////////////////////
    // RENDER
    render() {
        const {name} = this.props.route.params;
        const {
            isLoading, expireTime,
            isShowConfirm, errorMessage, isShowConfirmCancel,
            confirmCallback, cancelCallback
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.auth.auth_email}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <KeyboardAwareScrollView style={s.layout_contents}>
                    {/* //////////////////// */}
                    <BaseText style={[FontStyle.CntWhiteLN, {marginTop: Layout.UISize(20)}]}>
                        {localize.formatString(localize.auth.text.welcome, name)}
                    </BaseText>
                    <BaseText style={[FontStyle.Cnt13WhiteLT, {marginTop: Layout.UISize(5)}]}>
                        {localize.auth.text.auth_email}
                    </BaseText>
                    <BaseText style={{marginTop: Layout.UISize(20)}}>
                        <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.auth.text.valid_time}</BaseText>
                        <BaseText style={FontStyle.Cnt13OrangeCB}>{this.createDateTimeFormat(expireTime)}</BaseText>
                    </BaseText>
                    {/* Code */}
                    <FlatInput ref={ref => this.code = ref}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(28)}}
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
                </KeyboardAwareScrollView>

                {/* Bottom */}
                <View style={s.layout_bottom}>
                    {/* Button */}
                    <BaseButton title={localize.auth.auth_email}
                                onPress={this.onEmailAuthentication}
                                buttonStyle={s.layout_button}
                                titleStyle={FontStyle.BtnWhiteCH}/>
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  confirmCallback && confirmCallback();
                                  this.setShowConfirm(false);
                              }}>
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
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Authentication;
