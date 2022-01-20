////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Share, ScrollView, TouchableOpacity, View} from "react-native";
import {Slider} from 'react-native-elements'
import RNFS from "react-native-fs";
import Video from "react-native-video";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/MediaAudio.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import Icon from "../../../util/Icon";
import {THUMBNAIL_LEVEL} from "../../../util/Constants";
import {requestStoragePermission} from "../../../util/Permission";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import Loader from "../../../component/loader/Loader";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import CircleBorderImage from "../../../component/image/CircleBorderImage";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import AudioTitlePopup from "../../../component/popup/AudioTitlePopup";
import {connect} from "react-redux";
import TranslateHeader from "../../../component/header/TranslateHeader";
import {Translate} from "../../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaAudio extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            isShowTitlePopup: false,
            // Audio
            isPause: true,
            isSliding: false,
            totalValue: 0,
            currentValue: 0,
            // translate
            autoTrans: false,
            transTitle: null,
        }
    }

    ////////////////////
    // FUNCTION
    setPause = pause => this.setState({isPause: pause});
    setSliding = slide => this.setState({isSliding: slide});
    setTotalValue = value => this.setState({totalValue: value});
    setCurrentValue = value => this.setState({currentValue: value});
    setSeekValue = value => this.setState({currentValue: value}, _ => this.player.seek(value));

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

    setShowTitlePopup = isShow => {
        if (this.state.isShowTitlePopup !== isShow) {
            this.setState({isShowTitlePopup: isShow});
        }
    }

    getImageUrl = item => {
        const {thumbnails, image_url} = item;
        if (Common.checkListSize(thumbnails)) {
            return thumbnails[THUMBNAIL_LEVEL.AUDIO].image_url;
        }
        return image_url;
    }

    // Time
    getPlayTime = time => {
        return Common.secondToTime(time);
    }

    getRemainTime = (total, time) => {
        let t = total - time;
        return '-' + Common.secondToTime(t > 0 ? t : total);
    }

    // Download
    successToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.success.file.save_file);
    }

    successToDownloadFolder = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.success.file.save_download_folder);
    }

    failToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.error.file.save_file);
    }

    share = dest => {
        Share.share({url: "file://" + dest})
            .then(value => this.setShowLoading(false))
            .catch(reason => this.failToSave());
    }

    downloadFile = url => {
        this.setShowLoading(true);
        const path = Common.checkIOS() ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
        const dest = `${path}/${Common.getFileNameFromUrl(url)}`;
        RNFS.downloadFile({fromUrl: url, toFile: dest})
            .promise
            .then(res => {
                if (res && res.statusCode === 200) {
                    if (Common.checkAndroid()) {
                        this.successToDownloadFolder();
                    } else {
                        this.share(dest);
                    }
                } else {
                    this.failToSave();
                }
            })
            .catch(error => this.failToSave());
    }

    // Event
    onPlay = _ => this.setPause(false);
    onPause = _ => this.setPause(true);
    onEnd = _ => {
        this.onPause();
        this.setSeekValue(0);
    }

    onDownload = async url => {
        let granted = await requestStoragePermission();
        if (granted) {
            if (!Common.isEmpty(url)) this.downloadFile(url);
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {
            isLoading, isShowConfirm, errorMessage, isShowTitlePopup,
            isPause, isSliding, totalValue, currentValue, autoTrans, transTitle,
        } = this.state;
        const {title, audio} = item;
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
                {/* Voice */}
                <Video ref={ref => this.player = ref}
                       source={{uri: audio}}
                       audioOnly={true}
                       playInBackground={false}
                       muted={isSliding ? true : isPause}
                       paused={isSliding ? true : isPause}
                       onLoad={({duration}) => this.setTotalValue(duration)}
                       onProgress={({currentTime}) => this.setCurrentValue(currentTime)}
                       onEnd={this.onEnd}/>
                {/* Contents */}
                <ScrollView style={{flex: 1}}>
                    <View style={s.layout_contents}>
                        {/* Image */}
                        <CircleBorderImage source={this.getImageUrl(item)}
                                           size={174}
                                           borderWidth={4}
                                           isUseGradient={false}/>
                        {/* Voice */}
                        <BaseText style={[FontStyle.CntTitleGrayDkLH, {marginTop: Layout.UISize(40)}]}>Voice</BaseText>
                        {/* Title */}
                        <TouchableOpacity style={s.layout_title}
                                          onPress={_ => this.setShowTitlePopup(true)}>
                            <BaseText style={[FontStyle.CntTitleWhiteCH, {textAlign: 'left'}]}
                                      numberOfLines={3}>{transTitle ? transTitle : title}</BaseText>
                            <Icon.SignRight size={16} color={colors.white}/>
                        </TouchableOpacity>
                        {/* Button */}
                        <View style={s.layout_play}>
                            {/* Play/Pause */}
                            {isPause
                                ? <TouchableOpacity onPress={this.onPlay}>
                                    <Icon.PlayOn size={30} color={colors.white}/>
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={this.onPause}>
                                    <Icon.PlayPause size={30} color={colors.white}/>
                                </TouchableOpacity>}
                        </View>
                        {/* Slider */}
                        <View style={s.layout_slider}>
                            <Slider style={s.slider}
                                    trackStyle={s.slider_track}
                                    thumbStyle={s.slider_thumb}
                                    minimumTrackTintColor={colors.orange}
                                    maximumTrackTintColor={colors.white}
                                    allowTouchTrack={true}
                                    maximumValue={totalValue}
                                    value={currentValue}
                                // step={1}
                                    onSlidingStart={value => this.setSliding(true)}
                                    onSlidingComplete={value => {
                                        this.setSliding(false);
                                        this.setSeekValue(value);
                                    }}/>
                        </View>
                        {/* Time */}
                        <View style={s.layout_time}>
                            <BaseText style={FontStyle.SubCntGrayLN}>{this.getPlayTime(currentValue)}</BaseText>
                            <BaseText
                                style={FontStyle.SubCntGrayLN}>{this.getRemainTime(totalValue, currentValue)}</BaseText>
                        </View>
                    </View>
                </ScrollView>
                {/* Bottom */}
                <View>
                    {/* Border */}
                    <View style={s.layout_border}/>
                    {/* Button */}
                    <View style={s.layout_button_back}>
                        <TouchableOpacity style={s.layout_button}
                                          onPress={_ => this.onDownload(audio)}>
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

                <AudioTitlePopup isVisible={isShowTitlePopup}
                                 title={title}
                                 onBackPress={_ => this.setShowTitlePopup(false)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaAudio);
