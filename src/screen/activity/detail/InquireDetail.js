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
import s from "../../_style/InquireDetail.style";
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import {INQUIRE} from "../../../util/type/Service";
import Common from "../../../util/Common";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BackHeader from "../../../component/header/BackHeader";
import BaseText from "../../../component/_base/BaseText";
import FullWidthImage from "../../../component/image/FullWidthImage";
import Html from "../../../component/html/Html";
// API
import {detail} from "../../../data/http/Inquire";
import TranslateButton from "../../../component/button/TranslateButton";
import {Translate, TranslateHtml} from "../../../data/http/Translate";
import {connect} from "react-redux";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class InquireDetail extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            transAnswer: null,
            autoTrans: false,
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

    renderReply = (type, answer, date) => {
        if (type !== INQUIRE.ANSWER_COMPLETE) return null;
        return (
            <View>
                {/* Border */}
                <View style={s.layout_border}/>
                {/* Reply */}
                <View style={s.layout_reply}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {/* Category */}
                        <View style={[s.layout_reply_category, {borderColor: colors.mint}]}>
                            <BaseText style={FontStyle.Cnt13MintCB}>{localize.more.inquire.answer_complete}</BaseText>
                        </View>
                        {/* Date */}
                        <BaseText style={[FontStyle.SubCntGrayLN, s.layout_reply_date]}>{this.formatTime(date)}</BaseText>
                        <TranslateButton useIcon={true} enabled={this.state.autoTrans} onEnabled={enabled=>{
                            // if(enabled){
                            //     TranslateHtml(this.state.content.answer, this.props.translateLanguage, (trans)=>{
                            //         Common.debug(trans)
                            //         this.setState({
                            //             transAnswer:trans
                            //         })
                            //     })
                            // }else{
                            //     this.setState({
                            //         transAnswer:null
                            //     })
                            // }
                            this.setState({
                                autoTrans:enabled
                            })
                        }} />
                    </View>
                    {/* Contents */}
                    {/*<ScrollView style={s.layout_reply_contents}*/}
                    {/*            overScrollMode={"never"}>*/}
                    {/*<BaseText style={[FontStyle.Cnt13WhiteLT, s.layout_reply_contents]}>{answer}</BaseText>*/}
                    {!Common.isEmpty(answer) &&
                    <View style={s.layout_reply_contents}>
                        <Html autoTranslate={this.state.autoTrans} content={answer}/>
                    </View>}
                    {/*</ScrollView>*/}
                </View>
            </View>);
    }

    render() {
        const {content,  transAnswer} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/*, {marginBottom: Layout.getBottomSpace()}*/}
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.inquire.history}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {!Common.isEmpty(content) &&
                <ScrollView style={{flex: 1}}>
                    {/* Contents */}
                    {this.renderContents(content.title, content.created_at, content.question, content.images)}
                    {/* Reply */}
                    {this.renderReply(content.status, transAnswer ? transAnswer : content.answer, content.answer_at)}
                </ScrollView>}
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

//export default InquireDetail;
export default connect(mapStateToProps, mapDispatchToProps)(InquireDetail)
