////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import moment from "moment";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/NoticeDetail.style';
import localize from "../../../util/Localize";
import Screen from "../../../util/type/Screen";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import Html from "../../../component/html/Html";
// API
import {detailForNotice} from "../../../data/http/TabNoticeForNotice";
import {detailForMemberShip} from "../../../data/http/TabNoticeForMemberShip";
import baseStyle from "../../_style/Base.style";
import TranslateButton from "../../../component/button/TranslateButton";
import {TranslateArray, Translate, TranslateHtml} from "../../../data/http/Translate";
import {connect} from "react-redux";
import BaseTransText from "../../../component/_base/BaseTransText";
import TranslateHeader from "../../../component/header/TranslateHeader";

import {THIRD_DEV} from "../../../util/Constants"
import {EVENT_STATUS, EVENT_TYPE} from "../../../util/type/Event";
import BaseButton from "../../../component/_base/BaseButton";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import {navRef} from "../../../navigation/RootNavigation";
import BaseImage from "../../../component/_base/BaseImage";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class NoticeDetail extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            autoTrans: false,
            data: null,
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
    setContent = content => {
        this.setState({content: content});
    }

    formatTime = date => {
        return moment(date).format(localize.format.date_time);
    }

    ////////////
    // API
    onResultDetail = (success, code, message, data) => {
        if (success) {
            this.setState({
                data: data,
            })
            this.ori_content = data.content;
            this.setContent(data.content);
        } else {
            Common.debug(data)
        }
    }

    getDetail = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return null;
        const {id} = this.props.route.params.item;
        switch (type) {
            case Screen.STACK_NOTICE.TAB_NOTICE:
                detailForNotice(id, this.onResultDetail);
                break;

            case Screen.STACK_MEMBERSHIP.TAB_NOTICE:
                detailForMemberShip(id, this.onResultDetail);
                break;
        }
    }

    onPart = () => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return null;
        const {data} = this.state;
        if (Common.isEmpty(data)) return null;
        navRef.current.navigate(Screen.SCREEN_ACTIVITY.POST_PUBLIC_BROADCAST, {
            type: type,
            item: data
        });
    }

    formatPeriodTime = (start, end) => {
        return `${this.formatTime(start)} ~ ${this.formatTime(end)}`;
    }
    ////////////////////
    // RENDER
    renderBottom = ended => {
        if (!ended) {
            return <BaseButton title={localize.common.apply}
                               onPress={this.onPart}
                               buttonStyle={s.layout_button}
                               titleStyle={FontStyle.BtnWhiteCH}/>;
        } else {
            return null;
        }
    }
    renderStatus = () => {
        const {item} = this.props.route.params;
        console.warn("DATA : ", item)
        const {category, created_at, is_propose, is_propose_ended, propose_end_time} = item;
        let title = localize.event.status.progress;
        if (!is_propose) {
            // {/* Category */}
            return (
                <View style={{flexDirection: "row"}}>
                    <View style={s.layout_category}>
                        <BaseTransText autoTranslate={this.state.autoTrans}
                                       style={FontStyle.Cnt13OrangeCB}>{category.name}</BaseTransText>
                    </View>
                </View>
            )
        } else {
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
                        <View
                            style={[s.layout_tag_vertical_bar, {backgroundColor: is_propose_ended ? colors.gray : colors.white}]}/>
                        <BaseText style={propose_text}>{this.formatPeriodTime(created_at, propose_end_time)}</BaseText>
                    </View>

                </View>

            )
        }
    }

    renderImage = (image) => {
        return(
            <TouchableOpacity
                onPress={()=>{
                    navRef.current.navigate(Screen.SCREEN_ACTIVITY.IMAGE_VIEWER, {source:{uri:image}});}
                }
            >
                <BaseImage
                    style={s.image_layout}
                    resizeMode={'cover'}
                    source={{uri:image}}
                />
            </TouchableOpacity>
        )
    }

    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {category, title, created_at, is_propose, is_propose_ended} = item;
        const {content} = this.state;

        console.warn(item);

        let header_title = localize.notice.title;
        if (is_propose) {
            header_title = category.name;
        }


        return (
            <View style={s.container}>
                {/* Header */}
                <TranslateHeader title={header_title}
                                 skipAndroidStatusBar={false}
                                 translateEnabled={this.state.autoTrans}
                                 onPressTranslate={(enabled) => {
                                     // if (enabled) {
                                     //     TranslateHtml(content, this.props.translateLanguage, (trans) => {
                                     //         Common.debug(trans);
                                     //         this.setState({
                                     //             content: trans
                                     //         })
                                     //     })
                                     // } else {
                                     //     this.setState({
                                     //         content: this.ori_content
                                     //     })
                                     // }
                                     this.setState({
                                         autoTrans: enabled
                                     })
                                 }}
                                 onBackPress={_ => this.props.navigation.pop()}/>
                <ScrollView>
                    <View style={s.layout_contents}>
                        {/* status */}
                        {this.renderStatus()}
                        {/* Title */}
                        <BaseTransText autoTranslate={this.state.autoTrans}
                                       style={[FontStyle.HeadlineCntWhiteCH, s.layout_title]}>{title}</BaseTransText>
                        {/* Date */}
                        {/*<BaseText style={[FontStyle.SubCntGrayLN, s.layout_date]}>{this.formatTime(created_at)}</BaseText>*/}
                        <View style={s.DateRow}>
                            <BaseText
                                style={[FontStyle.SubCntGrayLN, s.layout_date]}>{this.formatTime(created_at)}</BaseText>
                            {/*<View style={baseStyle.subShapeCircle}/>*/}
                            {/*<TranslateButton useIcon={true} enabled={this.state.autoTrans} onEnabled={enabled=>{*/}
                            {/*    if(enabled){*/}
                            {/*        Translate(content, this.props.translateLanguage, (trans)=>{*/}
                            {/*            console.warn(trans)*/}
                            {/*            this.setState({*/}
                            {/*                content:trans*/}
                            {/*            })*/}
                            {/*        })*/}
                            {/*    }else{*/}
                            {/*        this.setState({*/}
                            {/*            content:this.ori_content*/}
                            {/*        })*/}
                            {/*    }*/}

                            {/*    this.setState({*/}
                            {/*        autoTrans:enabled*/}
                            {/*    })*/}
                            {/*}} />*/}
                        </View>
                        {/* Border */}
                        <View style={s.layout_border}/>
                        {/* Contents */}
                        {
                            !Common.isEmpty(content) &&
                            <Html autoTranslate={this.state.autoTrans} content={content}
                                  enableImageView={THIRD_DEV ? true : false}/>
                        }
                        {/* image */}
                        {
                            !Common.isEmpty(item.image) &&
                                this.renderImage(item.image)
                        }
                    </View>
                </ScrollView>
                {/* Bottom */}
                {is_propose && this.renderBottom(is_propose_ended)}
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        translateLanguage: state.translate.get('target'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetail);
