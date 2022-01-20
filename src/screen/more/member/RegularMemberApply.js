////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, {Component, useState} from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {connect} from "react-redux";
import moment from "moment";
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import BaseStyle from "../../../util/style/Base.style";
import s from "../../_style/RegularMemberApply.style";
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import Input from "../../../util/type/Input";
import Icon from "../../../util/Icon";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BaseButton from "../../../component/_base/BaseButton";
import BaseImage from "../../../component/_base/BaseImage";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import FlatInput from "../../../component/text/FlatInput";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import BottomDatePicker from "../../../component/bottom_sheet/BottomDatePicker";
// API
import {userLevelUpRequest, userLevelUpRequestForm} from "../../../data/http/User";
import {getProfile} from "../../../data/redux/action/User";
import {IMAGE_CANCEL} from "../../../../assets";
import BaseTransText from "../../../component/_base/BaseTransText";
import TranslateButton from "../../../component/button/TranslateButton";
import {Translate} from "../../../data/http/Translate";
import TranslateHeader from "../../../component/header/TranslateHeader";
import {ANSWER_TYPE} from "../../../util/type/AnswerType";
import SubjectiveText from "../../../component/question/SubjectiveText";
import SubjectiveDate from "../../../component/question/SubjectiveDate";
import MultipleChoice from "../../../component/question/MultipleChoice";
import SelectImage from "../../../component/question/SelectImage";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

const CheckBox = (props) => {
    const [select, setSelect] = useState(false);
    const {multiSelect, item, onSelect} = props;
    const unSelect = _ => {
        setSelect(false)
    }
    return (
        <TouchableOpacity style={s.checkbox}
                          onPress={() => {
                              let sel = !select;
                              setSelect(sel)
                              if (onSelect) onSelect(unSelect, item, sel)
                          }}>
            <BaseText
                style={FontStyle.Cnt13WhiteLN}>{item.title + (select ? localize.more.membershiprequest.selected : '')}</BaseText>
        </TouchableOpacity>)
}

class QuestionBox extends Component {

    constructor(props) {
        super(props);
        let preValue = Common.isEmpty(props.item.answer) ? '' : props.item.answer + ''
        this.state = {
            valueData: preValue,
            errorMsg: false,
        }
        this.datePicker = null;
        this.selectCheckBox = null;
        this.textInput = null;
    }

    checkValue = () => {
        if (this.props.item.required) {
            if (Common.isEmpty(this.state.valueData)) {
                this.setErrorMsg(true)
                return {require: true, data: null};
            }
            this.setErrorMsg(false);
            return {require: true, data: this.state.valueData};
        }
        let value = Common.isEmpty(this.state.valueData) ? null : this.state.valueData
        return {require: false, data: value};
    }

    setErrorMsg = isError => {
        this.setState({errorMsg: isError});
    }

    setValueData = value => {
        this.setState({valueData: value});
    }

    resetValueData = () => {
        this.setErrorMsg(false);
        let value = Common.isEmpty(this.props.item.answer) ? null : this.props.item.answer + '';
        this.setValueData(value);
        if (this.textInput) {
            Common.debug('text input ', value)
            this.textInput.setText(value)
        }
    }

    onChangeValue = (value) => {
        if (this.state.errorMsg) this.setErrorMsg(false);
        this.setValueData(value);
        if (this.props.onChange) this.props.onChange(value)
    }

    renderText = item => {
        const {valueData, errorMsg} = this.state;
        let keyboardType = Input.KEYBOARD_DEFAULT;
        switch (item.answerType) {
            case 'T': {
                keyboardType = Input.KEYBOARD_DEFAULT
                break;
            }
            case 'TN': {
                keyboardType = Input.KEYBOARD_NUMBER
                break;
            }
        }
        return (
            <View style={s.question_text}>
                <FlatInput ref={r => this.textInput = r}
                           inputStyle={{color: this.props.editable ? colors.white : colors.grayDark}}
                           keyboardType={keyboardType}
                           required={true}
                           text={valueData}
                           editable={this.props.editable}
                           placeHolder={localize.more.membershiprequest.input_answer}
                           showError={errorMsg}
                           errorMessage={localize.more.membershiprequest.error_input_answer}
                           onChangeText={(result) => {
                               let value = result;
                               if (Input.KEYBOARD_NUMBER == keyboardType)
                                   value = Common.isEmpty(value) ? null : 0 + value;
                               this.onChangeValue(value)
                           }}/>
            </View>)
    }

