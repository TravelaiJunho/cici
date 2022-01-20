////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/PostPublicBroadCasting.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import Icon from "../../../util/Icon";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BaseImage from "../../../component/_base/BaseImage";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import BaseTouchableButton from "../../../component/button/_base/BaseTouchableButton";
import BaseTextInput from "../../../component/_base/BaseTextInput";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import BaseHelperLayout from "../../../component/_base/BaseHelperLayout";
import FlatInput from "../../../component/text/FlatInput";
// API
import {EVENT_STATUS} from "../../../util/type/Event";
import {get, post} from "../../../data/_base/BaseAxios";
import moment from "moment";
import Screen from "../../../util/type/Screen";
import {ANSWER_TYPE} from "../../../util/type/AnswerType";
import SubjectiveText from "../../../component/question/SubjectiveText";
import SubjectiveDate from "../../../component/question/SubjectiveDate";
import MultipleChoice from "../../../component/question/MultipleChoice";
import SelectImage from "../../../component/question/SelectImage";
import BaseTransText from "../../../component/_base/BaseTransText";
import TranslateHeader from "../../../component/header/TranslateHeader";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostPublicBroadCasting extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            // Loading
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            confirmCallback: null,
            // fromdata
            formData: null,
            autoTranslate: false,
        };

        this.QuestionBoxs = [];
        this.formID = 0;
        this.init();
    }

    ////////////////////
    // FUNCTION
    init = () => {
        const {item, type} = this.props.route.params;
        let api = null;
        switch (type) {
            case Screen.STACK_MEMBERSHIP.TAB_NOTICE:
                api = `/membership/notice/${item.id}/form/`;
                break;

            case  Screen.STACK_NOTICE.TAB_NOTICE:
                api = `/notice/notice/${item.id}/form/`
                break;
        }
        if (api == null) {
            this.onCancel();
            return;
        }
        get(api, null, (success, code, message, data) => {
            console.warn(success, code, message, data)
            if (success) {
                this.formID = data.id;
                this.setState({
                    formData: data.formData,
                })
            }
        })
    }
    setShowLoading = isShow => {
        if (this.state.isLoading !== isShow) {
            this.setState({isLoading: isShow});
        }
    }

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message,
                confirmCallback: callback,
            });
        }
    }
    formatTime = date => {
        return moment(date).format(localize.format.date_time);
    }

    formatPeriodTime = (start, end) => {
        return `${this.formatTime(start)} ~ ${this.formatTime(end)}`;
    }
    ////////////
    // Title
    checkTitle = _ => {
        const t = this.title.getText().trim();
        if (Common.isEmpty(t)) {
            this.setShowConfirm(true, localize.error.post.title);
            return false;
        }
        return true;
    }

    onCancel = _ => this.props.navigation.pop();

    onPost = _ => {
        this.setState({isLoading: true}, () => {

            // this.state.formData
            let formData = new FormData();
            formData.append('formId', this.formID);

            let checkpass = true;
            this.state.formData.map((item, index) => {
                let id = Common.isEmpty(item.id) ? index : item.id;
                let res = this.QuestionBoxs[index].checkValue()
                console.warn('checkValue : ', res)
                if (!Common.isEmpty(res.data)) {
                    if (Array.isArray(res.data)) {
                        res.data.map(rd => {
                            formData.append(item.key, rd)
                        })
                    } else {
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
                this.setShowLoading(false);
                this.setShowConfirm(true, localize.more.membershiprequest.error_input_answer);

                return;
            }

            const {item, type} = this.props.route.params;
            let api = null;
            switch (type) {
                case Screen.STACK_MEMBERSHIP.TAB_NOTICE:
                    api = `/membership/notice/${item.id}/form/`;
                    break;

                case  Screen.STACK_NOTICE.TAB_NOTICE:
                    api = `/notice/notice/${item.id}/form/`
                    break;
            }
            if (api == null) {
                this.onCancel();
                return;
            }

            post(api, formData, (success, code, message, data) => {
                console.warn(success, code, message, data)
                if (success) {
                    let title = '';
                    switch (code) {
                        case "100": {
                            title = localize.publicBroadCasting.success;
                            break;
                        }
                        case "110": {
                            title = localize.publicBroadCasting.alreadyVote;
                            break;
                        }
                    }
                    this.setShowConfirm(true, title, () => {
                        this.props.navigation.pop()
                    });
                } else {
                    this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
                }
                this.setShowLoading(false);
            })
        });

    }

    getErrorMessage = (code = 0) => {
        switch (code) {
            case 110: {
                // 이미 투표를 완료하였습니다.
                return localize.publicBroadCasting.alreadyVote;
            }
            case 251: {
                // 필수 질문에 대한 답변을 모두 입력해주세요.
                return localize.publicBroadCasting.fillAll;
            }
            case 252: {
                // 타입 오류
                return localize.error.failed;
            }
            default:
                return localize.error.failed;
        }
    }

    ////////////////////
    // API
    ////////////////////

    ////////////////////
    // RENDER
    renderStatus = () => {
        const {item} = this.props.route.params;
        const {category, created_at, is_propose, is_propose_ended, propose_end_time} = item;
        let title = localize.event.status.progress;
        let endDate = this.formatTime(propose_end_time) + " " + localize.event.status.deadline;

        let propose_style = {
            backgroundColor: colors.orange,
        }
        let propose_text = FontStyle.Cnt13WhiteCN;
        if (is_propose_ended) {
            title = localize.event.status.end;
            propose_style = {
                borderWidth: Layout.UISize(1),
                borderColor: colors.gray
            }
            propose_text = FontStyle.Cnt13GrayCN;
        }
        return (
            <View style={s.layout_propose}>
                <View style={[s.layout_status, propose_style]}>
                    <BaseText style={propose_text}>{title}</BaseText>
                    <View style={[s.layout_tag_vertical_bar, {backgroundColor: is_propose_ended ? colors.gray : colors.white}]}/>
                    <BaseText style={propose_text}>{this.formatPeriodTime(created_at, propose_end_time)}</BaseText>
                </View>

            </View>

        )

        // return (
        //     <View style={s.layout_propose}>
        //         <View style={s.propose_ended}>
        //             <BaseText
        //                 style={is_propose_ended ? FontStyle.Cnt13GrayCN : FontStyle.Cnt13WhiteCN}>{title + " | " + endDate}</BaseText>
        //         </View>
        //     </View>
        //
        // )
    }

    renderItem = (item, index) => {
        const {autoTranslate} = this.state;
        let q_index = `Q${index + 1}. `;
        switch (item.answerType) {
            case ANSWER_TYPE.T:
            case ANSWER_TYPE.TN: {
                // 주관식 문자
                return (
                    <SubjectiveText
                        autoTranslate={autoTranslate}
                        key={index + "SubjectiveText"}
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
                        value={Common.isEmpty(item.answer) ? '' : item.answer + ''}
                        editable={this.state.editable}
                    />
                )
            }
            case ANSWER_TYPE.TD: {
                // 주관식 날짜
                //renderContent = this.renderTextDate;
                return (
                    <SubjectiveDate
                        autoTranslate={autoTranslate}
                        key={index + "SubjectiveDate"}
                        ref={r => {
                            this.QuestionBoxs[index] = r
                        }}
                        onChange={(value) => {
                            item.answerTemp = value;
                        }}
                        required={item.required}
                        title={item.question}
                        frontTitle={q_index}
                        value={Common.isEmpty(item.answer) ? '' : item.answer + ''}
                        editable={this.state.editable}
                    />
                )
            }
            case ANSWER_TYPE.CM:
            case ANSWER_TYPE.C: {
                // 객관식
                //renderContent = this.renderChoice;
                let vertical = true;
                if (Common.isEmpty(item.choices)) {

                } else {
                    if (item.choices.length != 0) {
                        if (item.choices[0].answer_type !== 'T') {
                            vertical = false;
                        }
                    }
                }

                return (
                    <MultipleChoice
                        autoTranslate={autoTranslate}
                        key={index + "MultipleChoice"}
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
                    />
                )
            }
            case ANSWER_TYPE.I: {
                // 이미지
                //renderContent = this.renderImage;
                return (
                    <SelectImage
                        autoTranslate={autoTranslate}
                        key={index + "SelectImage"}
                        ref={r => {
                            this.QuestionBoxs[index] = r
                        }}
                        required={item.required}
                        title={item.question}
                        frontTitle={q_index}
                        editable={this.state.editable}
                    />
                )
            }
        }
    }

    renderFormData = () => {
        const {item} = this.props.route.params;
        const {formData} = this.state;
        if (Common.isEmpty(formData)) return null;

        return (
            <View>
                {
                    formData.map((formItem, index) => {
                        return this.renderItem(formItem, index)
                    })
                }
            </View>
        )
    }

    render() {
        const {item} = this.props.route.params;
        const {
            isLoading,
            isShowConfirm, errorMessage, confirmCallback,
            autoTranslate
        } = this.state;
        const {category, title, created_at, is_propose, is_propose_ended} = item;
        return (
            <KeyboardAvoidingView style={s.container}
                                  behavior={"padding"}
                                  enabled={Common.checkIOS()}
                                  keyboardVerticalOffset={Layout.getStatusBarHeight(true, false)}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <TranslateHeader title={category.name}
                                 skipAndroidStatusBar={false}
                                 onBackPress={this.onCancel}
                                 translateEnabled={autoTranslate}
                                 onPressTranslate={(trans) => {
                                     this.setState({
                                         autoTranslate: trans
                                     })
                                 }}
                />
                {/* Contents */}
                <ScrollView bounces={false}
                            overScrollMode={"never"}>
                    <View style={s.layout_contents}>
                        {/* status */}
                        {this.renderStatus()}
                        {/* Title */}
                        <BaseTransText
                            autoTranslate={autoTranslate}
                            style={[FontStyle.HeadlineCntWhiteLH, {marginTop: Layout.UISize(5)}]}>{title}</BaseTransText>

                    </View>
                    <View style={s.line}/>
                    {/* Form Data */}
                    <View style={s.layout_contents}>
                        {this.renderFormData()}
                    </View>
                </ScrollView>
                {/* Bottom */}
                <View style={s.layout_two_button}>
                    <BaseTouchableButton title={localize.common.cancel}
                                         buttonStyle={{backgroundColor: colors.gray}}
                                         onPress={this.onCancel}/>
                    <BaseTouchableButton title={localize.common.apply}
                                         buttonStyle={{marginLeft: Layout.UISize(15)}}
                                         onPress={this.onPost}/>
                </View>

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  this.setShowConfirm(false);
                                  confirmCallback && confirmCallback();
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </KeyboardAvoidingView>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default PostPublicBroadCasting;
