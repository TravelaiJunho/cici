////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, View} from "react-native";
import moment from "moment";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/BannerDetail.style';
import localize from "../../../util/Localize";
import Screen from "../../../util/type/Screen";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import Html from "../../../component/html/Html";
// API
import {detailNoticeEventForNotice} from "../../../data/http/TabEventForNotice";
import {detailNoticeEventForMemberShip} from "../../../data/http/TabEventForMemberShip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BannerDetail extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
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
        this.setState({data: data});
    }

    formatTime = date => {
        return moment(date).format(localize.format.date_time);
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

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                detailNoticeEventForMemberShip(id, this.onResultDetail);
                break;
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {data} = this.state;
        if (Common.isEmpty(data)) return null;
        const {title, created_at, content} = data;
        return (
            <View style={s.container}>
                {/* Header */}
                <BackHeader title={localize.banner.mission}
                            skipAndroidStatusBar={false}
                            onBackPress={_ => this.props.navigation.pop()}/>
                <ScrollView>
                    <View style={s.layout_contents}>
                        {/* Title */}
                        <BaseText style={[FontStyle.HeadlineCntWhiteCH, s.layout_title]}>{title}</BaseText>
                        {/* Date */}
                        <BaseText style={[FontStyle.SubCntGrayLN, s.layout_date]}>{this.formatTime(created_at)}</BaseText>
                        {/* Border */}
                        <View style={s.layout_border}/>
                        {/* Contents */}
                        {!Common.isEmpty(content) && <Html content={content}/>}
                    </View>
                </ScrollView>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BannerDetail;