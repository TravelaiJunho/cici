////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/PostVote.style';
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
import {EVENT_STATUS, EVENT_TYPE} from "../../../util/type/Event";
import moment from "moment";
import Screen from "../../../util/type/Screen";
import {ANSWER_TYPE} from "../../../util/type/AnswerType";
import SubjectiveText from "../../../component/question/SubjectiveText";
import SubjectiveDate from "../../../component/question/SubjectiveDate";
import MultipleChoice from "../../../component/question/MultipleChoice";
import SelectImage from "../../../component/question/SelectImage";
import {get, post} from "../../../data/_base/BaseAxios"
import {userLevelUpRequest} from "../../../data/http/User";
import {detailNoticeEventForNotice} from "../../../data/http/TabEventForNotice";
import {detailNoticeEventForMemberShip} from "../../../data/http/TabEventForMemberShip";
import _ from "lodash";
import TranslateHeader from "../../../component/header/TranslateHeader";
import BaseTransText from "../../../component/_base/BaseTransText";
////////////////////////////////////r////
// CLASS
////////////////////////////////////////

class PostVote extends BaseScreen {

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
            // fromData
            formData: null,
            // autoTranslate
            autoTrans: false,
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
            case Screen.STACK_NOTICE.TAB_EVENT:
                api = `/notice/event/${item.id}/vote/`;
                break;

