////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, ScrollView, View} from "react-native";
import moment from "moment";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from "../../../util/style/Font.style";
import s from "../../_style/SuggestDetail.style";
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import Common from "../../../util/Common";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BackHeader from "../../../component/header/BackHeader";
import BaseText from "../../../component/_base/BaseText";
import FullWidthImage from "../../../component/image/FullWidthImage";
// API
import {detail} from "../../../data/http/Suggest";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SuggestDetail extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            content: null,
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
            this.setContent(data);
        } else {
            Common.debug(data);
        }
    }

    getDetail = _ => {
        const {id} = this.props.route.params;
        if (Common.isEmpty(id)) return null;
        detail(id, this.onResultDetail);
    }

    ////////////////////
    // RENDER
    renderDetailItem = ({item, index}) => {
        return <FullWidthImage url={item.image_url}/>;
    }

    renderContents = (title, date, question, images) => {
        return (
            <View style={s.layout_main_contents}>
                {/* Title */}
                <BaseText style={[FontStyle.HeadlineCntWhiteCH, s.layout_main_title]}>{title}</BaseText>
                {/* Date */}
                <BaseText style={[FontStyle.SubCntGrayLN, s.layout_main_date]}>{this.formatTime(date)}</BaseText>
                {/* Border */}
                <View style={[s.layout_border, s.layout_main_border]}/>
                {/* Question */}
                <BaseText style={[FontStyle.Cnt13WhiteLN, s.layout_main_question]}>{question}</BaseText>
                {/* Image */}
                {Common.checkListSize(images) &&
                <FlatList style={s.layout_main_media}
                          extraData={this.state}
                          data={images}
                          threshold={2}
                          scrollEventThrottle={16}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={this.renderDetailItem}
                          ItemSeparatorComponent={_ => <View style={{height: Layout.UISize(15)}}/>}/>}
                {/*{!Common.isEmpty(this.test) && <Html content={this.test}/>}*/}
            </View>);
    }

    render() {
        const {content} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/*, {marginBottom: Layout.getBottomSpace()}*/}
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.suggest.history}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {!Common.isEmpty(content) &&
                <ScrollView style={{flex: 1}}>
                    {/* Contents */}
                    {this.renderContents(content.title, content.created_at, content.question, content.images)}
                </ScrollView>}
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default SuggestDetail;