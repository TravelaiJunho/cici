////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
////////////////////
// Local
import BaseScreen from "../_base/BaseScreen";
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from '../_style/Join.style';
import Common from '../../util/Common';
import localize from "../../util/Localize";
import Layout from "../../util/Layout";
import Input from "../../util/type/Input";
import Icon from '../../util/Icon';
import {colors} from "../../util/Color";
import Screen from '../../util/type/Screen';
import BannedEquals from '../../util/banned/BannedEquals';
import BannedContains from '../../util/banned/BannedContains';
// Component
import Loader from "../../component/loader/Loader";
import BaseText from "../../component/_base/BaseText";
import BaseButton from "../../component/_base/BaseButton";
import BackHeader from "../../component/header/BackHeader";
import FlatInput from "../../component/text/FlatInput";
import PhoneInput from "../../component/text/PhoneInput";
import SelectInput from "../../component/text/SelectInput";
import GroupSingleButtonWithHelper from "../../component/button/GroupSingleButtonWithHelper";
import SquareCheckBox from "../../component/checkbox/SquareCheckBox";
import BottomDatePicker from "../../component/bottom_sheet/BottomDatePicker";
import CountryCodePopup from "../../component/popup/CountryCodePopup";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {join} from '../../data/http/Authentication';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Join extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ////////////
            // List
            isShowCountyCode: false,
            countryCallback: null,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            ////////////
            // Nick
            isErrorNick: false,
            errorNickMessage: '',
            // ID
            isErrorId: false,
            errorIdMessage: '',
            // Password
            isErrorPassword: false,
            errorPasswordMessage: '',
            isErrorPasswordConfirm: false,
            errorPasswordConfirmMessage: '',
            // Name
            isErrorName: false,
            errorNameMessage: '',
            // Gender
            isErrorGender: false,
            errorGenderMessage: '',
            // Birth
            birthDate: '',
            isErrorBirth: false,
            errorBirthMessage: '',
            // County
            countyItem: '',
            isErrorCountry: false,
            errorCountryMessage: '',
            // Phone
            codeItem: '',
            isErrorPhone: false,
            errorPhoneMessage: '',
            ////////////
            // Confirm
            isCheckTermsUnder14Age: false,
            isCheckTermsUse: false,
            isCheckTermsPrivacy: false,
        }
    }

    ////////////////////
    // FUNCTION
    setCheckTermsUnder14Age = (check = false) => {
        this.setState({isCheckTermsUnder14Age: check});
    }

    setCheckTermsUse = (check = false) => {
        this.setState({isCheckTermsUse: check});
    }

    setCheckTermsPrivacy = (check = false) => {
        this.setState({isCheckTermsPrivacy: check});
    }

    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message
            });
        }
    }

    setBirthDate = date => {
        this.setState({birthDate: date.toISOString()});
    }

    setShowCountryCode = (isShow, callback = null) => {
        if (this.state.isShowCountyCode !== isShow) {
            this.setState({
                isShowCountyCode: isShow,
                countryCallback: callback
            });
        }
    }

    setCountryItem = item => {
        if (!Common.isEmpty(item)) {
            this.setState({
                countyItem: item,
                codeItem: item,
            })
        }
    }

    setCodeItem = item => {
        if (!Common.isEmpty(item)) {
            this.setState({
                codeItem: item
            })
        }
    }

    createDateFormat = date => {
        return Common.isEmpty(date) ? '' : moment(date).format(localize.format.date);
    }

    createBeforeDate = (day) => {
        return moment(new Date()).subtract(day, 'd').toDate();
    }

    getErrorMessage = code => {
        switch (code) {
            // All
            case 1:
                return localize.error.auth.all_text;

            // ID
            case 10:
                return localize.error.auth.email.confirm;
            case 11:
                return localize.error.auth.email.empty;
            case 12:
                return localize.error.auth.email.not_match;
            case 13:
                return localize.error.auth.email.already;

            // Nick
            case 20:
                return localize.error.auth.nick_name.confirm;
            case 21:
                return localize.error.auth.nick_name.length;
            case 22:
                return localize.error.auth.nick_name.not_used;
            case 23:
                return localize.error.auth.nick_name.already;
            case 24:
                return localize.error.auth.nick_name.banned_word;

            // Password
            case 30:
                return localize.error.auth.password.confirm;
            case 31:
                return localize.error.auth.password.empty;
            case 32:
                return localize.error.auth.password.combi;

            // Password Confirm
            case 40:
                return localize.error.auth.password_confirm.confirm;
            case 41:
                return localize.error.auth.password_confirm.not_match;
            case 42:
                return localize.error.auth.password_confirm.more;

            // Name
            case 50:
                return localize.error.auth.name.confirm;
            case 51:
                return localize.error.auth.name.correct;

            // Gender
            case 60:
                return localize.error.auth.gender.confirm;
            case 61:
                return localize.error.auth.gender.select;

            // Birth
            case 70:
                return localize.error.auth.birth.confirm;
            case 71:
                return localize.error.auth.birth.correct;
            case 72:
                return localize.error.auth.birth.under_14_age;

            // Country
            case 80:
                return localize.error.auth.country.confirm;
            case 81:
                return localize.error.auth.country.select;

            // Phone
            case 90:
                return localize.error.auth.phone.confirm;
            case 91:
                return localize.error.auth.phone.correct;

            // Terms
            case 100:
                return localize.error.auth.terms.confirm;
        }
    }

    ////////////////////
    // Validation
    ////////////////////

    // All
    checkAll = _ => {
        // const {birthDate, countyItem, codeItem} = this.state;
        if (Common.isEmpty(this.nick.getText()) && Common.isEmpty(this.id.getText()) &&
            Common.isEmpty(this.password.getText()) && Common.isEmpty(this.passwordConfirm.getText()) &&
            Common.isEmpty(this.name.getText()) // && (this.gender.getSelectIndex() < 0) &&
            // Common.isEmpty(birthDate) && Common.isEmpty(countyItem) &&
            // Common.isEmpty(codeItem) && Common.isEmpty(this.phone.getPhone())
        ) {
            this.setShowConfirm(true, this.getErrorMessage(1));
            return false;
        }
        return true;
    }

    // ID
    setErrorId = (isError, message = '') => {
        this.setState({
            isErrorId: isError,
            errorIdMessage: message
        })
    }

    checkId = id => {
        let result = true;
        if (Common.isEmpty(id)) {
            this.setErrorId(true, this.getErrorMessage(11))
            result = false;
        } else if (!Common.isEmail(id)) {
            // Pattern
            this.setErrorId(true, this.getErrorMessage(12))
            result = false;
        }
        ////
        if (result) {
            this.setErrorId(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(10));
        }
        return result;
    }

    // Nick Name
    setErrorNick = (isError, message = '') => {
        this.setState({
            isErrorNick: isError,
            errorNickMessage: message
        })
    }

    checkNick = nick => {
        let result = true;
        if (Common.isEmpty(nick)) {
            this.setErrorNick(true, this.getErrorMessage(21))
            result = false;
        } else if (nick.length < 2 || nick.length > 15) {
            // Length
            this.setErrorNick(true, this.getErrorMessage(21))
            result = false;
        } else if (Common.checkSpace(nick) || Common.checkSpecialChar(nick)) {
            // Space / Special Char
            this.setErrorNick(true, this.getErrorMessage(22))
            result = false;
        } else if (Common.isEqualText(nick, BannedEquals) || Common.isContainsText(nick, BannedContains)) {
            // Banned Word
            this.setErrorNick(true, this.getErrorMessage(24));
            result = false;
        }
        ////
        if (result) {
            this.setErrorNick(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(20));
        }
        return result;
    }

    // Password
    setErrorPassword = (isError, message = '') => {
        this.setState({
            isErrorPassword: isError,
            errorPasswordMessage: message
        })
    }

    checkPassword = word => {
        let result = true;
        if (Common.isEmpty(word)) {
            this.setErrorPassword(true, this.getErrorMessage(31))
            result = false;
        } else if (!Common.checkPassword(word)) {
            // Pattern
            this.setErrorPassword(true, this.getErrorMessage(32))
            result = false;
        } else if (word.length < 8 || word.length > 20) {
            // Length
            this.setErrorPassword(true, this.getErrorMessage(32))
            result = false;
        }
        ////
        if (result) {
            this.setErrorPassword(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(30));
        }
        return result;
    }

    setErrorPasswordConfirm = (isError, message = '') => {
        this.setState({
            isErrorPasswordConfirm: isError,
            errorPasswordConfirmMessage: message
        })
    }

    checkPasswordConfirm = (origin, confirm) => {
        let result = true;
        if (Common.isEmpty(confirm)) {
            this.setErrorPasswordConfirm(true, this.getErrorMessage(42))
            result = false;
        } else if (origin !== confirm) {
            // Match
            this.setErrorPasswordConfirm(true, this.getErrorMessage(41))
            result = false;
        }
        ////
        if (result) {
            this.setErrorPasswordConfirm(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(40));
        }
        return result;
    }

    // Name
    setErrorName = (isError, message = '') => {
        this.setState({
            isErrorName: isError,
            errorNameMessage: message
        })
    }

    checkName = name => {
        let result = true;
        if (Common.isEmpty(name)) {
            this.setErrorName(true, this.getErrorMessage(51))
            result = false;
        } else if (name.length < 2 || name.length > 40) {
            // Length
            this.setErrorName(true, this.getErrorMessage(51))
            result = false;
        } else if (Common.checkSpecialChar(name)) {
            // Special Char
            this.setErrorName(true, this.getErrorMessage(51))
            result = false;
        }
        ////
        if (result) {
            this.setErrorName(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(50));
        }
        return result;
    }

    // Gender
    setErrorGender = (isError, message = '') => {
        this.setState({
            isErrorGender: isError,
            errorGenderMessage: message
        })
    }

    checkGender = _ => {
        // 0 => W
        // 1 => M
        let result = true;
        if (this.gender.getSelectIndex() < 0) {
            this.setErrorGender(true, this.getErrorMessage(61))
            result = false;
        }
        ////
        if (result) {
            this.setErrorGender(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(60));
        }
        return result;
    }

    // Birth
    setErrorBirth = (isError, message = '') => {
        this.setState({
            isErrorBirth: isError,
            errorBirthMessage: message
        })
    }

    checkBirth = date => {
        let result = true;
        if (Common.isEmpty(date)) {
            this.setErrorBirth(true, this.getErrorMessage(71))
            result = false;
        } else if (!moment(date).isBefore(new Date())) {
            // Before Date
            this.setErrorBirth(true, this.getErrorMessage(71))
            result = false;
        } else if (Common.checkUnder14Age(date)) {
            // Under 14 Age
            this.setErrorBirth(true, this.getErrorMessage(72))
            result = false;
        }
        ////
        if (result) {
            this.setErrorBirth(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(70));
        }
        return result;
    }

    // Country
    setErrorCountry = (isError, message = '') => {
        this.setState({
            isErrorCountry: isError,
            errorCountryMessage: message
        })
    }

    checkCountry = item => {
        let result = true;
        if (Common.isEmpty(item.iso)) {
            this.setErrorCountry(true, this.getErrorMessage(81))
            result = false;
        }
        ////
        if (result) {
            this.setErrorCountry(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(80));
        }
        return result;
    }

    // Phone
    setErrorPhone = (isError, message = '') => {
        this.setState({
            isErrorPhone: isError,
            errorPhoneMessage: message
        })
    }

    checkPhone = (item, phone) => {
        let result = true;
        if (Common.isEmpty(item.code) || Common.isEmpty(phone)) {
            this.setErrorPhone(true, this.getErrorMessage(91))
            result = false;
        } else if (phone.length < 5) {
            // Min Length
            this.setErrorPhone(true, this.getErrorMessage(91))
            result = false;
        } else if (Common.checkOnlyNumber(phone)) {
            // Only Number
            this.setErrorPhone(true, this.getErrorMessage(91))
            result = false;
        }
        ////
        if (result) {
            this.setErrorPhone(false)
        } else {
            this.setShowConfirm(true, this.getErrorMessage(90));
        }
        return result;
    }

    ////////////////////
    checkField = _ => {
        let result = true;
        // const {birthDate, countyItem, codeItem} = this.state;
        // if (!this.checkPhone(codeItem, this.phone.getPhone())) result = false;
        // if (!this.checkCountry(countyItem)) result = false;
        // if (!this.checkBirth(birthDate)) result = false;
        // if (!this.checkGender()) result = false;
        if (!this.checkName(this.name.getText())) result = false;
        if (!this.checkPasswordConfirm(this.password.getText(), this.passwordConfirm.getText())) result = false;
        if (!this.checkPassword(this.password.getText())) result = false;
        if (!this.checkNick(this.nick.getText())) result = false;
        if (!this.checkId(this.id.getText())) result = false;
        return result;
    }

    checkData = _ => {
        let result = true;
        if (!this.checkField()) result = false;
        if (!this.checkAll()) result = false;
        return result;
    }

    checkConfirm = _ => {
        const {isCheckTermsUnder14Age, isCheckTermsUse, isCheckTermsPrivacy} = this.state;
        if (!isCheckTermsUnder14Age || !isCheckTermsUse || !isCheckTermsPrivacy) {
            this.setShowConfirm(true, this.getErrorMessage(100));
            return false;
        }
        return true;
    }

    ////////////////////
    goToAuthentication = (email, name, expireTime) => {
        this.props.navigation.pop();
        this.props.navigation.navigate(Screen.STACK_LOGIN.AUTHENTICATION, {
            email: email,
            name: name,
            expireTime: expireTime,
        });
    }

    ////////////////////
    // Event
    onJoin = _ => {
        if (this.checkData() && this.checkConfirm()) this.join();
    };

    onTermsService = _ => {
        this.props.navigation.navigate(Screen.STACK_MORE.TERMS_POLICIES, {selectTerms: true});
    }

    onTermsPrivacy = _ => {
        this.props.navigation.navigate(Screen.STACK_MORE.TERMS_POLICIES, {selectTerms: false});
    }

    ////////////////////
    // API
    join = _ => {
        // const {codeItem} = this.state;
        // const {birthDate, countyItem, codeItem} = this.state;
        join(
            this.id.getText(),
            this.name.getText(),
            this.nick.getText(),
            // this.gender.getSelectIndex(),
            // birthDate,
            // countyItem.iso,
            // codeItem.code,
            // this.phone.getPhone(),
            this.password.getText(),
            this.passwordConfirm.getText(),
            (success, code, message, data) => {
                if (success) {
                    this.goToAuthentication(this.id.getText(), this.name.getText(), data.expiration_time);
                } else {
                    this.setShowConfirm(true, message);
                }
            });
    }

    ////////////////////
    // RENDER
    render() {
        const {
            isLoading,
            isShowCountyCode, countryCallback, isShowConfirm, errorMessage,
            isErrorNick, errorNickMessage, isErrorId, errorIdMessage,
            isErrorPassword, errorPasswordMessage, isErrorPasswordConfirm, errorPasswordConfirmMessage,
            isErrorName, errorNameMessage, isErrorGender, errorGenderMessage,
            birthDate, isErrorBirth, errorBirthMessage,
            countyItem, isErrorCountry, errorCountryMessage,
            codeItem, isErrorPhone, errorPhoneMessage,
            isCheckTermsUnder14Age, isCheckTermsUse, isCheckTermsPrivacy,
        } = this.state;
        const beforeDate = this.createBeforeDate(1);
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.join.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <KeyboardAwareScrollView style={s.layout_contents}>
                    {/* //////////////////// */}
                    <BaseText style={[FontStyle.Cnt13WhiteLT, {marginTop: Layout.UISize(20)}]}>
                        {localize.join.text.join_register_fill}
                    </BaseText>
                    <BaseText style={[FontStyle.CntTitleOrangeLH, {marginTop: Layout.UISize(30)}]}>
                        {localize.join.account_settings}
                    </BaseText>
                    {/* ID */}
                    <FlatInput ref={ref => this.id = ref}
                               keyboardType={Input.KEYBOARD_EMAIL_ADDRESS}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(28)}}
                               label={localize.join.id}
                               placeHolder={localize.join.hint.id}
                               showError={isErrorId}
                               errorMessage={errorIdMessage}/>
                    {/* Nick Name */}
                    <FlatInput ref={ref => this.nick = ref}
                               textContentType={"oneTimeCode"}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(38)}}
                               maxLength={15}
                               label={localize.join.nick_name}
                               placeHolder={localize.join.hint.nick_name}
                               showError={isErrorNick}
                               errorMessage={errorNickMessage}/>
                    {/* Password */}
                    <FlatInput ref={ref => this.password = ref}
                               textContentType={"oneTimeCode"}
                               type={Input.PASSWORD}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(38)}}
                               maxLength={20}
                               label={localize.join.password}
                               placeHolder={localize.join.hint.password}
                               infoMessage={localize.join.text.info_password}
                               showError={isErrorPassword}
                               errorMessage={errorPasswordMessage}/>
                    <FlatInput ref={ref => this.passwordConfirm = ref}
                               textContentType={"oneTimeCode"}
                               type={Input.PASSWORD}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(38)}}
                               maxLength={20}
                               label={localize.join.password_confirm}
                               placeHolder={localize.join.hint.password_confirm}
                               showError={isErrorPasswordConfirm}
                               errorMessage={errorPasswordConfirmMessage}/>
                    {/* //////////////////// */}
                    {/* Border */}
                    <View style={[s.layout_border, {marginTop: Layout.UISize(30)}]}/>
                    <BaseText style={[FontStyle.CntTitleOrangeLH, {marginTop: Layout.UISize(30)}]}>
                        {localize.join.member_info}
                    </BaseText>
                    {/* Name */}
                    <FlatInput ref={ref => this.name = ref}
                               required={true}
                               containerStyle={{marginTop: Layout.UISize(28)}}
                               maxLength={40}
                               label={localize.join.name}
                               placeHolder={localize.join.hint.name}
                               showError={isErrorName}
                               errorMessage={errorNameMessage}/>
                    {/* Gender */}
                    {/*<GroupSingleButtonWithHelper ref={ref => this.gender = ref}*/}
                    {/*                             required={true}*/}
                    {/*                             containerStyle={{marginTop: Layout.UISize(38)}}*/}
                    {/*                             label={localize.join.gender.title}*/}
                    {/*                             titles={[localize.join.gender.female, localize.join.gender.male]}*/}
                    {/*                             showError={isErrorGender}*/}
                    {/*                             errorMessage={errorGenderMessage}/>*/}
                    {/* Bitrh */}
                    {/*<SelectInput required={true}*/}
                    {/*             containerStyle={{marginTop: Layout.UISize(38)}}*/}
                    {/*             text={this.createDateFormat(birthDate)}*/}
                    {/*             label={localize.join.birth}*/}
                    {/*             placeHolder={localize.join.hint.birth}*/}
                    {/*             rightIcon={<Icon.SignDown size={14} color={colors.white}/>}*/}
                    {/*             onPress={_ => this.picker.open()}*/}
                    {/*             showError={isErrorBirth}*/}
                    {/*             errorMessage={errorBirthMessage}/>*/}
                    {/* Country */}
                    {/*<SelectInput required={true}*/}
                    {/*             containerStyle={{marginTop: Layout.UISize(38)}}*/}
                    {/*             text={countyItem.name}*/}
                    {/*             label={localize.join.country}*/}
                    {/*             placeHolder={localize.join.hint.country}*/}
                    {/*             rightIcon={<Icon.SignRight size={14} color={colors.white}/>}*/}
                    {/*             onPress={_ => this.setShowCountryCode(true, this.setCountryItem)}*/}
                    {/*             showError={isErrorCountry}*/}
                    {/*             errorMessage={errorCountryMessage}/>*/}
                    {/* Phone */}
                    {/*<PhoneInput ref={ref => this.phone = ref}*/}
                    {/*            required={true}*/}
                    {/*            containerStyle={{marginTop: Layout.UISize(38)}}*/}
                    {/*            textNation={codeItem.code}*/}
                    {/*            label={localize.join.phone}*/}
                    {/*            placeHolderNation={localize.join.hint.phone_nation}*/}
                    {/*            placeHolderPhone={localize.join.hint.phone_number}*/}
                    {/*            onPressNation={_ => this.setShowCountryCode(true, this.setCodeItem)}*/}
                    {/*            showError={isErrorPhone}*/}
                    {/*            errorMessage={errorPhoneMessage}/>*/}
                    {/* //////////////////// */}
                    {/* Border */}
                    <View style={[s.layout_border, {marginTop: Layout.UISize(30)}]}/>
                    {/* Terms */}
                    <BaseText style={[FontStyle.CntTitleOrangeLH, {marginTop: Layout.UISize(30)}]}>
                        {localize.join.terms.title}
                    </BaseText>
                    <BaseText style={[FontStyle.CntTitleWhiteLH, {marginTop: Layout.UISize(28)}]}>
                        {localize.join.text.terms_confirm}
                    </BaseText>
                    <View style={{marginTop: Layout.UISize(15)}}>
                        {/* Under14Age */}
                        <View style={{flexDirection: "row"}}>
                            <SquareCheckBox hitSlops={{top: Layout.UISize(5), bottom: Layout.UISize(5), left: Layout.UISize(10), right: Layout.UISize(20)}}
                                            checked={isCheckTermsUnder14Age}
                                            onChange={this.setCheckTermsUnder14Age}/>
                            <BaseText style={[FontStyle.Cnt13WhiteLT, {marginLeft: Layout.UISize(10)}]}>
                                {localize.join.text.terms_under_14_age}
                            </BaseText>
                        </View>
                        {/* Use */}
                        <View style={{flexDirection: "row", marginTop: Layout.UISize(12)}}>
                            <SquareCheckBox hitSlops={{top: Layout.UISize(5), bottom: Layout.UISize(5), left: Layout.UISize(10), right:Layout.UISize(20)}}
                                            checked={isCheckTermsUse}
                                            onChange={this.setCheckTermsUse}/>
                            <BaseText style={s.text_confirm_row}>
                                <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.join.text.terms_use.first}</BaseText>
                                <BaseText style={FontStyle.Cnt13OrangeCB}
                                          onPress={this.onTermsService}>{localize.join.terms.service}</BaseText>
                                <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.join.text.terms_use.last}</BaseText>
                            </BaseText>
                        </View>
                        {/* Privacy */}
                        <View style={{flexDirection: "row", marginTop: Layout.UISize(12)}}>
                            <SquareCheckBox hitSlops={{top: Layout.UISize(5), bottom: Layout.UISize(5), left: Layout.UISize(10), right: Layout.UISize(20)}}
                                            checked={isCheckTermsPrivacy}
                                            onChange={this.setCheckTermsPrivacy}/>
                            <BaseText style={s.text_confirm_row}>
                                <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.join.text.terms_privacy.first}</BaseText>
                                <BaseText style={FontStyle.Cnt13OrangeCB}
                                          onPress={this.onTermsPrivacy}>{localize.join.terms.privacy}</BaseText>
                                <BaseText style={FontStyle.Cnt13WhiteLT}>{localize.join.text.terms_privacy.last}</BaseText>
                            </BaseText>
                        </View>
                    </View>

                    {/* Button */}
                    <BaseButton title={localize.join.title}
                                onPress={this.onJoin}
                                buttonStyle={[s.layout_button, {marginTop: Layout.UISize(40)}]}
                                titleStyle={FontStyle.BtnWhiteCH}/>
                </KeyboardAwareScrollView>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => this.setShowConfirm(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
                {/* DatePicker */}
                <BottomDatePicker ref={ref => this.picker = ref}
                                  currentDate={beforeDate}
                                  maximumDate={beforeDate}
                                  onSelect={this.setBirthDate}/>
                {/* Country Popup */}
                <CountryCodePopup isVisible={isShowCountyCode}
                                  onBackPress={_ => this.setShowCountryCode(false)}
                                  onConfirm={item => {
                                      countryCallback && countryCallback(item);
                                      this.setShowCountryCode(false);
                                  }}/>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Join;
