////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View} from "react-native";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/Withdrawal.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Icon from "../../../util/Icon";
import Screen from "../../../util/type/Screen";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BackHeader from "../../../component/header/BackHeader";
import BaseText from "../../../component/_base/BaseText";
import Layout from "../../../util/Layout";
import DotText from "../../../component/text/DotText"
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import Common from "../../../util/Common";
import ConfirmCancelAlert from "../../../component/alert/_base/ConfirmCancelAlert";
import Loader from "../../../component/loader/Loader";
import {connect} from "react-redux";
import FlatInput from "../../../component/text/FlatInput";
import Input from "../../../util/type/Input";
import {userLeave} from "../../../data/http/User";
import {logout} from "../../../data/http/Authentication";
import Storage from "../../../util/Storage";
import RNRestart from "react-native-restart";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Withdrawal extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state={
            isLoading: false,
            // Password
            password: '',
            isErrorPassword: false,
            errorPasswordMessage: '',
            // alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,

            // alert confirm cancel
            isShowConfirmCancel: false,
            errorMessage_cancelAlert: '',
            callback_cancelAlert: null,
        }
        this.password = null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['isShowConfirm', 'isShowConfirmCancel'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['profile'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['isLoading', 'isLoading', 'password', 'isErrorPassword', 'errorPasswordMessage'])) return true;

        return false;
    }

    ////////////////////
    // FUNCTION
    setLoading = load => {
        this.setState({
            isLoading: load
        })
    }
    showAlert = (message, callback) => {
        this.setState({
            isShowConfirm: true,
            errorMessage: message,
            callback: callback
        })
    }

    showAlertCancel = (message, callback) => {
        this.setState({
            isShowConfirmCancel: true,
            callback_cancelAlert: callback,
            errorMessage_cancelAlert: message
        })
    }

    checkPassword = _ => {
        this.setState({
            password: this.password.getText()
        })
    }

    withDrawalAsync = async () => {
        try{
            await Storage.resetUserInfo();
            // 번역 초기화
            await Storage.resetTranslateCount();
            await Storage.resetDownloadOption();

            this.setState({
                isLoading:false
            }, ()=> {
                //RNRestart.Restart()
                this.props.navigation.navigate(Screen.STACK_MORE.MORE);
                this.props.navigation.navigate(Screen.TAB_BOTTOM.HOME);
                this.props.navigation.navigate(Screen.SCREEN.LOGIN_RE, {restore:true})
            })
            // await removeContent(() => {
            //     this.setState({
            //         isLoading:false
            //     }, ()=> {
            //         RNRestart.Restart();
            //     })
            // });
        }catch(e){
            console.log(e)
        }
    }

    onPressWithdrawal = () => {
        if(Common.isEmpty(this.state.password)) {
            console.warn("empty")
            this.setState({
                openCodeCheck: false,
                isLoading: false,
                isErrorPassword: false
            }, () => {
                this.showAlert(localize.error.auth.password.empty, null);
            })

            return;
        }
        this.showAlertCancel(localize.more.withdrawal.do_withdrawal, ()=>{
            this.setLoading(true);
            userLeave(this.state.password, (success, code, message, data)=>{
                if(success) {
                    this.setState({
                        isLoading:false,
                    }, ()=> {
                        this.showAlert(localize.more.withdrawal.done_withdrawal, ()=>{
                            this.withDrawalAsync()
                        })
                    })
                }else{
                    this.setState({
                        isLoading:false,
                    }, ()=> {
                        let errorMessage = localize.error.Failed;
                        switch(code){
                            case "236":{
                                errorMessage = localize.more.withdrawal.password_error;
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        this.showAlert(errorMessage);
                    })

                }
            })
        })
    }

    ////////////////////
    // RENDER
    renderDesc = () => {
        let title = localize.formatString( localize.more.withdrawal.title_1, this.props.profile.name)
        return(
            <View style={s.desc_layout}>
                <BaseText style={[FontStyle.CntWhiteLN, {marginBottom: Layout.UISize(5)}]}>{title}</BaseText>
                <BaseText style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_1_1}</BaseText>

                <BaseText style={[FontStyle.CntTitleOrangeLH, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_2}</BaseText>

                <DotText
                    dotContainerSize={Layout.UISize(14)}
                    dotSize={Layout.UISize(5)}
                    style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(5)}]}>{localize.more.withdrawal.title_2_1}</DotText>
                <DotText dotContainerSize={Layout.UISize(14)}
                         dotSize={Layout.UISize(5)}
                         style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(5)}]}>{localize.more.withdrawal.title_2_2}</DotText>
                <DotText dotContainerSize={Layout.UISize(14)}
                         dotSize={Layout.UISize(5)}
                         style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_2_3}</DotText>

                <BaseText style={[FontStyle.CntTitleOrangeLH, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_3}</BaseText>

                <DotText dotContainerSize={Layout.UISize(14)}
                         dotSize={Layout.UISize(5)}
                         style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(5)}]}>{localize.more.withdrawal.title_3_1}</DotText>
                <DotText dotContainerSize={Layout.UISize(14)}
                         dotSize={Layout.UISize(5)}
                         style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_3_2}</DotText>

                <BaseText style={[FontStyle.CntTitleOrangeLH, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_4}</BaseText>

                <DotText dotContainerSize={Layout.UISize(14)}
                         dotSize={Layout.UISize(5)}
                         style={[FontStyle.Cnt13WhiteLT, {marginBottom: Layout.UISize(20)}]}>{localize.more.withdrawal.title_4_1}</DotText>

                <View style={s.line}/>

                <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.more.withdrawal.final_text}</BaseText>
            </View>
        )
    }

    renderPassword = () => {
        const {isErrorPassword, errorPasswordMessage, openCodeCheck, password} = this.state;
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={s.menu_background}
            >
                <View style={s.id_area}>
                    <View style={{flexDirection: 'row'}}>
                        <BaseText style={FontStyle.BtnOnWhite14}>{localize.join.password}</BaseText>
                        <View style={s.dot}/>
                    </View>
                    <FlatInput ref={ref => this.password = ref}
                               type={Input.PASSWORD}
                               containerStyle={s.layout_password}
                               placeHolder={localize.join.hint.password}
                               placeholderColor={colors.grayLight}
                               showError={isErrorPassword}
                               onChangeText={this.checkPassword}
                    />
                </View>

            </KeyboardAvoidingView>
        )
    }

    renderButton = () => {
        return (
            <View style={s.menu_bottom}>
                <TouchableOpacity style={s.menu_btn_area}
                                  onPress={_=>{this.props.navigation.goBack()}}
                >
                    <BaseText style={FontStyle.BtnWhiteCH}>{localize.common.cancel}</BaseText>
                </TouchableOpacity>
                <TouchableOpacity style={[s.menu_btn_area, {backgroundColor:colors.orange}]}
                                  onPress={_=>{this.onPressWithdrawal()}}
                >
                    <BaseText style={FontStyle.BtnWhiteCH}>{localize.common.ok}</BaseText>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {
            isLoading, isShowConfirm, callback, errorMessage,
            isShowConfirmCancel, callback_cancelAlert, errorMessage_cancelAlert,
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.withdrawal.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Menu */}
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                    {this.renderDesc()}
                    {this.renderPassword()}
                    <View style={{height:Layout.UISize(100)}}/>
                </ScrollView>

                {this.renderButton()}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  if (!Common.CheckPressBlock()) return;
                                  callback && callback();
                                  this.setState({isShowConfirm: false})
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
                <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                    onConfirm={_ => {
                                        //
                                        if (!Common.CheckPressBlock()) return;
                                        callback_cancelAlert && callback_cancelAlert()
                                        this.setState({isShowConfirmCancel: false})
                                    }}
                                    onCancel={_ => {
                                        if (!Common.CheckPressBlock()) return;
                                        this.setState({isShowConfirmCancel: false})
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
        profile: state.user.get('profile'),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
