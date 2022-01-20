////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, Share, TouchableOpacity, View} from "react-native";
import RNFS from "react-native-fs";
import Video from "react-native-video";
import CameraRoll from "@react-native-community/cameraroll";
import {getYoutubeMeta} from "react-native-youtube-iframe";
import Slider from "react-native-slider";
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import BaseStyle from "../../../util/style/Base.style";
import s from "../../_style/HomeDetail.style"
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import {MEDIA_RESPONSE} from "../../../util/type/Media";
import Icon from "../../../util/Icon";
import {BOARD} from "../../../util/type/Board";
import {requestStoragePermission} from "../../../util/Permission";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import BaseText from "../../../component/_base/BaseText";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import BaseImage from "../../../component/_base/BaseImage";
import VideoItem from "../../../component/item/VideoItem";
import TalkTalkItem from "../../../component/item/TabTalkTalkItem";
import FromDanielItem from "../../../component/item/TabFromDanielItem";
import ToDanielItem from "../../../component/item/TabToDanielItem";
import TabTalkItem from "../../../component/item/TabTalkItem";
// Asset
import {IMAGE_YOUTUBE} from "../../../../assets";
// API
import {detailForTalkTalk} from "../../../data/http/TabTalkTalk";
import {detailForFromDaniel} from "../../../data/http/TabFromDaniel";
import {detailForToDaniel} from "../../../data/http/TabToDaniel";
import {detailForTalk} from "../../../data/http/TabTalk";
import {detailMediaForNotice} from "../../../data/http/TabMediaForNotice";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostDetail extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.item = this.props.route.params.item;
        this.player = null;
        this.slideMoveValue = 0;
        // State
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            //
            medias: [],
            metadata: null,
            isShowSaveImageButton: false,
            scrollEnabled: false,
            //
            fullScreen: false,
            //
            slideMax: 0,
            slideCurrent: 0,
            play: false,
            // Data
            title: this.getTitle(this.item),
            detailItem: null,
            renderItem: null,
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.initData();
        // this.props.navigation.dangerouslyGetParent().setOptions({
        //     tabBarVisible: false
        // });
    }

    ////////////////////
    // FUNCTION
    setShowLoading = isShow => {
        if (this.state.isLoading !== isShow) {
            this.setState({isLoading: isShow});
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

    getTitle = item => {
        switch (item.board_type) {
            // Community
            case BOARD.COMMUNITY_TALK_TALK:
                return 'Talk Talk';
            case BOARD.COMMUNITY_FROM_DANIEL:
                return 'From Daniel';
            case BOARD.COMMUNITY_TO_DANIEL:
                return 'To Daniel';
            // MemberShip
            case BOARD.MEMBERSHIP_TALK:
                return 'Talk';
            // Media
            case BOARD.NOTICE_MEDIA:
                return 'Media';
        }
    }

    setData = (detail = null, render = null) => {
        this.setState({
            detailItem: Common.isEmpty(detail) ? null : detail,
            renderItem: Common.isEmpty(detail) ? null : render,
        });
    }

    initData = _ => {
        const {board_type, id} = this.item;
        switch (board_type) {
            // Community
            case BOARD.COMMUNITY_TALK_TALK: {
                detailForTalkTalk(id, (success, code, message, data) => {
                    this.setShowLoading(false);
                    this.setData(data, this.renderTalkTalk);
                });
                break;
            }
            case BOARD.COMMUNITY_FROM_DANIEL: {
                detailForFromDaniel(id, (success, code, message, data) => {
                    this.setShowLoading(false);
                    this.setData(data, this.renderFromDaniel);
                });
                break;
            }
            case BOARD.COMMUNITY_TO_DANIEL: {
                detailForToDaniel(id, (success, code, message, data) => {
                    this.setShowLoading(false);
                    this.setData(data, this.renderToDaniel);
                });
                break;
            }
            // MemberShip
            case BOARD.MEMBERSHIP_TALK: {
                detailForTalk(id, (success, code, message, data) => {
                    this.setShowLoading(false);
                    this.setData(data, this.renderTalk);
                });
                break;
            }
            // Media
            case BOARD.NOTICE_MEDIA: {
                detailMediaForNotice(id, (success, code, message, data) => {
                    this.setShowLoading(false);
                    if (success) {
                        // Image
                        let saveImage = false;
                        let scrollEnabled = false;
                        switch (data.media_type) {
                            case MEDIA_RESPONSE.IMAGE_DEFAULT: {
                                saveImage = true;
                                scrollEnabled = true;
                                break;
                            }
                        }
                        this.setState({
                            isShowSaveImageButton: saveImage,
                            scrollEnabled: scrollEnabled
                        })
                        // Data
                        this.setData(data, this.renderMedia);
                    }
                });
                break;
            }
            default: {
                this.setShowLoading(false);
            }
        }
    }

    getErrorMessage = (code = 0) => {
        switch (code) {
            default:
                return localize.error.failed;
        }
    }

    fmtMSS = (s) => {
        let time = Math.round(s);
        let minus = false;
        if (time < 0) {
            minus = true;
            time = -time;
        }
        let result = (time - (time %= 60)) / 60 + (9 < time ? ':' : ':0') + time;
        if (minus) {
            result = '-' + result;
        }
        return result;
    }

    // Media
    getMediaMeta = async videoId => {
        let meta = await getYoutubeMeta(videoId);
        this.setMediaMeta(meta);
    }

    setMediaMeta = meta => this.setState({mediaMeta: meta})

    getMediaItem = item => {
        if (Common.isEmpty(item)) return null;
        switch (item.media_type) {
            case MEDIA_RESPONSE.VIDEO_YOUTUBE:
                return this.getMediaVideoItem(item.video_link_url);
            case MEDIA_RESPONSE.IMAGE_DEFAULT:
                return this.getMediaImageItem(item.image_url);
            case MEDIA_RESPONSE.VIDEO_FILE:
                return this.getMediaVideoFile(item);
            case MEDIA_RESPONSE.AUDIO_FILE:
                return this.getMediaAudioFile(item);
        }
        return null;
    }

    // Download
    successImageToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.success.file.save_image);
    }

    failImageToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.error.file.save_image);
    }

    successFileToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.success.file.save_file);
    }

    successFileToDownloadFolder = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.success.file.save_download_folder);
    }

    failFileToSave = _ => {
        this.setShowLoading(false);
        this.setShowConfirm(true, localize.error.file.save_file);
    }

    saveImageFile = dest => {
        CameraRoll.save("file://" + dest)
            .then(result => this.successImageToSave())
            .catch(error => this.failImageToSave());
    }

    shareFile = dest => {
        Share.share({url: "file://" + dest})
            .then(value => this.setShowLoading(false))
            .catch(reason => this.failToSave());
    }

    download = async (url, image = false) => {
        let granted = await requestStoragePermission();
        if (granted) {
            const path = Common.checkIOS() ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
            const dest = `${path}/${Common.getFileNameFromUrl(url)}`;
            RNFS.downloadFile({fromUrl: url, toFile: dest})
                .promise
                .then(res => {
                    if (res && res.statusCode === 200) {
                        if (image) {
                            this.saveImageFile(dest);
                        } else {
                            if (Common.checkAndroid()) {
                                this.successFileToDownloadFolder();
                            } else {
                                this.shareFile(dest);
                            }
                        }
                    } else {
                        if (image) {
                            this.failImageToSave();
                        } else {
                            this.failFileToSave();
                        }
                    }
                })
                .catch(error => {
                    if (image) {
                        this.failImageToSave();
                    } else {
                        this.failFileToSave();
                    }
                });

            // let filename = Common.getFileNameFromUrl(url);
            // const downloadDest = `${image ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath}/${filename}`;
            // const ret = RNFS.downloadFile({fromUrl: url, toFile: downloadDest});
            // ret.promise.then(res => {
            //     if (res && res.statusCode === 200) {
            //         if (image) {
            //             let promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
            //             promise.then((result) => {
            //                 this.setShowConfirm(true, localize.success.file.save_image, null);
            //                 this.setShowLoading(false);
            //             }).catch((error) => {
            //                 this.setShowConfirm(true, localize.error.file.save_image, null);
            //                 this.setShowLoading(false);
            //             })
            //         } else {
            //             this.setShowConfirm(true, localize.success.file.save_file, null);
            //             this.setShowLoading(false);
            //         }
            //     }
            // }).catch((error) => {
            //     this.setShowConfirm(true, localize.error.file.save_file, null);
            //     this.setShowLoading(false);
            // });
        }
    }

    // Event
    onDownload = _ => {
        this.setShowLoading(true);
        let image = false;
        let url = '';
        const {detailItem} = this.state;
        switch (detailItem.media_type) {
            case MEDIA_RESPONSE.IMAGE_DEFAULT: {
                image = true;
                url = detailItem.image_url;
                break;
            }
            case MEDIA_RESPONSE.AUDIO_FILE: {
                url = detailItem.audio;
                break;
            }
        }
        if (detailItem.media_type === MEDIA_RESPONSE.IMAGE_DEFAULT) {
            image = true;
        }
        this.download(url, image).then(r => {
        });
    }

    ////////////////////
    // RENDER
    getMediaVideoItem = link => {
        let id = Common.getYoutubeId(link);
        if (Common.isEmpty(id)) return null;
        const {mediaMeta} = this.state;
        if (Common.isEmpty(mediaMeta)) this.getMediaMeta(id);
        const {detailItem} = this.state;
        return (
            <View style={s.videoitem}>
                <VideoItem videoId={id}
                           link={link}
                           meta={mediaMeta}/>
                <BaseImage style={s.youtube}
                           source={IMAGE_YOUTUBE}/>
                <View style={s.media}>
                    <BaseText style={FontStyle.Cnt13WhiteLN}>{detailItem.title}</BaseText>
                </View>
            </View>)
    }

    getMediaImageItem = url => {
        if (Common.isEmpty(url)) return null;
        const {detailItem} = this.state;
        return (
            <View>
                <BaseImage style={[s.image_media, {height: Layout.relativeHeight(65)}]} source={{uri: url}}/>
                <BaseText style={[FontStyle.CntTitleGrayDkLH, {
                    marginLeft: Layout.UISize(18),
                    marginTop: Layout.UISize(13)
                }]}>Photo</BaseText>
                <View style={s.media}>
                    <BaseText style={FontStyle.Cnt13WhiteLN}>{detailItem.title}</BaseText>
                </View>
            </View>)
    }

    getMediaAudioFile = item => {
        if (Common.isEmpty(item)) return null;
        const {
            detailItem,
            play,
            slideCurrent, slideMax,
        } = this.state;
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    width: Layout.UISize(220),
                    height: Layout.UISize(220),
                    borderRadius: Layout.UISize(110),
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowOffset: {
                        width: 0,
                        height: 5
                    },
                    shadowRadius: Layout.UISize(20),
                    shadowOpacity: 1,
                    borderStyle: "solid",
                    borderWidth: 4,
                    borderColor: colors.orange,
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginTop: Layout.UISize(40),
                    marginBottom: Layout.UISize(40),
                }}>
                    <View style={{
                        width: Layout.UISize(202),
                        height: Layout.UISize(202),
                        borderRadius: Layout.UISize(101),
                        backgroundColor: colors.navyLight,
                        overflow: 'hidden',
                    }}>
                        <BaseImage style={{width: '100%', height: '100%'}} source={{uri: item.image_url}}/>
                    </View>
                </View>
                <BaseText style={[FontStyle.CntTitleGrayDkLH]}>Voice</BaseText>
                <View style={s.media}>
                    <BaseText style={FontStyle.Cnt13WhiteLN}>{detailItem.title}</BaseText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Layout.UISize(40),
                    marginBottom: Layout.UISize(40),
                }}>
                    <TouchableOpacity
                        style={{
                            width: Layout.UISize(30),
                            height: Layout.UISize(30),
                            backgroundColor: colors.navyLight,
                        }}
                        onPress={() => {
                            let current = slideCurrent - 5;
                            if (current < 0) current = 0
                            if (this.player) this.player.seek(current)
                        }}/>
                    <TouchableOpacity
                        style={{
                            marginLeft: Layout.UISize(60),
                            marginRight: Layout.UISize(60),
                            width: Layout.UISize(30),
                            height: Layout.UISize(30),
                            backgroundColor: colors.navyLight,
                        }}
                        onPress={() => {
                            if (play === false) {
                                // console.warn(this.state.slideMax, this.state.slideCurrent)
                                if (slideMax <= slideCurrent) {
                                    if (this.player) this.player.seek(0)
                                }
                            }
                            this.setState({play: !play});
                        }}/>
                    <TouchableOpacity
                        style={{
                            width: Layout.UISize(30),
                            height: Layout.UISize(30),
                            backgroundColor: colors.navyLight,
                        }}
                        onPress={() => {
                            let current = slideCurrent + 5;
                            if (current > slideMax) current = slideMax
                            if (this.player) this.player.seek(current)
                        }}/>
                </View>
                <Video ref={r => this.player = r}
                       controls={true}
                       paused={!play}
                       source={{uri: item.audio}}
                    //style={this.state.fullScreen ? s.videofull : s.videofile}
                       audioOnly={true}
                       repeat={false}
                       onEnd={result => {
                           // console.warn('END', result)
                           this.setState({
                               slideCurrent: slideMax,
                               play: false,
                           })
                       }}
                       onLoad={result => {
                           this.setState({slideMax: result.duration})
                       }}
                       onProgress={result => {
                           this.setState({slideCurrent: result.currentTime})
                       }}/>
                <Slider step={1}
                        style={{
                            width: Layout.UISize(335),
                            height: Layout.UISize(10),
                        }}
                        thumbTintColor={colors.orange}
                        minimumTrackTintColor={colors.orange}
                        maximumTrackTintColor={colors.white}
                        thumbStyle={{
                            width: 7,
                            height: 7,
                            borderRadius: 3.5
                        }}
                        trackStyle={{height: 3, borderRadius: 1}}
                        minimumValue={0}
                        maximumValue={slideMax}
                        value={slideCurrent}
                        onValueChange={result => {
                            // console.warn(result)
                            this.slideMoveValue = result;
                        }}
                        onSlidingComplete={result => {
                            // console.warn(result)
                            this.setState({
                                slideCurrent: result
                            }, () => {
                                if (this.player) this.player.seek(result)
                            })
                        }}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: Layout.UISize(335),
                    paddingTop: Layout.UISize(10),
                }}>
                    <BaseText style={FontStyle.SubCntGrayLN}>{this.fmtMSS(slideMax)}</BaseText>
                    <BaseText style={FontStyle.SubCntGrayLN}>{this.fmtMSS(slideCurrent - slideMax)}</BaseText>
                </View>
            </View>)
    }

    getMediaVideoFile = item => {
        if (Common.isEmpty(item.videos)) return null;
        const {detailItem, fullScreen} = this.state;
        return (
            <View>
                <Video ref={r => this.player = r}
                       controls={true}
                       fullscreen={true}
                       paused={true}
                       source={{uri: item.videos[item.videos.length - 1].url}}
                       style={fullScreen ? s.videofull : s.videofile}
                       resizeMode={'cover'}
                       poster={item.image_url}
                       posterResizeMode={'cover'}/>
                <BaseText style={[FontStyle.CntTitleGrayDkLH, {
                    marginLeft: Layout.UISize(18),
                    marginTop: Layout.UISize(13)
                }]}>Video</BaseText>
                <View style={s.media}>
                    <BaseText style={FontStyle.Cnt13WhiteLN}>{detailItem.title}</BaseText>
                </View>
            </View>)
    }

    renderTalkTalk = _ => <TalkTalkItem item={this.state.detailItem}/>

    renderFromDaniel = _ => <FromDanielItem item={this.state.detailItem}/>

    renderToDaniel = _ => <ToDanielItem item={this.state.detailItem}/>

    renderTalk = _ => <TabTalkItem item={this.state.detailItem}/>

    renderMedia = _ => <View>{this.getMediaItem(this.state.detailItem)}</View>

    renderContent = _ => {
        const {detailItem} = this.state;
        if (Common.isEmpty(detailItem)) return null;
        const {renderItem} = this.state;
        return Common.isEmpty(renderItem) ? null : renderItem();
    }

    renderButton = _ => {
        const {isShowSaveImageButton} = this.state;
        if (!isShowSaveImageButton) return null;
        return (
            <View style={s.buttonContainer}>
                <TouchableOpacity style={s.button}
                                  onPress={this.onDownload}>
                    <BaseText style={FontStyle.BtnWhiteCH}>Download</BaseText>
                    <View style={{marginBottom: Layout.UISize(2), marginLeft: Layout.UISize(2),}}>
                        <Icon.Download size={Layout.UISize(14)} color={colors.white}/>
                    </View>
                </TouchableOpacity>
            </View>);
    }

    render() {
        const {
            isLoading,
            isShowConfirm, errorMessage, callback,
            scrollEnabled,
            title, detailItem,
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* List */}
                {detailItem &&
                <FlatList scrollEnabled={scrollEnabled}
                          data={[detailItem]}
                          renderItem={({item, index}) => {
                              return this.renderContent()
                          }}/>}
                {/* Button */}
                {this.renderButton()}

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

export default PostDetail;