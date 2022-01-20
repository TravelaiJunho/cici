////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import ImageViewer from 'react-native-image-zoom-viewer';
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/MediaImage.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import Icon from "../../../util/Icon";
import {requestStoragePermission} from "../../../util/Permission";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import Loader from "../../../component/loader/Loader";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import {getProfile} from "../../../data/redux/action/User";
import {connect} from "react-redux";
import TranslateHeader from "../../../component/header/TranslateHeader";
import {Translate} from "../../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaImage extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            // translate
            autoTrans: false,
            transTitle: null,
        }
    }

    ////////////////////
    // FUNCTION
    setShowLoading = isShow => {
        if (this.state.isLoading !== isShow) {
            this.setState({isLoading: isShow});
        }
    }

    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message
            });
        }
    }

    // Download
    successToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.success.file.save_image);
    }

    failToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.error.file.save_image);
    }

    saveFile = dest => {
        CameraRoll.save("file://" + dest)
            .then(result => this.successToSave())
            .catch(error => this.failToSave());
    }

    downloadFile = url => {
        this.setShowLoading(true);
        const path = Common.checkIOS() ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
        const dest = `${path}/${Common.getFileNameFromUrl(url)}`;
        RNFS.downloadFile({fromUrl: url, toFile: dest})
            .promise
            .then(res => {
                if (res && res.statusCode === 200) {
                    this.saveFile(dest);
                } else {
                    this.failToSave();
                }
            })
            .catch(error => this.failToSave());
    }

    // Event
    onDownload = async url => {
        let granted = await requestStoragePermission();
        if (granted) {
            if (!Common.isEmpty(url)) this.downloadFile(url);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    // TEST
    // jobId = -1
    // fileDownload = _ => {
    //     if (this.jobId !== -1) {
    //         return;
    //     }
    //     const link = 'https://kd-static-dev.s3.amazonaws.com/media/board/community/talktalk/2021/02/18/705cab2152cf43acbc64f92c5f09e324.jpg';
    //     const dest = `${RNFS.DocumentDirectoryPath}/TestImage.jpg`;
    //     Common.debug(RNFS.DocumentDirectoryPath)
    //     const progress = data => {
    //         const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
    //         const text = `Progress ${percentage}%`;
    //         Common.debug(text);
    //     };
    //     const begin = res => {
    //         Common.debug('begin');
    //     };
    //     const progressDivider = 1;
    //     const background = true;
    //     const ret = RNFS.downloadFile({fromUrl: link, toFile: dest, begin, progress, background, progressDivider});
    //     this.jobId = ret.jobId;
    //     ret.promise.then(res => {
    //         Common.debug(res, true)
    //         this.jobId = -1;
    //     }).catch(err => {
    //         Common.debug(err)
    //         this.jobId = -1;
    //     });
    // }
    ////////////////////////////////////////////////////////////////////////////////

    ////////////////////
    // RENDER
    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {isLoading, isShowConfirm, errorMessage, autoTrans, transTitle} = this.state;
        const {title, image_url} = item;
        return (
            <View style={s.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <TranslateHeader title={localize.media.title}
                                 skipAndroidStatusBar={false}
                                 translateEnabled={autoTrans}
                                 onPressTranslate={(enabled) => {
                                     if (enabled) {
                                         Translate(title, this.props.translateLanguage, (trans) => {
                                             Common.debug(trans)
                                             this.setState({
                                                 transTitle: trans
                                             })
                                         })
                                     } else {
                                         this.setState({
                                             transTitle: null
                                         })
                                     }

                                     this.setState({
                                         autoTrans: enabled
                                     })
                                 }}
                                 onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <ImageViewer imageUrls={[{url: image_url}]}
                             renderIndicator={(currentIndex, allSize) => <View/>}/>
                {/* Bottom */}
                <View>
                    {/* Border */}
                    <View style={s.layout_border}/>
                    {/* Title */}
                    <View style={s.layout_title}>
                        <BaseText style={FontStyle.CntTitleGrayDkLH}>Photo</BaseText>
                        <BaseText style={[FontStyle.Cnt13WhiteLN, {marginTop: Layout.UISize(5)}]}
                                  numberOfLines={3}>{transTitle ? transTitle : title}</BaseText>
                    </View>
                    {/* Border */}
                    <View style={s.layout_border}/>
                    {/* Button */}
                    <View style={s.layout_button_back}>
                        <TouchableOpacity style={s.layout_button}
                                          onPress={_ => this.onDownload(image_url)}>
                            <BaseText
                                style={[FontStyle.BtnWhiteCH, {marginRight: Layout.UISize(3)}]}>{localize.media.download}</BaseText>
                            <Icon.Download size={14} color={colors.white}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => this.setShowConfirm(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaImage);
