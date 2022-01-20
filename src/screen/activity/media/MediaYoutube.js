////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Platform, View} from "react-native";
import YouTube from "react-native-youtube";
import {getYoutubeMeta} from "react-native-youtube-iframe";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/MediaYoutube.style';
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import {YOUTUBE_KEY} from "../../../util/Constants";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import BaseImage from "../../../component/_base/BaseImage";
// Asset
import {IMAGE_YOUTUBE} from "../../../../assets";
import {connect} from "react-redux";
import {Translate} from "../../../data/http/Translate";
import TranslateHeader from "../../../component/header/TranslateHeader";
import Orientation from "react-native-orientation-locker";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaYoutube extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowYoutube: false,
            mediaMeta: null,
            // translate
            autoTrans:false,
            transTitle: null,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        // Delay
        setTimeout(_ => this.setShowYoutube(true), 500);
        //Orientation.unlockAllOrientations()
        Platform.OS == "android" && Layout.ChangeOperationLock(false)
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        //Orientation.lockToPortrait()
        Platform.OS == "android" && Layout.ChangeOperationLock(true)
    }

    ////////////////////
    // FUNCTION
    setShowYoutube = isShow => {
        this.setState({isShowYoutube: isShow})
    }

    setMediaMeta = meta => this.setState({mediaMeta: meta})

    getMediaMeta = async videoId => {
        let meta = await getYoutubeMeta(videoId);
        this.setMediaMeta(meta);
    }

    getYoutubeHeight = (width, height) => {
        return (Layout.DEVICE_WIDTH * height) / width;
    }

    ////////////////////
    // RENDER
    renderYoutube = (link, autoPlay, fullscreen = false) => {
        // Id
        const id = Common.getYoutubeId(link);
        // Height
        const {mediaMeta} = this.state;
        let height = 0;
        if (Common.isEmpty(mediaMeta)) {
            this.getMediaMeta(id);
        } else {
            height = this.getYoutubeHeight(mediaMeta.width, mediaMeta.height);
        }
        return <YouTube style={[s.youtube, {height: height}]}
                        apiKey={YOUTUBE_KEY}
                        resumePlayAndroid={false}
                        fullscreen={fullscreen}
                        play={Common.isEmpty(autoPlay) ? false : autoPlay}
                        videoId={id}
                        onChangeFullscreen={e => {
                            //Layout.ChangeOperationLock(!e.isFullscreen);
                            if(fullscreen) {
                                if(!e.isFullscreen){
                                    // close
                                    this.props.navigation.pop()
                                }
                            }

                        }}
        />;
        // return (Common.checkIOS()
        //     ? <YoutubePlayer width={Layout.DEVICE_WIDTH}
        //                      height={height}
        //                      videoId={id}/>
        //     : <YouTube style={[s.youtube, {height: height}]}
        //                apiKey={YOUTUBE_KEY}
        //                resumePlayAndroid={false}
        //                videoId={id}/>);
    }

    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {isShowYoutube, autoTrans, transTitle} = this.state;
        const {title, video_link_url, autoPlay, fullscreen} = item;
        let fullScreen = false;
        if(!Common.isEmpty(fullscreen)) {
            fullScreen = true;
        }
        return (
            <View style={s.container}>
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
                <View style={s.layout_youtube}>
                    {isShowYoutube && this.renderYoutube(video_link_url, autoPlay, fullscreen )}
                </View>
                {/* Bottom */}
                <View style={s.layout_title}>
                    <BaseImage style={s.image_youtube}
                               source={IMAGE_YOUTUBE}/>
                    <BaseText style={[FontStyle.Cnt13WhiteLN, {marginTop: Layout.UISize(20)}]}
                              numberOfLines={5}>{transTitle ? transTitle : title}</BaseText>
                </View>
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
    return {
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(MediaYoutube);