    renderTextDate = item => {
        const {valueData, errorMsg} = this.state;
        let beforedate = moment(new Date()).subtract(1, 'd').toDate();
        return (
            <TouchableOpacity activeOpacity={1}
                              style={[s.question_date, {borderBottomColor: errorMsg ? colors.orange : colors.white}]}
                              onPress={() => {
                                  if (!this.props.editable) return;
                                  if (this.datePicker) this.datePicker.open()
                              }}>
                <BottomDatePicker ref={ref => this.datePicker = ref}
                                  currentDate={beforedate}
                                  maximumDate={beforedate}
                                  onSelect={result => {
                                      let date = moment(result);
                                      this.onChangeValue(date.format('YYYY-MM-DD'));
                                  }}/>
                <BaseText
                    style={[FontStyle.Cnt13GrayDkCN, {color: (!Common.isEmpty(valueData)) ? this.props.editable ? colors.white : colors.grayDark : colors.gray}, {padding: 0}]}>
                    {(!Common.isEmpty(valueData)) ? valueData : localize.more.membershiprequest.input_answer}
                </BaseText>
                {errorMsg &&
                <BaseText style={[FontStyle.CntNoticeOrangeLT, {position: 'absolute', bottom: Layout.UISize(-25)}]}>
                    {localize.more.membershiprequest.error_input_answer}
                </BaseText>}
            </TouchableOpacity>)
    }

    renderChoice = item => {
    }

    renderImage = item => {
        const {valueData, errorMsg} = this.state;
        return (
            <TouchableOpacity style={s.question_image}>
                {Common.isEmpty(valueData) ?
                    <View style={s.question_image_container}>
                        <BaseImage style={s.question_image_box}
                                   source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCW4tbiTnEpXwd1oRms9yXuyZSe-bI-u3R2w&usqp=CAU"}}/>
                        <View style={s.question_image_cancel}>
                            <BaseImage style={s.image_close}
                                       source={IMAGE_CANCEL}/>
                        </View>
                    </View>
                    : <Icon.Plus size={Layout.UISize(20)} color={colors.grayLight}/>}
            </TouchableOpacity>)
    }

    render() {
        const {valueData, errorMsg} = this.state;
        const {item, onChange} = this.props;

        let renderContent = null;
        switch (item.answerType) {
            case ANSWER_TYPE.T:
            case ANSWER_TYPE.TN: {
                // 주관식 문자
                renderContent = this.renderText;
                break;
            }
            case ANSWER_TYPE.TD: {
                // 주관식 날짜
                renderContent = this.renderTextDate;
                break;
            }
            case ANSWER_TYPE.C: {
                // 객관식
                renderContent = this.renderChoice;
                break;
            }
            case ANSWER_TYPE.CM: {
                // 객관식 다중선택
                renderContent = this.renderChoice;
                break;
            }
            case ANSWER_TYPE.I: {
                // 이미지
                renderContent = this.renderImage;
                break;
            }
        }
        return <View>{renderContent(item)}</View>;
    }
}

