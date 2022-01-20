////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, {Component} from "react";
import {BackHandler, ScrollView, View} from "react-native";
import moment from "moment";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/GoodsDetail.style';
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
import {get} from "../../../data/_base/BaseAxios";
import API from "../../../data/_base/API";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class GoodsDetail extends Component {

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
        this.getDetail();
        if (Common.checkAndroid()) BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    componentWillUnmount() {
        if (Common.checkAndroid()) BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }
    handleBackButton = _ => {
        this.props.navigation.pop()
        return true;
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
                data: data
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

        get(API.GOODS.GOODS_DETAIL + `${id}/`, null, (success, code, message, data) => {
            this.onResultDetail(success, code, message, data);
        });

    }

    ////////////////////
    // RENDER
    render() {
        const {item} = this.props.route.params;
        const {content, data} = this.state;
        if (Common.isEmpty(item)) return null;
        if (Common.isEmpty(data)) return null;



        return (
            <View style={s.container}>
                {/* Header */}
                <TranslateHeader title={localize.goods.title}
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
                        {/* Category */}
                        <View style={{flexDirection: "row"}}>
                            <View style={s.layout_category}>
                                <BaseTransText autoTranslate={this.state.autoTrans}
                                               style={FontStyle.Cnt13OrangeCB}>{item.category.name}</BaseTransText>
                            </View>
                        </View>
                        {/* Title */}
                        <BaseTransText autoTranslate={this.state.autoTrans}
                                       style={[FontStyle.HeadlineCntWhiteCH, s.layout_title]}>{data.title}</BaseTransText>
                        {/*<View style={s.DateRow}>*/}
                        {/*    <BaseText*/}
                        {/*        style={[FontStyle.SubCntGrayLN, s.layout_date]}>{this.formatTime(data.created_at)}</BaseText>*/}
                        {/*    <View style={baseStyle.subShapeCircle}/>*/}
                        {/*</View>*/}
                        {/* Border */}
                        <View style={s.layout_border}/>
                        {/* Contents */}
                        {!Common.isEmpty(content) && <Html autoTranslate={this.state.autoTrans} content={content} enableImageView={ THIRD_DEV ?  true : false}/>}
                    </View>
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetail);
