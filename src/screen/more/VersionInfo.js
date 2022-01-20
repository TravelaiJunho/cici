////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Linking, View} from "react-native";
import DeviceInfo from "react-native-device-info";
import VersionCheck from 'react-native-version-check';
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import BaseStyle from "../../util/style/Base.style";
import s from '../_style/VersionInfo.style'
import localize from "../../util/Localize";
import Layout from "../../util/Layout";
import {ANDROID_PACKAGE, IOS_APP_ID} from "../../util/Constants";
import Common from "../../util/Common";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseText from "../../component/_base/BaseText";
import Loader from "../../component/loader/Loader";
import BackHeader from "../../component/header/BackHeader";
import BaseImage from "../../component/_base/BaseImage";
import BaseButton from "../../component/_base/BaseButton";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// Asset
import {IMAGE_LOGO_SYMBOL} from "../../../assets";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class VersionInfo extends BaseScreen {

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
            currentVersion: DeviceInfo.getVersion(),
            isNewestVersion: false,
            storeUrl: '',
            //
            viewHeight: Layout.DEVICE_HEIGHT,
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
        this.getVersionInfo();
    }

    ////////////////////
    // FUNCTION
    getVersionInfo = async () => {
        const currentVersion = await VersionCheck.getCurrentVersion();
        const latestVersion = await VersionCheck.getLatestVersion();
        const need = await VersionCheck.needUpdate({
            currentVersion: currentVersion,
            latestVersion: latestVersion
        });
        if (!Common.isEmpty(need) && need.isNeeded) {
            let url;
            if (Common.checkIOS()) {
                url = await VersionCheck.getAppStoreUrl({appID: IOS_APP_ID});
            } else {
                url = await VersionCheck.getPlayStoreUrl({packageName: ANDROID_PACKAGE});
            }
            this.setState({
                currentVersion: currentVersion,
                isNewestVersion: need.isNeeded,
                storeUrl: url,
            })
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

    onUpdate = () => {
        const {storeUrl} = this.state;
        if (Common.isEmpty(storeUrl)) return;
        Linking.openURL(storeUrl);
    }

    ////////////////////
    // RENDER
    renderVersionInfo = () => {
        const {currentVersion, isNewestVersion} = this.state;
        return (
            <View style={[s.container, {flex: 1}]}>
                <BaseImage style={s.logo} source={IMAGE_LOGO_SYMBOL}/>
                <BaseText style={[FontStyle.CntTitleWhiteCB, {marginBottom: Layout.UISize(20)}]}>{localize.more.version_info.current_version} {currentVersion}</BaseText>
                {isNewestVersion
                    ? <BaseButton buttonStyle={s.btn}
                                  titleStyle={FontStyle.BtnWhiteCB}
                                  title={localize.common.update}
                                  onPress={() => this.onUpdate()}/>
                    : <BaseText style={FontStyle.Cnt13GrayDkCN}>{localize.more.version_info.newest_version}</BaseText>}
                <View style={{height: Layout.UISize(30)}}/>
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
                            title={localize.more.version_info.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Version */}
                {this.renderVersionInfo()}

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

export default VersionInfo;