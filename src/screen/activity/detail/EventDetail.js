////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";
import moment from "moment";
import _ from "lodash";
////////////////////
// Local
import {navRef} from "../../../navigation/RootNavigation";
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/EventDetail.style';
import localize from "../../../util/Localize";
import Screen from "../../../util/type/Screen";
import Layout from "../../../util/Layout";
import {EVENT_STATUS, EVENT_TYPE} from "../../../util/type/Event";
import {colors} from "../../../util/Color";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import BaseButton from "../../../component/_base/BaseButton";
import BaseImage from "../../../component/_base/BaseImage";
import Html from "../../../component/html/Html";
// API
import {detailNoticeEventForNotice} from "../../../data/http/TabEventForNotice";
import {detailNoticeEventForMemberShip} from "../../../data/http/TabEventForMemberShip";
// Asset
import {IMAGE_MISSION_R} from "../../../../assets";
import TranslateHeader from "../../../component/header/TranslateHeader";
import BaseTransText from "../../../component/_base/BaseTransText";
import {Translate, TranslateHtml} from "../../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class EventDetail extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            autoTranslate: false,
            content: null,
        }

        this.ori_content = null;
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.addBackHandler();
        this.getDetail();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeBackHandler();
    }

    ////////////////////
    // FUNCTION
    setContent = data => {
        this.ori_content = data.content;
        this.setState({
            data: data,
            content: data.content,
        });
    }

    formatTime = date => {
        return moment(date).format(localize.format.date_time);
    }

    formatPeriodTime = (start, end) => {
        return `${this.formatTime(start)} ~ ${this.formatTime(end)}`;
    }

    getTag = (tags, code) => {
        if (!Common.checkListSize(tags)) return '';
        const t = _.find(tags, v => {
            return v.code === code;
        });
        return '#' + t.name;
    }

    getTagByType = (code, eventType) => {
        const {type} = this.props.route.params;

        if(EVENT_TYPE.VOTE === eventType) {
            return "#" + localize.vote.title;
        }

        if(Common.isEmpty(code)) {
            return '';
        }
        switch (type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.getTag(this.props.tagListByNoticeTabEvent, code);

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return this.getTag(this.props.tagListByMemberShipTabEvent, code);
        }
    }

    createTagListToHashTag = list => {
        return list.map(v => {
            if (!Common.isEmpty(v)) return '#' + v;
        }).join(Common.SEPARATOR_SPACE);
    }

    // Event
    onVote = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return null;
        const {data} = this.state;
        if (Common.isEmpty(data)) return null;
        navRef.current.navigate(Screen.SCREEN_ACTIVITY.POST_VOTE, {
            type: type,
            item: data
        });
    }
    onPart = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return null;
        const {data} = this.state;
        if (Common.isEmpty(data)) return null;
        navRef.current.navigate(Screen.SCREEN_ACTIVITY.POST_EVENT, {
            type: type,
            item: data
        });
    }

    ////////////
    // API
    onResultDetail = (success, code, message, data) => {
        if (success) {
            this.setContent(data);
        } else {
            Common.debug(data)
        }
    }

    getDetail = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return null;
        const {id} = this.props.route.params.item;
        switch (type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                detailNoticeEventForNotice(id, this.onResultDetail);
                break;

            case  Screen.STACK_MEMBERSHIP.TAB_EVENT:
                detailNoticeEventForMemberShip(id, this.onResultDetail);
                break;
        }
    }

    ////////////////////
    // RENDER
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
                        <BaseText style={[FontStyle.Cnt13WhiteLN, {color: colors.orange}]}>{this.formatPeriodTime(start, end)}</BaseText>
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

    renderMission = list => {
        if(EVENT_TYPE.VOTE === this.state.data.type) {
            return <View style={{height:Layout.UISize(10)}} />;
        }
        if (!Common.checkListSize(list)) return null;
        return (
            <View>
                {/* Border */}
                <View style={[s.layout_border, {marginTop: Layout.UISize(20), marginBottom: Layout.UISize(10)}]}/>
                <View style={s.layout_mission}>
                    <BaseImage style={s.image_mission}
                               source={IMAGE_MISSION_R}/>
                    <BaseTransText autoTranslate={this.state.autoTranslate}  style={[FontStyle.Cnt13WhiteLT, s.text_mission_tag]}>{this.createTagListToHashTag(list)}</BaseTransText>
                </View>
            </View>

            );
    }

    renderWinner = (type, winner) => {
        if (type !== EVENT_STATUS.WINNER || Common.isEmpty(winner)) return null;
        return (
            <View>
                {/* Border */}
                <View style={s.layout_border}/>
                {/* Winner */}
                <View style={s.layout_winner}>
                    {/* Tag */}
                    <View style={s.layout_winner_tag_row}>
                        <View style={s.layout_winner_tag}>
                            <BaseText style={FontStyle.Cnt13MintCB}>{localize.event.status.winner}</BaseText>
                        </View>
                    </View>
                    {/* Contents */}
                    <Html content={winner}/>
                </View>
            </View>);
    }

    renderBottom = type => {
        switch (type) {
            case EVENT_STATUS.PROGRESS:
                const {data} = this.state;
                let title = '';
                let callback = null;
                switch(data.type) {
                    case EVENT_TYPE.VOTE: {
                        title = localize.vote.doVote;
                        callback = this.onVote;
                        break;
                    }
                    default: {
                        title = localize.event.detail.participate_verb;
                        callback = this.onPart;
                        break;
                    }
                }
                return <BaseButton title={title}
                                   onPress={callback}
                                   buttonStyle={s.layout_button}
                                   titleStyle={FontStyle.BtnWhiteCH}/>;
            default:
                return null;
        }
    }

    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {data, autoTranslate} = this.state;
        if (Common.isEmpty(data)) return null;
        console.warn("EventDetail: ", data)
        const {
            type,
            status, start_time, end_time,
            static_hashtag, mission_tags,
            title, created_at, content,
            winner
        } = data;

        let header_title = localize.event.detail.title;
        switch(type) {
            case EVENT_TYPE.VOTE: {
                header_title = localize.vote.doVote;
                break;
            }
            default: {
                header_title = localize.event.detail.title;
                break;
            }
        }

        return (
            <View style={s.container}>
                {/* Header */}
                <TranslateHeader title={header_title}
                            skipAndroidStatusBar={false}
                            onBackPress={_ => this.props.navigation.pop()}
                            translateEnabled={autoTranslate}
                            onPressTranslate={(trans) => {
                                // if (trans) {
                                //     TranslateHtml(content, this.props.translateLanguage, (trans) => {
                                //         Common.debug(trans);
                                //         this.setState({
                                //             content: trans
                                //         })
                                //     })
                                // } else {
                                //     this.setState({
                                //         content: content
                                //     })
                                // }
                                this.setState({
                                    autoTranslate: trans
                                })
                            }}
                />
                <ScrollView style={{flex: 1}}>
                    <View style={s.layout_contents}>
                        {/* Tag */}
                        <View style={{flexDirection: 'row'}}>
                            {this.renderProgressTagDate(status, start_time, end_time)}
                        </View>
                        {/* Hash Tag */}
                        <BaseTransText autoTranslate={autoTranslate} style={[FontStyle.SubHashOrangeLT, {marginTop: Layout.UISize(15)}]}>{this.getTagByType(static_hashtag, type)}</BaseTransText>
                        {/* Title */}
                        <BaseTransText autoTranslate={autoTranslate} style={[FontStyle.HeadlineCntWhiteLH, {marginTop: Layout.UISize(5)}]}>{title}</BaseTransText>
                        {/* Date */}
                        <BaseText style={[FontStyle.SubCntGrayLN, {marginTop: Layout.UISize(10)}]}>{this.formatTime(created_at)}</BaseText>
                        {/* Mission*/}
                        {this.renderMission(mission_tags)}
                        {/* Border */}
                        <View style={[s.layout_border, {marginTop: Layout.UISize(10), marginBottom: Layout.UISize(20)}]}/>
                        {/* Contents */}
                        {!Common.isEmpty(content) && <Html autoTranslate={autoTranslate} content={this.state.content}/>}
                    </View>
                    {/* Winner */}
                    {this.renderWinner(status, winner)}
                </ScrollView>
                {/* Bottom */}
                {this.renderBottom(status)}
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        translateLanguage: state.translate.get('target'),
        tagListByNoticeTabEvent: state.tab_event_for_notice.get('tagList'),
        tagListByMemberShipTabEvent: state.tab_event_for_membership.get('tagList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
