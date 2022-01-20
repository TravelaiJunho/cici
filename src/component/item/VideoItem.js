////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import {YouTubeStandaloneAndroid, YouTubeStandaloneIOS} from "react-native-youtube";
////////////////////
// Local
import s from './_style/VideoItem.style';
import {YOUTUBE_KEY} from "../../util/Constants";
import {IMAGE_ICON_PLAY} from "../../../assets";
import Screen from "../../util/type/Screen";
import {navRef} from "../../navigation/RootNavigation";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseImage from "../_base/BaseImage";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class VideoItem extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            // height: 0,
            videoPlay: false,
        };
    }

    ////////////////////
    // FUNCTION
    // getMeta = _ => {
    //     if (Common.checkAndroid()) {
    //         getYoutubeMeta(this.props.videoId)
    //             .then(meta => {
    //                 if (!Common.isEmpty(meta.thumbnail_url)) this.setThumbnail(meta.thumbnail_url);
    //                 // if (!Common.isEmpty(meta.width) && !Common.isEmpty(meta.height)) {
    //                 //     this.setHeight(meta.width, meta.height)
    //                 // }
    //             })
    //             .catch(reason => Common.debug(reason));
    //     }
    // }

    // setHeight = (width, height) => this.setState({height: Layout.DEVICE_WIDTH * height / width});

    standAlone = _ => {
        const {videoId} = this.props;
        if (Common.checkIOS()) {
            YouTubeStandaloneIOS
                .playVideo(videoId)
                .then(message => Common.debug(message))
                .catch(errorMessage => Common.debug(errorMessage));
        } else {
            YouTubeStandaloneAndroid
                .playVideo({
                    apiKey: YOUTUBE_KEY,
                    videoId: videoId,
                })
                .then(_ => Common.debug('play'))
                .catch(errorMessage => Common.debug(errorMessage));
        }
    }

    getThumbnailUrlByMeta = meta => {
        if (!Common.isEmpty(meta) && !Common.isEmpty(meta.thumbnail_url)) {
            return meta.thumbnail_url;
        }
        return null;
    }

    getTitleByMeta = meta => {
        if (!Common.isEmpty(meta) && !Common.isEmpty(meta.title)) {
            return meta.title;
        }
        return '';
    }

    createItem = (title, link) => {
        return {
            title: title,
            video_link_url: link,
            autoPlay: true,
        }
    }

    onShowMedia = (title, link) => {
        this.props.onShowMedia &&
            this.props.onShowMedia(this.createItem(title, link));

        // enableShowDetail props 이 false일땐 Video Detail 을 호출하지 않는다.
        this.props.enableShowDetail &&
            navRef.current.navigate(Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE, {item: this.createItem(title, link)})
    }

    ////////////////////
    // RENDER
    /*
    renderPlayNative = _ => {
        const {videoId} = this.props;
        const {videoPlay} = this.state;
        return (
            <InViewPort onChange={visible => this.setState({videoPlay: visible})}>
                <YouTube style={{width: '100%', height: '100%', backgroundColor: colors.black}}
                    // onReady={(e) => console.log('onReady')}
                    // onChangeState={(e) => console.log('onChangeState:', e.state)}
                    // onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
                    // onError={(e) => console.log('onError: ', e.error)}
                    // apiKey={YOUTUBE_KEY}
                    // resumePlayAndroid={false}
                    // origin={"https://www.youtube.com"}
                         videoId={videoId}
                         play={videoPlay}/>
            </InViewPort>);
    }

    renderPlayIframe = _ => {
        const {videoId} = this.props;
        const {height, videoPlay} = this.state;
        return (
            <View style={s.iframe_container}>
                <InViewPort onChange={visible => this.setState({videoPlay: visible})}>
                    <YoutubePlayer width={Layout.DEVICE_WIDTH}
                                   height={height}
                                   controls={1}
                        // onChangeState={(state) => console.log("RENDER VİDEO : ", state)}
                                   videoId={videoId}
                                   play={videoPlay}/>
                </InViewPort>
            </View>);
    }
    */

    renderThumbnail = _ => {
        const {meta, link} = this.props;
        const image = this.getThumbnailUrlByMeta(meta);
        const title = this.getTitleByMeta(meta);
        return (
            <View style={s.container}>
                {/* Image */}
                {!Common.isEmpty(image) &&
                <BaseImage style={s.image_thumb} source={{uri: image}}/>}
                {/* Icon */}
                {!Common.isEmpty(link) &&
                <View style={s.layout_icon}>
                    <TouchableOpacity onPress={_ => this.onShowMedia(title, link)}>
                        {/*<TouchableOpacity onPress={this.standAlone}>*/}
                        <BaseImage style={s.image_icon} source={IMAGE_ICON_PLAY}/>
                    </TouchableOpacity>
                </View>}
            </View>);
    }

    render() {
        // return Common.checkAndroid() ? this.renderPlayIframe() : this.renderPlayNative();
        return this.renderThumbnail();
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

VideoItem.defaultProps = {
    videoId: '',
    link: '',
    meta: null,
    onShowMedia: null,
    enableShowDetail: true,
};

VideoItem.propTypes = {
    videoId: PropTypes.string,
    link: PropTypes.string,
    meta: PropTypes.any,
    onShowMedia: PropTypes.func,
    enableShowDetail: PropTypes.bool
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default VideoItem;