            case  Screen.STACK_MEMBERSHIP.TAB_EVENT:
                api = `/membership/event/${item.id}/vote/`
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

    }

    ////////////////////
    // API
    ////////////////////

    onVote = _ => {
        this.setState({
            isLoading: true
        }, () => {
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
                this.setShowConfirm(true, localize.more.membershiprequest.error_input_answer);
                this.setShowLoading(false);
                return;
            }
            const {item, type} = this.props.route.params;
            let api = null;
            switch (type) {
                case Screen.STACK_NOTICE.TAB_EVENT:
                    api = `/notice/event/${item.id}/vote/`;
                    break;

                case  Screen.STACK_MEMBERSHIP.TAB_EVENT:
                    api = `/membership/event/${item.id}/vote/`
                    break;
            }
            if (api) {
                post(api, formData, (success, code, message, data) => {
                    console.warn(success, code, message, data)
                    if (success) {
                        let title = '';
                        switch (code) {
                            case "100": {
                                title = localize.vote.success;
                                break;
                            }
                            case "110": {
                                title = localize.vote.alreadyVote;
                                break;
                            }
                        }
                        this.setState({
                            isLoading: false,
                        }, () => {
                            this.setShowConfirm(true, title, () => {
                                this.props.navigation.pop()
                            });
                        })

                    } else {
                        this.setState({
                            isLoading: false,
                        }, () => {
                            this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
                        })

                    }

                })
            } else {
                this.setShowLoading(false);
            }

        })

    };

    getErrorMessage = (code = 0) => {
        switch (code) {
            case 110: {
                // 이미 투표를 완료하였습니다.
                return localize.vote.alreadyVote;
            }
            case 251: {
                // 필수 질문에 대한 답변을 모두 입력해주세요.
                return localize.vote.fillAll;
            }
            case 252: {
                // 타입 오류
                return localize.error.failed;
            }
            default:
                return localize.error.failed;
        }
    }

    getTag = (tags, code) => {
        if (!Common.checkListSize(tags)) return '';
        const t = _.find(tags, v => {
            return v.code === code;
        });
        return '#' + t.name;
    }

    ////////////////////
    // RENDER
    getTagByType = (code, eventType) => {
        const {type} = this.props.route.params;
        if (EVENT_TYPE.VOTE === eventType) {
            return "#" + localize.vote.title;
        }
        if (Common.isEmpty(code)) {
            return '';
        }
        switch (type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.getTag(this.props.tagListByNoticeTabEvent, code);

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return this.getTag(this.props.tagListByMemberShipTabEvent, code);
        }
    }


    renderProgressTagDate = (type, start, end) => {
        switch (type) {
            case EVENT_STATUS.PROGRESS:
                return (
                    <View style={[s.layout_tag_date, {backgroundColor: colors.orange}]}>
                        <BaseText style={FontStyle.Cnt13WhiteCN}>{localize.event.status.progress}</BaseText>
                        <View style={[s.layout_tag_vertical_bar, {backgroundColor: colors.white}]}/>
                        <BaseText style={FontStyle.Cnt13WhiteLN}>{this.formatPeriodTime(start, end)}</BaseText>
                    </View>);

            case EVENT_STATUS.PLAN:
                return (
                    <View style={[s.layout_tag_date, {borderWidth: Layout.UISize(1), borderColor: colors.orange}]}>
                        <BaseText style={FontStyle.Cnt13OrangeCB}>{localize.event.status.plan}</BaseText>
                        <View style={[s.layout_tag_vertical_bar, {backgroundColor: colors.orange}]}/>
                        <BaseText
                            style={[FontStyle.Cnt13WhiteLN, {color: colors.orange}]}>{this.formatPeriodTime(start, end)}</BaseText>
                    </View>);

            case EVENT_STATUS.WINNER:
                return (
                    <View style={[s.layout_tag_date, {borderWidth: Layout.UISize(1), borderColor: colors.gray}]}>
                        <BaseText style={FontStyle.Cnt13GrayCN}>{localize.event.status.end}</BaseText>
                        <View style={[s.layout_tag_vertical_bar, {backgroundColor: colors.grayLight}]}/>
                        <BaseText style={FontStyle.Cnt13GrayLN}>{this.formatPeriodTime(start, end)}</BaseText>
                    </View>);

            case EVENT_STATUS.END:
                return (
                    <View style={[s.layout_tag_date, {borderWidth: Layout.UISize(1), borderColor: colors.gray}]}>
                        <BaseText style={FontStyle.Cnt13GrayCN}>{localize.event.status.end}</BaseText>
                        <View style={[s.layout_tag_vertical_bar, {backgroundColor: colors.grayLight}]}/>
                        <BaseText style={FontStyle.Cnt13GrayLN}>{this.formatPeriodTime(start, end)}</BaseText>
                    </View>);
        }
    }
    renderItem = (item, index) => {
        let q_index = `Q${index + 1}. `;
        switch (item.answerType) {
            case ANSWER_TYPE.T:
            case ANSWER_TYPE.TN: {
                // 주관식 문자
                return (
                    <SubjectiveText
                        autoTranslate={this.state.autoTrans}
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
                        autoTranslate={this.state.autoTrans}
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
                        autoTranslate={this.state.autoTrans}
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
                        autoTranslate={this.state.autoTrans}
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
            autoTrans,
        } = this.state;
        const {
            type,
            status, start_time, end_time,
            static_hashtag, mission_tags,
            title, created_at, content,
            winner,
        } = item;
        return (
            <KeyboardAvoidingView style={s.container}
                                  behavior={"padding"}
                                  enabled={Common.checkIOS()}
                                  keyboardVerticalOffset={Layout.getStatusBarHeight(true, false)}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <TranslateHeader title={localize.vote.doVote}
                                 skipAndroidStatusBar={false}
                                 onBackPress={this.onCancel}
                                 translateEnabled = {autoTrans}
                                 onPressTranslate={(trans) => {
                                    this.setState({
                                        autoTrans:trans
                                    })
                                 }}
                />
                {/* Contents */}
                <ScrollView style={{flex: 1}}>
                    <View style={s.layout_contents}>
                        {/* Tag */}
                        <View style={{flexDirection: 'row'}}>
                            {this.renderProgressTagDate(status, start_time, end_time)}
                        </View>
                        {/* Hash Tag */}
                        <BaseTransText
                            autoTranslate={autoTrans}
                            style={[FontStyle.SubHashOrangeLT, {marginTop: Layout.UISize(15)}]}>{this.getTagByType(static_hashtag, type)}</BaseTransText>
                        {/* Title */}
                        <BaseTransText
                            autoTranslate={autoTrans}
                            style={[FontStyle.HeadlineCntWhiteLH, {marginTop: Layout.UISize(5)}]}>{title}</BaseTransText>
                        {/* Date */}
                        {/*<BaseText style={[FontStyle.SubCntGrayLN, {marginTop: Layout.UISize(10)}]}>{this.formatTime(created_at)}</BaseText>*/}
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
                    <BaseTouchableButton title={localize.vote.doVote}
                                         buttonStyle={{marginLeft: Layout.UISize(15)}}
                                         onPress={this.onVote}/>
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

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

export default PostVote;
