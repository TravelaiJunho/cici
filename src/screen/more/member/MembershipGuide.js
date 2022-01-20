////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, View} from "react-native";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/MembershipGuide.style'
import localize from "../../../util/Localize";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import Html from "../../../component/html/Html";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
// API
import {contentLevelInfo} from "../../../data/http/Content";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MembershipGuide extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            //
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            //
            data: null,
            webHeight: 0,
        }
        this.webview = null;
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        contentLevelInfo((success, code, message, data) => {
            if (success) {
                // Common.debug(data)
                this.setState({data: data})
            } else {
                this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
            }
        })
    }

    ////////////////////
    // FUNCTION
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
                confirmCallback: callback,
                errorMessage: message
            });
        }
    }

    ////////////////////
    // RENDER
    renderInfo = _ => {
        const {data} = this.state;
        return !Common.isEmpty(data) && !Common.isEmpty(data.content) && <Html content={data.content}/>;
    }

    // renderLevelInfo = () => {
    //     const {data} = this.state;
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
    //         <WebView
    //             ref={r => this.webview = r}
    //             onNavigationStateChange={(event) => {
    //                 if (event.url !== contents && !event.url.includes('about:blank')) {
    //                     if (this.webview) {
    //                         this.webview.stopLoading();
    //                     }
    //
    //                     setTimeout(() => {
    //                         Linking.openURL(event.url)
    //                     }, 500);
    //                 }
    //             }}
    //             style={[s.webview, {height: this.state.webHeight,}]}
    //             containerStyle={[s.webview_container, {height: this.state.webHeight,}]}
    //             showsVerticalScrollIndicator={false}
    //             bounces={false}
    //             scalesPageToFit={true}
    //             directionalLockEnabled={true}
    //             source={contents}
    //             javaScriptEnabled={true}
    //             javaScriptEnabledAndroid={true}
    //             decelerationRate='normal'
    //             domStorageEnabled={true}
    //             scrollEnabled={false}
    //             automaticallyAdjustContentInsets={false}
    //             useWebKit={true}
    //             onMessage={(event: WebViewMessageEvent) => {
    //                 console.log('nativeEvent : ', event.nativeEvent)
    //                 this.setState({webHeight: Number(event.nativeEvent.data) + Layout.UISize(10)})
    //             }}
    //             injectedJavaScript={INJECTED_JS}
    //             domStorageEnabled={true}
    //         />
    //     )
    // }

    render() {
        const {
            isLoading, isShowConfirm, errorMessage, callback, data
        } = this.state;

        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.membershipinfo.membership_systeminfo}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                {/*{this.renderLevelInfo()}*/}
                <ScrollView>
                    <View style={s.layout_contents}>
                        {this.renderInfo()}
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
            </View>
        );
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////
export default MembershipGuide;
