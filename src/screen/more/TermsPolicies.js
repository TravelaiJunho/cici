////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
////////////////////
// Local
import Common from '@util/Common';
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from '../_style/TermsPolicies.style'
import localize from "../../util/Localize";
import {colors} from "../../util/Color";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import Loader from "../../component/loader/Loader";
import BackHeader from "../../component/header/BackHeader";
import BaseText from "../../component/_base/BaseText";
import Html from "../../component/html/Html";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {contentPrivacy, contentTerms} from "../../data/http/Content";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TermsPolicies extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            //
            selectTerms: this.getInitSelectTerms(props),
            //
            termsData: null,
            policiesData: null,
            //
            webHeight: 0
        }
        this.webview = null;
    }

    componentDidMount() {
        super.componentDidMount();
        // get data
        contentTerms((success, code, message, data) => {
            if (success) {
                this.setState({termsData: data})
            } else {
                this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
            }
        })
        contentPrivacy((success, code, message, data) => {
            if (success) {
                this.setState({policiesData: data})
            } else {
                this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
            }
        })
    }

    ////////////////////
    // FUNCTION
    getInitSelectTerms = props => {
        if (!Common.isEmpty(props.route.params) && !Common.isEmpty(props.route.params.selectTerms)) {
            return props.route.params.selectTerms;
        }
        return true;
    }

    getErrorMessage = (code = 0) => {
        switch (code) {
            default:
                return localize.error.failed;
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

    onSelectType = (type) => {
        let selectTerms = false;
        if (type === 'terms') selectTerms = true;
        this.setState({selectTerms: selectTerms});
    }

    ////////////////////
    // RENDER
    renderWeb = _ => {
        const {selectTerms, termsData, policiesData} = this.state;
        let data = selectTerms ? termsData : policiesData;
        return !Common.isEmpty(data) && !Common.isEmpty(data.content) && <Html content={data.content}/>;
    }

    // renderContent = () => {
    //     const {selectTerms, termsData, policiesData} = this.state;
    //     let data = selectTerms ? termsData : policiesData;
    //     let contents = data ? data.content : {};
    //     if (contents) {
    //         contents = {
    //             html: `<head>
    //               <meta name="viewport" content="width=device-width, initial-scale=1" maximum-scale=1.0>
    //           </head>
    //           <body bgcolor=${colors.navy} ><div class="box">${contents}</div></body>`
    //         }
    //     }
    //     return (
    //         <WebView ref={r => this.webview = r}
    //                  onNavigationStateChange={(event) => {
    //                      if (event.url !== contents && !event.url.includes('about:blank')) {
    //                          if (this.webview) {
    //                              this.webview.stopLoading();
    //                          }
    //
    //                          setTimeout(() => {
    //                              Linking.openURL(event.url)
    //                          }, 500);
    //                      }
    //                  }}
    //                  style={[s.webview, {height: this.state.webHeight}]}
    //                  containerStyle={[s.webview_container, {height: this.state.webHeight}]}
    //                  showsVerticalScrollIndicator={false}
    //                  bounces={false}
    //                  scalesPageToFit={true}
    //                  directionalLockEnabled={true}
    //                  source={contents}
    //                  javaScriptEnabled={true}
    //                  javaScriptEnabledAndroid={true}
    //                  decelerationRate='normal'
    //                  domStorageEnabled={true}
    //                  scrollEnabled={false}
    //                  automaticallyAdjustContentInsets={false}
    //                  useWebKit={true}
    //                  injectedJavaScript={INJECTED_JS}
    //                  onMessage={(event: WebViewMessageEvent) => {
    //                      // console.log('nativeEvent : ', event.nativeEvent)
    //                      this.setState({webHeight: Number(event.nativeEvent.data) + Layout.UISize(10)})
    //                  }}/>);
    // }

    renderTab = () => {
        const {selectTerms} = this.state;
        return (
            <View style={s.tabcontainer}>
                <TouchableOpacity style={[s.btn, {borderBottomColor: selectTerms ? colors.orange : colors.grayDark}]}
                                  onPress={() => this.onSelectType('terms')}>
                    <BaseText style={selectTerms ? FontStyle.CatOrangeCH : FontStyle.CatGrayDkCH}>{localize.more.terms_policies.terms}</BaseText>
                </TouchableOpacity>
                <TouchableOpacity style={[s.btn, {borderBottomColor: !selectTerms ? colors.orange : colors.grayDark}]}
                                  onPress={() => this.onSelectType('policies')}>
                    <BaseText style={!selectTerms ? FontStyle.CatOrangeCH : FontStyle.CatGrayDkCH}>{localize.more.terms_policies.policies}</BaseText>
                </TouchableOpacity>
            </View>)
    }

    render() {
        const {isLoading, isShowConfirm, errorMessage, callback} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.terms_policies.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Tab */}
                {this.renderTab()}
                {/* Contents */}
                <ScrollView>
                    {/*{this.renderContent()}*/}
                    <View style={s.layout_contents}>
                        {this.renderWeb()}
                    </View>
                </ScrollView>
                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default TermsPolicies;