// MODULE
import React from "react";
import {
    View,
    Dimensions,
    PixelRatio, TouchableOpacity, StatusBar, Modal, Platform, ActivityIndicator
} from "react-native";

import Carousel from "react-native-snap-carousel";
import YouTube, {YouTubeStandaloneAndroid} from "react-native-youtube";

// LOCAL
import BaseScreen from "../../_base/BaseScreen";
import s from "../../_style/MediaViewer.style";
import Loader from "../../../component/loader/Loader";
import BaseText from "../../../component/_base/BaseText";
import Layout from "../../../util/Layout";
import Common from "../../../util/Common";
import {MEDIA_RESPONSE} from "../../../util/type/Media";
import FullWidthImage from "../../../component/image/FullWidthImage";
import VideoItem from "../../../component/item/VideoItem";
import {getYoutubeMeta} from "react-native-youtube-iframe";
import ImageViewer from "react-native-image-zoom-viewer";
import ImageZoom, {ImageZoomProps} from 'react-native-image-pan-zoom';
import BaseImage from "../../../component/_base/BaseImage";
import ZoomImage from "../../../component/image/ZoomImage";
import {YOUTUBE_KEY} from "../../../util/Constants";
import Orientation from "react-native-orientation-locker";
import BackHeader from "../../../component/header/BackHeader";
import localize from "../../../util/Localize";
import Icon from "../../../util/Icon";
import {colors} from "../../../util/Color";
import BaseStyle from "../../../util/style/Base.style";
import {navRef} from "../../../navigation/RootNavigation";
import Screen from "../../../util/type/Screen";
import {IMAGE_ICON_PLAY} from "../../../../assets";
//////////////////
// CLASS
class MediaViewer extends BaseScreen {
    //////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        let list = this.makeList();
        this.state = {
            isLoading: false,
            scrollEnabled: true,
            // select index
            selectIndex: props.route.params.selectIndex,
            list: list,
            //
            mediaMeta: null,
            screen_Width: Dimensions.get("window").width
        }