class RegularMemberApply extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);

        this.formID = 0;
        this.QuestionBoxs = {}
        this.lastStatus = null;
        this.title = localize.more.membershipinfo.regularmember_apply;

        this.editable = true;
        if (!Common.isEmpty(this.props.profile.levelup_request_status) &&
            !Common.isEmpty(this.props.profile.levelup_request_status.latest_request_data)) {
            this.lastStatus = this.props.profile.levelup_request_status;
            this.title = localize.more.membershipinfo.application_status;
            this.editable = false;
        }

        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            formData: [],

            editable: this.editable,

            autoTrans: false,
            transRejectComment: null,
        }

    }

    componentDidMount() {
        super.componentDidMount();
        this.addBackHandler();

        if (this.lastStatus) {
            this.formID = this.lastStatus.latest_request_data.formId;

            this.setState({
                formData: this.lastStatus.latest_request_data.answers
            })
        } else {
            userLevelUpRequestForm((success, code, message, data) => {
                console.warn(success, code, message, data)
                if (success) {
                    this.formID = data.id;
                    this.setState({
                        formData: data.formData,
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeBackHandler();
        this.getFormData(this.state.editable)
    }

    ////////////////////
    // FUNCTION
    getFormData = (editable) => {
        this.QuestionBoxs = {}
        if (this.lastStatus && !editable) {
            this.formID = this.lastStatus.latest_request_data.formId;

            this.setState({
                editable:editable,
                formData: this.lastStatus.latest_request_data.answers
            })
        } else {
            userLevelUpRequestForm((success, code, message, data) => {
                console.warn(success, code, message, data)
                if (success) {
                    this.formID = data.id;
                    this.setState({
                        editable: editable,
                        formData: data.formData,
                    })
                }
            })
        }
    }


    onApply = _ => {
        // this.state.formData
        let formData = new FormData();
        formData.append('formId', this.formID);

        let checkpass = true;
        this.state.formData.map((item, index) => {
            let id = Common.isEmpty(item.id) ? index : item.id;
            let res = this.QuestionBoxs[index].checkValue()
            console.warn('checkValue : ', res)
            if (!Common.isEmpty(res.data)) {
                if(Array.isArray(res.data)) {
                    res.data.map(rd=>{
                        formData.append(item.key, rd)
                    })
                }else{
                    formData.append(item.key, res.data);
                    //formData[item.key] = res.data // Common.isEmpty(item.answerTemp) ? item.answer : item.answerTemp;
                }
            } else {
                if (res.require)
                    checkpass = false;
            }
        })

        // check
        if (!checkpass) {
            this.setShowConfirm(true, localize.more.membershiprequest.error_input_answer);
            return;
        }
        // post
        userLevelUpRequest(formData, (success, code, message, data) => {
            console.warn(success, code, message, data)
            if (success) {
                this.setShowConfirm(true, localize.success.membership.request_success, () => {
                    //this.props.changeProfile()
                    this.props.navigation.pop()
                });
            } else {
                this.setShowConfirm(true,  this.getErrorMessage(code));
            }
        })
    };

    getErrorMessage = (code = 0) => {
        switch (code) {
            case "249": {
                return localize.error.membership_request.disable_grade;
            }
            case "250": {
                return localize.error.membership_request.exist_request;
            }
            case "252": {
                return localize.error.membership_request.type_error;
            }
            default:
                return localize.error.Failed;
        }
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

    ////////////////////
    // RENDER
    renderBottom = () => {
        //if (this.lastStatus.able_request) {
        if (Common.isEmpty(this.lastStatus)) {
            return (
                <View style={s.btnContainer}>
                    <View style={s.btnBottomContainer}>
                        <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                    buttonStyle={s.btnBottom}
                                    title={localize.common.cancel}
                                    onPress={() => {
                                        this.props.navigation.pop()
                                    }}/>
                        <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                    buttonStyle={[s.btnBottom, {backgroundColor: colors.orange}]}
                                    title={localize.common.apply}
                                    onPress={() => {
                                        this.onApply();
                                    }}/>
                    </View>
                    <View style={s.btnBottomSpace}/>
                </View>)
        }
        switch (this.lastStatus.latest_request_data.status) {
            case 'R': {
                let btn1text = localize.common.cancel;
                let btn2text = localize.common.apply;

                if (this.state.editable) {
                    btn1text = localize.common.cancel;
                    btn2text = localize.more.membershiprequest.try;
                } else {
                    btn1text = localize.common.ok;
                    btn2text = localize.more.membershiprequest.retry;
                }

                return (
                    <View style={s.btnContainer}>
                        <View style={s.btnBottomContainer}>
                            <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                        buttonStyle={s.btnBottom}
                                        title={btn1text}
                                        onPress={() => {
                                            if (this.state.editable) {
                                                this.state.formData.map((item, index) => {
                                                    let id = Common.isEmpty(item.id) ? index : item.id;
                                                    //this.QuestionBoxs[index].resetValueData()
                                                })

                                                this.getFormData(false)
                                            } else {
                                                this.props.navigation.pop()
                                            }
                                        }}/>
                            <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                        buttonStyle={[s.btnBottom, {backgroundColor: colors.orange}]}
                                        title={btn2text}
                                        onPress={() => {
                                            if (this.state.editable) {
                                                this.onApply();
                                            } else {
                                                console.warn("start Editable")

                                                this.getFormData(true)
                                            }

                                        }}/>
                        </View>
                        <View style={s.btnBottomSpace}/>
                    </View>)
            }
            case 'P': {
                return (
                    <View style={s.btnContainer}>
                        <View style={s.btnBottomContainer}>
                            <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                        buttonStyle={[s.btnBottomOne, {backgroundColor: colors.orange}]}
                                        title={localize.common.ok}
                                        onPress={() => {
                                            this.props.navigation.pop()
                                        }}/>
                        </View>
                        <View style={s.btnBottomSpace}/>
                    </View>)
            }
        }
    }

    renderItem = (item, index) => {
        const {autoTrans} = this.state;
        let q_index = `Q${index + 1}. `;

        switch (item.answerType) {
            case ANSWER_TYPE.T:
            case ANSWER_TYPE.TN: {
                // 주관식 문자
                return (
                    <SubjectiveText
                        ref={r => {
                            this.QuestionBoxs[index] = r
                        }}
                        onChange={(value) => {
                            item.answerTemp = value;
                        }}
                        type={item.answerType}
                        required={item.required}
                        title={item.question}
                        frontTitle={q_index}
                        value={ Common.isEmpty( item.answer ) ? null : item.answer + ''}
                        editable={this.state.editable}
                    />
                )
            }
            case ANSWER_TYPE.TD: {
                // 주관식 날짜
                //renderContent = this.renderTextDate;
                return (
                    <SubjectiveDate
                        autoTranslate={autoTrans}
                        ref={r => {
                            this.QuestionBoxs[index] = r
                        }}
                        onChange={(value) => {
                            item.answerTemp = value;
                        }}
                        required={item.required}
                        title={item.question}
                        frontTitle={q_index}
                        value={ Common.isEmpty( item.answer ) ? null : item.answer + ''}
                        editable={this.state.editable}
                    />
                )
            }
            case ANSWER_TYPE.CM:
            case ANSWER_TYPE.C: {
                // 객관식
                //renderContent = this.renderChoice;
                let vertical = true;
                let selected = null;
                if(Common.isEmpty(item.choices)) {

                }else{
                    if(item.choices.length!=0) {
                        if(item.choices[0].answer_type !== 'T') {
                            vertical = false;
                        }
                    }

                    if(item.answerType == ANSWER_TYPE.C) {
                        selected = 0;
                        if(!Common.isEmpty(item.answer)) {
                            item.answer.map(ia=>{
                                item.choices.map((ic, index)=>{
                                    if(ic.answer == ia ) {
                                        selected = index
                                    }
                                })
                            })
                        }

                    }else{
                        selected = [];
                        if(!Common.isEmpty(item.answer)) {
                            item.answer.map(ia=>{
                                item.choices.map((ic, index)=>{
                                    if(ic.answer == ia ) {
                                        selected[index] = true;
                                    }
                                })
                            })
                        }

                    }
                }

                return (
                    <MultipleChoice
                        autoTranslate={autoTrans}
                        ref={r => {
                            this.QuestionBoxs[index] = r
                        }}
                        required={item.required}
                        type={item.answerType}
                        title={item.question}
                        frontTitle={q_index}
                        items={item.choices}
                        editable={this.state.editable}
                        vertical={vertical}
                        checked={selected}
                    />
                )
            }
            case ANSWER_TYPE.I: {
                // 이미지
                //renderContent = this.renderImage;
                let imageItem = [];

                if(!Common.isEmpty(item.answer) && !this.state.editable) imageItem.push( {id:0,image_url:item.answer})
                /*
                item.answer.map(im=>{
                    item.push(im)
                })

                 */
                return (
                    <SelectImage
                        autoTranslate={autoTrans}
                        ref={r => {
                            this.QuestionBoxs[index] = r
                        }}
                        required={item.required}
                        title={item.question}
                        frontTitle={q_index}
                        editable={this.state.editable}
                        //selectImage={this.state.editable ? null : item.answer}
                        item={imageItem}
                    />
                )
            }
        }
    }

    renderFormData = ({item, index}) => {
        return (
            <View style={{
                marginTop: Layout.UISize(10),
                marginBottom: Layout.UISize(10),
                width: Layout.DEVICE_WIDTH,
                paddingLeft: Layout.UISize(20),
                paddingRight: Layout.UISize(20),
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                {/*<BaseText style={FontStyle.CntTitleOrangeLH}>*/}
                {/*    Q{index + 1}.*/}
                {/*    <BaseText*/}
                {/*        style={FontStyle.CntTitleWhiteLH}>{item.required ? ` ${localize.more.membershiprequest.answer_require}` : ` ${localize.more.membershiprequest.answer_select}`}</BaseText>*/}
                {/*    <BaseText style={FontStyle.CntTitleWhiteLH}>{item.question}</BaseText>*/}
                {/*</BaseText>*/}
                {/*<View>*/}
                {/*    <QuestionBox item={item}*/}
                {/*                 ref={r => {*/}
                {/*                     this.QuestionBoxs[index] = r*/}
                {/*                 }}*/}
                {/*                 onChange={(value) => {*/}
                {/*                     item.answerTemp = value;*/}
                {/*                 }}*/}
                {/*                 editable={this.state.editable}/>*/}
                {/*</View>*/}
                {this.renderItem(item,index)}
            </View>)
    }

    renderTop = _ => {
        //if (this.lastStatus.able_request) {
        if (Common.isEmpty(this.lastStatus)) {
            return (
                <View style={s.top_request}>
                    <BaseText
                        style={FontStyle.Cnt13WhiteLT}>{localize.more.membershiprequest.membership_desc}</BaseText>
                </View>)
        }

        switch (this.lastStatus.latest_request_data.status) {
            case 'R': {
                let status = this.lastStatus.latest_request_data;
                let date = moment(status.ended_at).format('YYYY-MM-DD');
                return (
                    <View style={s.top_reject_container}>
                        <View style={s.top_reject_inner}>
                            <BaseText
                                style={[FontStyle.CatOrangeCH, {marginBottom: Layout.UISize(15),}]}>{localize.more.membershiprequest.reject}</BaseText>
                            <BaseText
                                style={FontStyle.Cnt13WhiteLT}>{localize.more.membershiprequest.reject_desc}</BaseText>
                            <BaseText
                                style={FontStyle.Cnt13WhiteLT}>{localize.more.membershiprequest.reject_time}{date}</BaseText>
                            <BaseText style={FontStyle.Cnt13WhiteLT}>
                                {localize.more.membershiprequest.reject_comment}
                                <BaseTransText autoTranslate={this.state.autoTrans}
                                               style={FontStyle.Btn13OrangeLN}>{this.state.transRejectComment ? this.state.transRejectComment : status.rejectComment}</BaseTransText>
                            </BaseText>
                        </View>
                        {/*<View style={s.trans_range}>*/}
                        {/*    <TranslateButton useIcon={true} enabled={this.state.autoTrans} onEnabled={enabled => {*/}
                        {/*        if (enabled) {*/}
                        {/*            Translate(status.rejectComment, this.props.translateLanguage, (trans) => {*/}
                        {/*                console.warn(trans)*/}
                        {/*                this.setState({*/}
                        {/*                    transRejectComment: trans*/}
                        {/*                })*/}
                        {/*            })*/}
                        {/*        } else {*/}
                        {/*            this.setState({*/}
                        {/*                transRejectComment: null*/}
                        {/*            })*/}
                        {/*        }*/}

                        {/*        this.setState({*/}
                        {/*            autoTrans: enabled*/}
                        {/*        })*/}
                        {/*    }}/>*/}
                        {/*</View>*/}

                    </View>)
            }
            case 'P': {
                return (
                    <View style={s.top_applying_container}>
                        <View style={s.top_applying_inner}>
                            <BaseText
                                style={[FontStyle.Cnt13MintCB, {marginBottom: Layout.UISize(15),}]}>{localize.more.membershiprequest.applying}</BaseText>
                            <BaseText
                                style={FontStyle.Cnt13WhiteLT}>{localize.more.membershiprequest.applying_desc}</BaseText>
                        </View>
                    </View>)
            }
        }
    }

    render() {
        const {
            isLoading, isShowConfirm, errorMessage, callback, autoTrans,formData
        } = this.state;

        let status = null;
        if(!Common.isEmpty(this.lastStatus)) {
            status = this.lastStatus.latest_request_data;
        };

        console.warn("formData : ", formData)

        return (
            <View style={BaseStyle.container}>
                {/*<KeyboardAvoidingView behavior="height"*/}
                {/*                      enabled*/}
                {/*                      keyboardVerticalOffset={10}*/}
                {/*                      style={BaseStyle.container}>*/}
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <TranslateHeader skipAndroidStatusBar={false}
                                 title={this.title}
                                 onBackPress={_ => {
                                     this.props.changeProfile()
                                     this.props.navigation.pop()
                                 }}
                                 translateEnabled={autoTrans}
                                 onPressTranslate={(enabled) => {
                                     if (enabled) {
                                         if(status ){
                                             Translate(status.rejectComment, this.props.translateLanguage, (trans) => {
                                                 Common.debug(trans)
                                                 this.setState({
                                                     transRejectComment: trans
                                                 })
                                             })
                                         }
                                     } else {
                                         this.setState({
                                             transRejectComment: null
                                         })
                                     }

                                     this.setState({
                                         autoTrans: enabled
                                     })
                                 }}
                />

                <KeyboardAwareScrollView>
                    {/*<ScrollView>*/}
                    {/* Top */}
                    {this.renderTop()}
                    {/* Question */}
                    <FlatList data={formData}
                              renderItem={this.renderFormData}
                              contentContainerStyle={{flexGrow: 1}}/>
                    {/*</ScrollView>*/}


                </KeyboardAwareScrollView>
                {/* Bottom */}
                {this.renderBottom()}
                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
                {/*</KeyboardAvoidingView>*/}
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
        translateLanguage: state.translate.get('target'),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeProfile: _ => {
            return dispatch(getProfile());
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(RegularMemberApply);
