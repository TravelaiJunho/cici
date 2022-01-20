////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {connect} from "react-redux";
import {SceneMap, TabView} from 'react-native-tab-view';
import {getYoutubeMeta} from "react-native-youtube-iframe";
import Clipboard from "@react-native-clipboard/clipboard";
////////////////////
// Local
import {navRef} from '../../navigation/RootNavigation';
import FontStyle from "../../util/style/Font.style";
import s from './_style/FeedItem.style';
import Icon from "../../util/Icon";
import {colors} from "../../util/Color";
import localize from "../../util/Localize";
import Screen from "../../util/type/Screen";
import {MEDIA_RESPONSE} from '../../util/type/Media';
import {FEED_CONTENTS_LINE, THIRD_DEV, THUMBNAIL_LEVEL} from "../../util/Constants";
import Layout from "../../util/Layout";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import AttributeText from "../text/AttributeText";
import BaseImage from "../_base/BaseImage";
import CircleBorderImage from "../image/CircleBorderImage";
import FullWidthImage from "../image/FullWidthImage";
import ViewMoreText from "../_common/ViewMoreText";
import DotIndicator from "../indicator/DotIndicator";
import VideoItem from "./VideoItem";
import PostDeclare from "../bottom_sheet/PostDeclare";
import PostManage from "../bottom_sheet/PostManage";
import BottomDeclare from "../bottom_sheet/BottomDeclare";
import ConfirmAlert from "../alert/_base/ConfirmAlert";
// API
import {declareItem, getCommentCount} from '../../data/http/TabEventForNotice';
import baseStyle from "../../screen/_style/Base.style";
import TranslateButton from "../button/TranslateButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabNoticeEventPartItem extends BaseComponent {

    _isMounted = false;

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        // State
        const {iLike, likes, count_comments} = props.item;
        this.state = {
            isShowConfirm: false,
            confirmMessage: '',
            // Media
            mediaIndex: 0,
            mediaMeta: null,
            // Like
            isLike: iLike,
            likeCount: likes,
            // Comment
            commentCount: count_comments,
            //
            autoTrans: false,
        };
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this._isMounted = true;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this._isMounted = false;
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                confirmMessage: message
            });
        }
    }

    createDateTimeFormat = date => {
        return Common.isEmpty(date) ? '' : moment(date).format(localize.format.date_time);
    }

    createTagText = (selectTag, list) => {
        let t = [];
        if (!Common.isEmpty(selectTag)) t.push({hashtag: selectTag.name});
        if (Common.checkListSize(list)) t = t.concat(list);
        if (Common.checkListSize(t)) {
            return t.map(v => {
                if (!Common.isEmpty(v.hashtag)) return '#' + v.hashtag;
            }).join(Common.SEPARATOR_SPACE);
        }
        return null;
    }

    getReasonTitleByList = list => {
        return list.map(v => {
            return v.reason;
        });
    }

    // Like
    setLikeWithComment = (isLike = false, likeCount = 0, commentCount = 0) => {
        this.setState({
            isLike: isLike,
            likeCount: likeCount,
            commentCount: commentCount
        })
    }

    getLikeIcon = (isOn = false) => {
        return isOn
            ? <Icon.HeartOn size={20} color={colors.orange}/>
            : <Icon.HeartOff size={20} color={colors.white}/>;
    }

    // Media
    setMediaIndex = index => {
        if (this.state.mediaIndex !== index) {
            this.setState({mediaIndex: index})
        }
    }

    setMediaMeta = meta => this.setState({mediaMeta: meta})

    getMediaMeta = async videoId => {
        let meta = await getYoutubeMeta(videoId);
        this.setMediaMeta(meta);
    }

    getThumbnailByItem = item => {
        const {thumbnails, image_url} = item;
        if (Common.checkListSize(thumbnails)) {
            return thumbnails[THUMBNAIL_LEVEL.FEED].image_url;
        }
        return image_url;
    }

    getMediaItem = item => {
        if (Common.isEmpty(item)) return null;
        switch (item.media_type) {
            case MEDIA_RESPONSE.VIDEO_YOUTUBE:
                return this.renderMediaVideoItem(item.video_link_url);
            case MEDIA_RESPONSE.IMAGE_DEFAULT:
                return this.renderMediaImageItem(this.getThumbnailByItem(item));
        }
        return null;
    }

    createMediaList = (link, list) => {
        let m = [];
        if (!Common.isEmpty(link)) m.push(link);
        if (Common.checkListSize(list)) m = m.concat(list);
        return m;
    }

    createMediaData = (link, list) => {
        const m = this.createMediaList(link, list);
        if (Common.checkListSize(m)) {
            let routes = [];
            let scenes = {};
            m.map((item, index) => {
                const key = `${index}`;
                routes.push({key: key});
                scenes[key] = _ => this.getMediaItem(item);
            });
            return {
                mediaList: m,
                mediaRoutes: routes,
                mediaScenes: scenes,
            }
        }
        return null;
    }

    ////////////
    // Event
    onRefresh = _ => this.props.onRefresh && this.props.onRefresh();

    onMore = _ => {
        const {item, profile} = this.props;
        if (!Common.isEmpty(item.publisher) && !Common.isEmpty(item.publisher.id) && !Common.isEmpty(profile.id)) {
            if (item.publisher.id === profile.id) {
                this.postManage.open();
            } else {
                this.postDeclare.open();
            }
        }
    }

    onMediaImageItem = url => {
        Common.debug(url);
        this.onShowMediaViewer();
    }

    onRefreshComment = _ => {
        this.sendCommentCount();
    }

    onComment = _ => {
        const {item} = this.props;
        navRef.current.navigate(Screen.SCREEN_ACTIVITY.COMMENT, {
            type: Screen.STACK_NOTICE.TAB_EVENT,
            id: item.id,
            onRefresh: this.onRefreshComment,
        });
    }

    onDeclare = (index, reason) => {
        if (index > -1) {
            this.sendDeclare(this.props.reasonList[index].id, null);
        } else {
            // Etc
            this.sendDeclare('', reason);
        }
    }

    onCopy = _ => {
        const {item} = this.props;
        if (Common.isEmpty(item) || Common.isEmpty(item.content)) return;
        const tag = this.createTagText(item.static_hashtags, item.hashtags);
        if (Common.isEmpty(tag)) {
            Clipboard.setString(item.content);
        } else {
            Clipboard.setString(item.content + '\n\n' + tag);
        }
        this.setShowConfirm(true, localize.success.clipboard.post_contents);
    }

    onShowMediaViewer = () => {
        if(!THIRD_DEV) {
            console.warn("3차 개발 부분")
            return;
        }

        const {item} = this.props;
        const {mediaIndex} = this.state;
        // media index
        // item.youtube_link, item.medias
        navRef.current.navigate(Screen.SCREEN_ACTIVITY.MEDIA_VIEWER, {item: item, selectIndex: mediaIndex});
    }

    ////////////
    // API
    // sendLike = _ => {
    //     const {item} = this.props;
    //     like(item.id, (success, code, message, data) => {
    //         if (success) {
    //             const {liked, count_likes, count_comments} = data;
    //             this.setLikeWithComment(liked, count_likes, count_comments);
    //         } else {
    //             Common.debug(message);
    //         }
    //     });
    // }

    sendCommentCount = _ => {
        const {item} = this.props;
        getCommentCount(item.id, (success, code, message, data) => {
            if (success) {
                const {liked, count_likes, count_comments} = data;
                this.setLikeWithComment(liked, count_likes, count_comments);
            } else {
                Common.debug(message);
            }
        });
    }

    sendDeclare = (reason, content) => {
        const {item} = this.props;
        declareItem(item.id, reason, content,
            (success, code, message, data) => {
                this.setShowConfirm(true, message);
                this.bottomDeclare.close();
                // this.onRefresh();
            });
    }

    ////////////////////
    // RENDER
    renderTop = (id, name, url, date) => {
        return (
            <View style={s.layout_top}>
                {/* Avatar */}
                <CircleBorderImage size={32}
                                   gradeSize={14}
                                   borderWidth={1.5}
                                   userGrade={id}
                                   source={url}/>
                {/* Info */}
                <View style={s.layout_top_info}>
                    {/* Name */}
                    <BaseText style={FontStyle.CntTitleWhiteLH}>{name}</BaseText>
                    {/* Date */}
                    <BaseText style={FontStyle.SubCntGrayLN}>{this.createDateTimeFormat(date)}</BaseText>
                    {/*<View style={s.DateRow}>*/}
                    {/*    <BaseText style={FontStyle.SubCntGrayLN}>{this.createDateTimeFormat(date)}</BaseText>*/}
                    {/*    <View style={baseStyle.subShapeCircle} />*/}
                    {/*    <TranslateButton useIcon={false} enabled={this.state.autoTrans} onEnabled={enabled=>{*/}
                    {/*        this.setState({*/}
                    {/*            autoTrans:enabled*/}
                    {/*        })*/}
                    {/*    }} />*/}
                    {/*</View>*/}

                </View>
                {/* More */}
                <TouchableOpacity onPress={this.onMore}
                                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
                    <Icon.MoreVerticalOn size={20} color={colors.white}/>
                </TouchableOpacity>
            </View>);
    }

    // Contents
    renderNormalMainText = (main, tag) =>
        <View style={s.layout_contents}>
            {/* Main Text */}
            {/*<BaseText style={FontStyle.Cnt13WhiteLN}>{main}</BaseText>*/}
            <AttributeText text={main} autoTranslate={this.state.autoTrans}/>
            {/* HashTag */}
            {!Common.isEmpty(tag) && <BaseText style={FontStyle.SubHashOrangeLT}>{'\n\n' + tag}</BaseText>}
        </View>

    renderMoreMainText = (main, tag) =>
        <View style={s.layout_contents}>
            <ViewMoreText numberOfLines={FEED_CONTENTS_LINE} ellipsizeText={''}>
                {/* Main Text */}
                {/*<BaseText style={FontStyle.Cnt13WhiteLN}>{main}</BaseText>*/}
                <AttributeText text={main} autoTranslate={this.state.autoTrans}/>
                {/* HashTag */}
                {!Common.isEmpty(tag) && <BaseText style={FontStyle.SubHashOrangeLT}>{'\n\n' + tag}</BaseText>}
            </ViewMoreText>
        </View>

    renderContents = (mainText, selectTag, tags = []) => {
        const {isDetail} = this.props;
        const t = this.createTagText(selectTag, tags);
        return isDetail ? this.renderNormalMainText(mainText, t) : this.renderMoreMainText(mainText, t);
    }

    // Media
    renderMediaVideoItem = link => {
        let id = Common.getYoutubeId(link);
        if (Common.isEmpty(id)) return null;
        const {mediaMeta} = this.state;
        if (Common.isEmpty(mediaMeta)) this.getMediaMeta(id);
        return (
            <TouchableOpacity style={s.layout_image}
                              onPress={() => {
                                  this.onShowMediaViewer()
                              }}>
                <VideoItem videoId={id}
                           link={link}
                           meta={mediaMeta}
                           enableShowDetail={true}/>
            </TouchableOpacity>
        );
    }

    renderMediaImageItem = url => {
        return Common.isEmpty(url) ? null :
            <TouchableOpacity style={s.layout_image}
                              activeOpacity={1}
                              onPress={_ => this.onMediaImageItem(url)}>
                <BaseImage style={s.image_media}
                           resizeMode={'contain'}
                           source={{uri: url}}/>
            </TouchableOpacity>
    }

    renderMediaDetailVideoItem = link => {
        let id = Common.getYoutubeId(link);
        if (Common.isEmpty(id)) return null;
        const {mediaMeta} = this.state;
        if (Common.isEmpty(mediaMeta)) this.getMediaMeta(id);
        return (
            <View style={s.video_media_detail}>
                <VideoItem videoId={id}
                           link={link}
                           meta={mediaMeta}/>
            </View>);
    }

    renderMediaDetailItem = ({item, index}) => {
        if (Common.isEmpty(item)) return null;
        switch (item.media_type) {
            case MEDIA_RESPONSE.VIDEO_YOUTUBE:
                return this.renderMediaDetailVideoItem(item.video_link_url);
            case MEDIA_RESPONSE.IMAGE_DEFAULT:
                return <FullWidthImage url={item.image_url}/>;
        }
        return null;
    }

    renderMedia = (link, list) => {
        // const {isDetail} = this.props;
        // if (isDetail) {
        //     return <FlatList style={s.layout_media}
        //                      extraData={this.state}
        //                      data={this.createMediaList(link, list)}
        //                      threshold={2}
        //                      scrollEventThrottle={16}
        //                      keyExtractor={(item, index) => index.toString()}
        //                      renderItem={this.renderMediaDetailItem}
        //                      ItemSeparatorComponent={_ => <View style={{height: Layout.UISize(3)}}/>}/>
        // } else {
        const data = this.createMediaData(link, list);
        if (Common.isEmpty(data)) return;
        const {mediaList, mediaRoutes, mediaScenes} = data;
        const {mediaIndex} = this.state;
        return (
            <View style={s.layout_media}>
                {/* Pager */}
                <TabView style={s.pager_media}
                         onIndexChange={this.setMediaIndex}
                         navigationState={{index: mediaIndex, routes: mediaRoutes}}
                         renderTabBar={_ => null}
                         renderScene={SceneMap(mediaScenes)}/>
                {/* Indicator */}
                {mediaList.length > 1 &&
                <View style={s.layout_indicator}>
                    <DotIndicator totalCount={mediaList.length}
                                  selectIndex={mediaIndex}/>
                </View>}
            </View>);
        // }
    }

    // Bottom
    renderBottom = _ => {
        const {isLike, likeCount, commentCount} = this.state;
        return (
            <View style={s.layout_bottom}>
                {/* Like */}
                {/*<TouchableOpacity style={{flexDirection: "row"}}*/}
                {/*                  onPress={this.sendLike}>*/}
                {/*    {this.getLikeIcon(isLike)}*/}
                {/*    <BaseText style={[FontStyle.SubCntWhiteLT, s.layout_bottom_like]}>{Common.numberFormatWithSymbol(likeCount, 1, true)}</BaseText>*/}
                {/*</TouchableOpacity>*/}
                {/* Comment */}
                <TouchableOpacity style={{flexDirection: "row"}}
                                  onPress={this.onComment}>
                    <Icon.Comment size={20} color={colors.white}/>
                    <BaseText style={[FontStyle.SubCntWhiteLT, s.layout_bottom_comment]}>{Common.numberFormatWithSymbol(commentCount, 1, true)}</BaseText>
                </TouchableOpacity>
            </View>);
    }

    render() {
        const {item, reasonList} = this.props;
        if (Common.isEmpty(item)) return null;
        const {isShowConfirm, confirmMessage} = this.state;
        const {nickname, image_url, group_id} = item.publisher;
        return (
            <View style={s.container}>
                {/* Top */}
                {this.renderTop(group_id, nickname, image_url, item.created_at)}
                {/* Contents */}
                {this.renderContents(item.content, item.static_hashtags, item.hashtags)}
                {/* Media */}
                {this.renderMedia(item.youtube_link, item.medias)}
                {/* Bottom */}
                {/*{this.renderBottom()}*/}
                <View style={s.translate_layout} >
                    <TranslateButton useIcon={true} enabled={this.state.autoTrans} onEnabled={enabled=>{
                        this.setState({
                            autoTrans:enabled
                        })
                    }} />
                </View>
                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => this.setShowConfirm(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{confirmMessage}</BaseText>
                </ConfirmAlert>

                {/* Manage */}
                <PostManage ref={ref => this.postManage = ref}
                            type={Screen.STACK_NOTICE.TAB_EVENT}
                            id={item.id}
                            name={nickname}
                            url={Common.isEmpty(image_url) ? '' : image_url}
                            grade={group_id}
                            isEvent={true}
                            onDelete={this.onRefresh}
                            onCopy={this.onCopy}/>

                {/* Declare */}
                <PostDeclare ref={ref => this.postDeclare = ref}
                             name={nickname}
                             url={Common.isEmpty(image_url) ? '' : image_url}
                             grade={group_id}
                             onDeclare={_ => this.bottomDeclare.open()}
                             onCopy={this.onCopy}/>
                <BottomDeclare ref={ref => this.bottomDeclare = ref}
                               titles={this.getReasonTitleByList(reasonList)}
                               onDeclare={this.onDeclare}/>
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

TabNoticeEventPartItem.defaultProps = {
    item: null,
    isDetail: false,
    onRefresh: _ => {
    }
};

TabNoticeEventPartItem.propTypes = {
    item: PropTypes.any,
    isDetail: PropTypes.bool,
    onRefresh: PropTypes.func
};

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
        reasonList: state.common.get('reportReasonList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TabNoticeEventPartItem));