        this._carousel = null;
        this.refYoutube = null;
    }

    //////////////////
    // LIFECYCLE
    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    _onOrientationDidChange = (orientation) => {
        console.warn(orientation)
        this.setState({
            screen_Width: Dimensions.get("window").width
        })
    };

    //////////////////
    // FUNCTION
    setLoading = (load) => {
        this.setState({
            isLoading: load
        })
    }

    makeList = () => {
        let item = this.props.route.params.item;
        let makeList = [];
        console.warn(item);
        if (!Common.isEmpty(item.youtube_link)) {
            makeList.push(item.youtube_link);
        }
        return makeList.concat(item.medias);
    }

    setScrollEnabled = (enabled) => {
        this.setState({
            scrollEnabled: enabled
        })
    }
    //////////////////
    // RENDER
    getMediaMeta = async videoId => {
        let meta = await getYoutubeMeta(videoId);
        this.setMediaMeta(meta);
    }

    setMediaMeta = meta => this.setState({mediaMeta: meta})

    getYoutubeHeight = (width, height) => {
        return (Layout.DEVICE_WIDTH * height) / width;
    }

    getThumbnailUrlByMeta = meta => {
        if (!Common.isEmpty(meta) && !Common.isEmpty(meta.thumbnail_url)) {
            return meta.thumbnail_url;
        }
        return null;
    }

    renderMediaDetailVideoItem = (title, link) => {

        if (this.state.selectIndex !== 0) {
            return null;
        }

        let id = Common.getYoutubeId(link);
        if (Common.isEmpty(id)) return null;
        const {mediaMeta} = this.state;
        let height = Layout.DEVICE_HEIGHT;
        if (Common.isEmpty(mediaMeta)) this.getMediaMeta(id);
        if (Common.isEmpty(mediaMeta)) {
            this.getMediaMeta(id);
        } else {
            //height = this.getYoutubeHeight(mediaMeta.width, mediaMeta.height);
        }

        let d_height = Dimensions.get('window').width;
        height = PixelRatio.roundToNearestPixel(d_height / (16 / 9));

        console.warn(id, mediaMeta)

        if(Platform.OS == "android") {
            const image = this.getThumbnailUrlByMeta(mediaMeta);
            return (
                <TouchableOpacity
                    style={[s.youtube, {height: height}]}
                    onPress={()=>{
                        navRef.current.navigate(Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE, {item:  {
                                title: title,
                                video_link_url: link,
                                autoPlay: true,
                                fullscreen: true,
                            }})
                    }}
                >
                    {/* Image */}
                    {!Common.isEmpty(image) &&
                    <BaseImage style={s.image_thumb} source={{uri: image}}/>}
                    {/* Icon */}
                    {!Common.isEmpty(link) &&
                    <View style={s.layout_icon}>
                        {/*<TouchableOpacity onPress={this.standAlone}>*/}
                        <BaseImage style={s.image_icon} source={IMAGE_ICON_PLAY}/>
                    </View>}
                </TouchableOpacity>
            )
        }else{
            return <YouTube
                key={Math.random()}
                ref={this.refYoutube}
                style={[s.youtube, {height: height}]}
                apiKey={YOUTUBE_KEY}
                resumePlayAndroid={false}
                play={false}
                videoId={id}
                showFullscreenButton={Platform.OS == "android" ? false:true}
                // onChangeFullscreen={e => {
                //     //Layout.ChangeOperationLock(!e.isFullscreen);
                //     if(e.isFullscreen){
                //         YouTubeStandaloneAndroid.playVideo({
                //             apiKey:YOUTUBE_KEY,
                //             autoplay:true,
                //             videoId: id
                //         }).then(()=>{
                //
                //         })
                //     }
                // }}
            />;
        }
    }
    renderItem = ({item, index}) => {
        switch (item.media_type) {
            case MEDIA_RESPONSE.VIDEO_YOUTUBE:
                if(index==this.state.selectIndex) {
                    return (
                        <View style={s.item_layout}>
                            {this.renderMediaDetailVideoItem(item.title, item.video_link_url)}
                        </View>
                    )
                }else{
                    return(
                        <View style={s.item_layout}>
                            <ActivityIndicator size={"large"} color={colors.white} />
                        </View>
                    )
                }

            case MEDIA_RESPONSE.IMAGE_DEFAULT:
                return <ZoomImage
                    //width={this.state.screen_Width}
                    source={{uri: item.image_url}}
                    onScaleChange={(scale) => this.setScrollEnabled(scale === 1)}
                />
        }
    }

    render() {
        const {isLoading, scrollEnabled, list, selectIndex, screen_Width} = this.state;
        if(Platform.OS == "android") {
            return (
                    <View style={s.container}>
                        <Loader isLoading={isLoading}/>
                        <StatusBar barStyle="light-content"
                                   backgroundColor={colors.black}
                                   translucent={false}
                                   hidden={true}/>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={list}
                            firstItem={selectIndex}
                            scrollEnabled={scrollEnabled}
                            renderItem={this.renderItem}
                            sliderWidth={screen_Width}
                            itemWidth={screen_Width}
                            onSnapToItem={(index) => {
                                this.setState({
                                    selectIndex: index
                                })
                            }}
                        />
                        <TouchableOpacity
                            style={[BaseStyle.header, {
                                zIndex: 100000,
                                position: 'absolute',
                                top: Layout.getStatusBarHeight(true,false),
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                paddingLeft: Layout.UISize(20)
                            }]}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                        >
                            <Icon.Close color={colors.white} size={Layout.UISize(20)}/>
                        </TouchableOpacity>
                    </View>
            )
        }else{
            return (
                <Modal
                    visible={true}
                    presentationStyle={"fullScreen"}
                    supportedOrientations={['portrait', 'landscape']}
                    onOrientationChange={(event)=>{
                        console.warn(event.nativeEvent)
                    }}
                >
                    <View style={s.container}>
                        <Loader isLoading={isLoading}/>
                        <StatusBar barStyle="light-content"
                                   backgroundColor={colors.black}
                                   translucent={false}
                                   hidden={true}/>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={list}
                            firstItem={selectIndex}
                            scrollEnabled={scrollEnabled}
                            renderItem={this.renderItem}
                            sliderWidth={screen_Width}
                            itemWidth={screen_Width}
                            onSnapToItem={(index) => {
                                this.setState({
                                    selectIndex: index
                                })
                            }}
                        />
                        <TouchableOpacity
                            style={[BaseStyle.header, {
                                zIndex: 100000,
                                position: 'absolute',
                                top: Layout.getStatusBarHeight(true,false),
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                paddingLeft: Layout.UISize(20)
                            }]}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                        >
                            <Icon.Close color={colors.white} size={Layout.UISize(20)}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )
        }

    }
}

///////////////////////
// EXPORT
export default MediaViewer;
