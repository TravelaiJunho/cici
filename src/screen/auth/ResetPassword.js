////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Keyboard, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
////////////////////
// Local
import BaseScreen from "@screen/_base/BaseScreen";
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from '../_style/ResetPassword.style';
import Common from '@util/Common';
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import Screen from "../../util/type/Screen";
import Input from "../../util/type/Input";
// Component
import BaseText from "../../component/_base/BaseText";
import BaseTouchableButton from "../../component/button/_base/BaseTouchableButton";
import BackHeader from "../../component/header/BackHeader";
import FlatInput from "../../component/text/FlatInput";
import Loader from "../../component/loader/Loader";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {resetPasswordAuthMail} from "../../data/http/User";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class ResetPassword extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        // let fromMore = true;
        // fromMore = this.props.route.params.fromMore;
        // if (Common.isEmpty(fromMore)) {
        //     fromMore = true;
        // }
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            ////////////
            isErrorId: false,
            errorIdMessage: '',
            // fromMore: fromMore,
            fromMore: this.getParamFromMore(),
            editable: Common.isEmpty(this.getParamEmail()),
        }
    }

    componentDidMount() {
        super.componentDidMount();
        // this.id && this.id.setText(this.props.route.params.email);
        this.id && this.id.setText(this.getParamEmail());
        // this.props.navigation.dangerouslyGetParent().setOptions({
        //     tabBarVisible: false
        // });
    }

    ////////////////////
    // FUNCTION
    getParamEmail = _ => {
        if (Common.isEmpty(this.props.route.params)) return '';
        const {email} = this.props.route.params;
        if (Common.isEmpty(email)) return '';
        return email;
    }

    getParamFromMore = _ => {
        if (Common.isEmpty(this.props.route.params)) return false;
        const {fromMore} = this.props.route.params;
        if (Common.isEmpty(fromMore)) return false;
        return fromMore;
    }

    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message
            });
        }
    }

    getErrorMessage = code => {
        switch (code) {
            case 10:
                return localize.error.auth.email.empty;
            case 11:
                return localize.error.auth.email.not_match;
            case 12:
                return localize.error.auth.email.not_sign;
        }
    }

    ////////////////////
    // Validation
    ////////////////////

    // Email
    setErrorId = (isError, message = '') => {
        this.setState({
            isErrorId: isError,
            errorIdMessage: message
        })
    }

    checkLocal = id => {
        if (Common.isEmpty(id)) {
            this.setErrorId(true, this.getErrorMessage(10))
            return false;
        }
        if (!Common.isEmail(id)) {
            this.setErrorId(true, this.getErrorMessage(11))
            return false;
        }
        ////
        this.setErrorId(false)
        return true;
    }

    ////////////////////
    goToChangePassword = (email, expireTime) => {
        this.props.navigation.pop()
        if (this.state.fromMore) {
            this.props.navigation.navigate(Screen.STACK_MORE.CHANGE_PASSWORD, {
                email: email,
                expireTime: expireTime,
                isBack: true,
            });
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
        } else {
            this.props.navigation.navigate(Screen.STACK_LOGIN.CHANGE_PASSWORD, {
                email: email,
                expireTime: expireTime,
                isBack: false,
            });
        }
    }

    // Event
    onSend = _ => {
        Keyboard.dismiss();
        if (this.checkLocal(this.id.getText())) {
            this.sendEmail();
        }
    };

    onCancel = _ => {
        Keyboard.dismiss();
        this.props.navigation.pop();
    }

    ////////////////////
    // API
    sendEmail = _ => {
        resetPasswordAuthMail(this.id.getText(), (success, code, message, data) => {
            if (success) {
                this.goToChangePassword(this.id.getText(), data.expiration_time);
            } else {
                console.warn(success, code, message, data)
                if (Common.isEmpty(message)) {
                    message = localize.error.Failed
                }
                this.setShowConfirm(true, message);
            }
        })
    }

    ////////////////////
    // RENDER
    render() {
        const {
            isLoading, isShowConfirm, errorMessage,
            isErrorId, errorIdMessage, editable,
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.auth.reset_password}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <KeyboardAwareScrollView style={s.layout_contents}>
                    <BaseText style={[FontStyle.Cnt13WhiteLT, {marginTop: Layout.UISize(20)}]}>
                        {localize.auth.text.reset_password}
                    </BaseText>
                    {/* ID */}
                    <FlatInput ref={ref => this.id = ref}
                               keyboardType={Input.KEYBOARD_EMAIL_ADDRESS}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(48)}}
                               label={localize.join.id}
                               placeHolder={localize.join.hint.id}
                               showError={isErrorId}
                               errorMessage={errorIdMessage}
                               editable={editable}
                               useClear={editable}/>
                </KeyboardAwareScrollView>

                {/* Bottom */}
                <View style={s.layout_bottom}>
                    <View style={s.layout_border}/>
                    {/* Button */}
                    <View style={s.layout_two_button}>
                        <BaseTouchableButton title={localize.common.cancel}
                                             buttonStyle={{backgroundColor: colors.gray}}
                                             onPress={this.onCancel}/>
                        <BaseTouchableButton title={localize.common.send}
                                             buttonStyle={{marginLeft: Layout.UISize(10)}}
                                             onPress={this.onSend}/>
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
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default ResetPassword;
