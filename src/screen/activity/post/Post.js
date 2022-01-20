////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from "react-native";
import {Avatar} from "react-native-elements";
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/Post.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import Icon from "../../../util/Icon";
import Screen from "../../../util/type/Screen";
import {IMAGE_CANCEL, IMAGE_LOGO_DANITY} from "../../../../assets";
import {MEDIA_RESPONSE} from '../../../util/type/Media';
import {TAG_CODE} from '../../../util/type/Tag';
import {ADD_IMAGE_MAX} from '../../../util/Constants';
import {getDefaultImageOptions} from "../../../util/Options";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BaseImage from "../../../component/_base/BaseImage";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import BaseTouchableButton from "../../../component/button/_base/BaseTouchableButton";
import BaseTextInput from "../../../component/_base/BaseTextInput";
import FlatInput from "../../../component/text/FlatInput";
import SelectChips from "../../../component/chip/SelectChips";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
// API
import {postForTalkTalk, saveForTalkTalk} from "../../../data/http/TabTalkTalk";
import {postForFromDaniel, saveForFromDaniel} from "../../../data/http/TabFromDaniel";
import {postForToDaniel, saveForToDaniel} from "../../../data/http/TabToDaniel";
import {postForTalk, saveForTalk} from "../../../data/http/TabTalk";
import {setFocusForTalkTalk} from "../../../data/redux/action/TabTalkTalk";
import {setFocusForFromDaniel} from "../../../data/redux/action/TabFromDaniel";
import {setFocusForToDaniel} from "../../../data/redux/action/TabToDaniel";
import {setFocusForTalk} from "../../../data/redux/action/TabTalk";
import PhotoManipulator from "react-native-photo-manipulator";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Post extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = this.initState(props);
    }

    ////////////////////
    // OVERRIDE

    ////////////////////
    // FUNCTION
    initState = props => {
        const {type, item} = props.route.params;
        if (Common.isEmpty(type)) return null;
        const addImageListByItem = this.getImageListByItem(item);
        return {
            item: item,
            // Loading
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            confirmCallback: null,
            // Main Text
            mainText: this.getMainTextByItem(item),
            // Avatar
            avatarUrl: this.getAvatarUrlByItem(item),
            // Tag
            isShowTag: this.getShowTagByType(),
            selectTagIndex: this.getTagIndexByItem(item),
            tagText: this.getTagByItem(item),
            // Image
            isShowAddImageButton: addImageListByItem.length < ADD_IMAGE_MAX,
            addImageListByItem: addImageListByItem,
            removeImageListByItem: [],
            addImageListByLocal: [],
            // Youtube
            linkText: this.getLinkByItem(item),
            // Attention
            isShowAttention: this.getShowAttentionByType(),
        }
    }

    changeFocus = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return this.props.sendFocusForTalkTalk();
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return this.props.sendFocusForFromDaniel();
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return this.props.sendFocusForToDaniel();
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return this.props.sendFocusForTalk();
        }
    }

    setShowLoading = isShow => {
        if (this.state.isLoading !== isShow) {
            this.setState({isLoading: isShow});
        }
    }

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message,
                confirmCallback: callback,
            });
        }
    }

    // Title
    getTitle = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return localize.community.post.talk_talk_title;
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return localize.community.post.from_daniel_title;
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return localize.community.post.to_daniel_title;
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return localize.community.post.talk_title;
        }
    }

    ////////////
    // Main Text
    getMainTextByItem = item => {
        if (Common.isEmpty(item)) return '';
        return Common.isEmpty(item.content) ? '' : item.content
    }

    setMainText = text => this.setState({mainText: text});

    checkMainText = _ => {
        let trim = this.state.mainText.trim();
        if (Common.isEmpty(this.state.mainText) || trim.length == 0 ) {
            this.setShowConfirm(true, localize.error.post.empty);
            return false;
        }
        return true;
    }

    ////////////
    // Avatar
    getAvatarUrlByItem = item => {
        if (Common.isEmpty(item)) return '';
        if (Common.isEmpty(item.publisher)) return '';
        return Common.isEmpty(item.publisher.image_url) ? '' : item.publisher.image_url;
    }

    ////////////
    // Tag
    getShowTagByType = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return false;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return true;
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return false;
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return false;
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return true;
        }
    }

    getTagIndexByItem = item => {
        if (Common.isEmpty(item)) return 0;
        if (Common.isEmpty(item.static_hashtags)) return 0;
        return TAG_CODE.indexOf(item.static_hashtags.code);
    }

    getTagByItem = item => {
        if (Common.isEmpty(item)) return '';
        if (!Common.checkListSize(item.hashtags)) return '';
        return this.createTagListToHashTag(item.hashtags.map(v => {
            if (!Common.isEmpty(v.hashtag)) return v.hashtag;
        }));
    }

    setSelectTagIndex = index => {
        if (this.state.selectTagIndex !== index) {
            this.setState({selectTagIndex: index});
        }
    }

    replaceTagText = (text, isAddTag = true) => {
        let t = text
            .replace(/#/g, Common.SEPARATOR_SPACE)
            .replace(/\r/g, Common.SEPARATOR_SPACE)
            .replace(/\n/g, Common.SEPARATOR_SPACE)
            .split(Common.SEPARATOR_SPACE)
            .filter(v => v);
        if (isAddTag) {
            return this.createTagListToHashTag(t);
        } else {
            return this.createTagListToText(t);
        }
    }

    createTagListToHashTag = list => {
        return list.map(v => {
            if (!Common.isEmpty(v)) return '#' + v;
        }).join(Common.SEPARATOR_SPACE);
    }

    createTagListToText = list => {
        return list.map(v => {
            if (!Common.isEmpty(v)) return v;
        }).join(Common.SEPARATOR_COMMA);
    }

    setTagText = text => this.setState({tagText: text});

    checkTagText = _ => this.setTagText(this.replaceTagText(this.state.tagText))

    ////////////
    // Image By Item
    getImageListByItem = item => {
        if (Common.isEmpty(item)) return [];
        if (!Common.checkListSize(item.medias)) return [];
        return item.medias.map(v => {
            if (v.media_type === MEDIA_RESPONSE.IMAGE_DEFAULT) return this.createImageDataByItem(v);
        });
    }

    setImageListByItem = list => {
        const {addImageListByLocal} = this.state;
        this.setState({
            addImageListByItem: list,
            isShowAddImageButton: (addImageListByLocal.length + list.length) < ADD_IMAGE_MAX
        });
    }

    setRemoveImageListByItem = list => {
        this.setState({removeImageListByItem: list});
    }

    removeImageListByItem = index => {
        let list = [...this.state.addImageListByItem];
        // Remove List (id)
        let remove = [...this.state.removeImageListByItem];
        remove.push(list[index].id);
        this.setRemoveImageListByItem(remove);
        // Add List
        list.splice(index, 1);
        this.setImageListByItem(list);
    }

    createImageDataByItem = image => {
        const {id, image_url} = image;
        return {
            id: id,
            uri: image_url
        }
    }

    ////////////
    // Image By Local
    setImageListByLocal = list => {
        const {addImageListByItem} = this.state;
        this.setState({
            addImageListByLocal: list,
            isShowAddImageButton: (addImageListByItem.length + list.length) < ADD_IMAGE_MAX
        });
    }

    addImageListByLocal = (mime, uri, fileName) => {
        let list = [...this.state.addImageListByLocal];
        list.push({
            type: mime,
            uri: uri,
            name: fileName,
        });
        this.setImageListByLocal(list);
    }

    removeImageListByLocal = index => {
        let list = [...this.state.addImageListByLocal];
        list.splice(index, 1);
        this.setImageListByLocal(list);
    }

    addImageDataByLocal = image => {
        const {mime, path} = image;
        this.addImageListByLocal(mime, path, Common.getFileNameFromUrl(path));
    }

    showGallery = _ => {
        ImagePicker
            .openPicker(getDefaultImageOptions())
            .then((image) => {

                console.warn("IMAGE", image)
                PhotoManipulator.crop(image.path, {
                    x: 0,
                    y: 0,
                    height: image.height - 2,
                    width: image.width
                }).then(result => {
                    console.warn(result)
                    if (!Common.isEmpty(image.mime)) this.addImageDataByLocal({mime: image.mime, path: result});
                })
            })
            .catch(e => {
                console.warn(e.message)
                if(e.message.includes("cancelled image selection")) return;
                this.setShowConfirm(true, localize.error.post.image_resize_error)
            })
    }

    ////////////
    // Link
    getLinkByItem = item => {
        if (Common.isEmpty(item)) return '';
        if (Common.isEmpty(item.youtube_link)) return '';
        return item.youtube_link.video_link_url;
    }

    setLinkText = text => this.setState({linkText: text});

    checkLinkText = _ => {
        const {linkText} = this.state;
        if (Common.isEmpty(linkText)) {
            return true;
        }
        if (Common.isEmpty(Common.getYoutubeId(linkText))) {
            this.setShowConfirm(true, localize.error.post.link);
            return false;
        }
        return true;
    }

    ////////////
    // Attention
    getShowAttentionByType = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return true;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return true;
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return false;
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return true;
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return true;
        }
    }

    ////////////
    // Event
    ////////////

    onSelectIndex = index => this.setSelectTagIndex(index);

    onAddImage = _ => {
        const {addImageListByItem, addImageListByLocal} = this.state;
        if (addImageListByItem.length + addImageListByLocal.length === ADD_IMAGE_MAX) {
            this.setShowConfirm(true, localize.formatString(localize.error.post.image_max, ADD_IMAGE_MAX));
            return;
        }
        this.showGallery();
    }

    onCancel = _ => this.props.navigation.pop();

    onPost = _ => {
        if (this.checkMainText() && this.checkLinkText()) {
            this.sendPost();
        }
    }

    onModify = _ => {
        if (this.checkMainText() && this.checkLinkText()) {
            this.sendSave();
        }
    }

    ////////////////////
    // API
    ////////////////////

    sendPost = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return this.sendPostForTalkTalk();
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return this.sendPostForFromDanial();
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return this.sendPostForToDanial();
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return this.sendPostForTalk();
        }
    }

    sendSave = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return this.sendSaveForTalkTalk();
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return this.sendSaveForFromDanial();
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return this.sendSaveForToDanial();
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return this.sendSaveForTalk();
        }
    }

    onResultPost = (success, code, message, data) => {
        this.setShowLoading(false);
        if (success) {
            this.changeFocus();
            this.setShowConfirm(true, localize.success.post.complete, this.onCancel);
        } else {
            this.setShowConfirm(true, message);
        }
    }

    onResultSave = (success, code, message, data) => {
        this.setShowLoading(false);
        if (success) {
            this.changeFocus();
            Common.setPostData(data);
            this.setShowConfirm(true, localize.success.post.save, this.onCancel);
        } else {
            this.setShowConfirm(true, message);
        }
    }

    // Talk Talk
    sendPostForTalkTalk = _ => {
        this.setShowLoading(true);
        const {mainText, selectTagIndex, tagText, addImageListByLocal, linkText} = this.state;
        postForTalkTalk(
            mainText,
            TAG_CODE[selectTagIndex],
            this.replaceTagText(tagText, false),
            addImageListByLocal,
            linkText,
            this.onResultPost);
    }

    sendSaveForTalkTalk = _ => {
        this.setShowLoading(true);
        const {
            item,
            mainText,
            selectTagIndex,
            tagText,
            removeImageListByItem,
            addImageListByLocal,
            linkText
        } = this.state;
        saveForTalkTalk(
            item.id,
            mainText,
            TAG_CODE[selectTagIndex],
            this.replaceTagText(tagText, false),
            Common.createTextWithComma(removeImageListByItem),
            addImageListByLocal,
            linkText,
            this.onResultSave);
    }

    // From Danial
    sendPostForFromDanial = _ => {
        this.setShowLoading(true);
        const {mainText, addImageListByLocal, linkText} = this.state;
        postForFromDaniel(
            mainText,
            addImageListByLocal,
            linkText,
            this.onResultPost);
    }

    sendSaveForFromDanial = _ => {
        this.setShowLoading(true);
        const {item, mainText, removeImageListByItem, addImageListByLocal, linkText} = this.state;
        saveForFromDaniel(
            item.id,
            mainText,
            Common.createTextWithComma(removeImageListByItem),
            addImageListByLocal,
            linkText,
            this.onResultSave);
    }

    // To Danial
    sendPostForToDanial = _ => {
        this.setShowLoading(true);
        const {mainText, addImageListByLocal, linkText} = this.state;
        postForToDaniel(
            mainText,
            addImageListByLocal,
            linkText,
            this.onResultPost);
    }

    sendSaveForToDanial = _ => {
        this.setShowLoading(true);
        const {item, mainText, removeImageListByItem, addImageListByLocal, linkText} = this.state;
        saveForToDaniel(
            item.id,
            mainText,
            Common.createTextWithComma(removeImageListByItem),
            addImageListByLocal,
            linkText,
            this.onResultSave);
    }

    // Talk
    sendPostForTalk = _ => {
        this.setShowLoading(true);
        const {mainText, selectTagIndex, tagText, addImageListByLocal, linkText} = this.state;
        postForTalk(
            mainText,
            TAG_CODE[selectTagIndex],
            this.replaceTagText(tagText, false),
            addImageListByLocal,
            linkText,
            this.onResultPost);
    }

    sendSaveForTalk = _ => {
        this.setShowLoading(true);
        const {
            item,
            mainText,
            selectTagIndex,
            tagText,
            removeImageListByItem,
            addImageListByLocal,
            linkText
        } = this.state;
        saveForTalk(
            item.id,
            mainText,
            TAG_CODE[selectTagIndex],
            this.replaceTagText(tagText, false),
            Common.createTextWithComma(removeImageListByItem),
            addImageListByLocal,
            linkText,
            this.onResultSave);
    }

    ////////////////////
    // RENDER
    renderPost = _ => {
        const {mainText, avatarUrl} = this.state;
        return (
            <View style={s.layout_post}>
                {/* Avatar */}
                {!Common.isEmpty(avatarUrl)
                    ? <Avatar rounded={true}
                              source={Common.isEmpty(avatarUrl) ? IMAGE_LOGO_DANITY : {uri: avatarUrl}}
                              size={Layout.UISize(40)}
                              containerStyle={s.layout_avatar}/>
                    : <View style={s.empty_avatar}>
                        <Icon.MemberShipOn
                            size={Layout.UISize(17)}
                            color={colors.grayLight}/>
                    </View>}
                {/* Input */}
                <View style={s.layout_input_post}>
                    <BaseTextInput style={[FontStyle.Cnt13WhiteLN, s.input_post]}
                                   multiline={true}
                                   numberOfLines={9}
                                   placeholder={localize.post.hint.enter_post}
                                   placeholderTextColor={colors.grayLight}
                                   onChangeText={this.setMainText}
                                   value={mainText}/>
                </View>
            </View>);
    }

    renderTag = _ => {
        const {selectTagIndex, tagText} = this.state;
        const TAG_NAME = [
            localize.community.filter.tag_free_talk,
            localize.community.filter.tag_cert_review,
            localize.community.filter.tag_share_info,
        ];
        return (
            <View style={s.layout_tag}>
                {/* Title */}
                <BaseText style={[FontStyle.CntTitleWhiteLH, {marginBottom: Layout.UISize(15)}]}>
                    {localize.post.tag_title}
                </BaseText>
                {/* Select */}
                <SelectChips titles={TAG_NAME}
                             selectIndex={selectTagIndex}
                             onSelectIndex={this.onSelectIndex}/>
                {/* Input */}
                <View style={s.layout_input_tag}>
                    <BaseTextInput style={[FontStyle.Cnt13WhiteLN, s.input_tag]}
                                   multiline={true}
                                   numberOfLines={3}
                                   placeholder={localize.post.hint.enter_tag}
                                   placeholderTextColor={colors.grayLight}
                                   onChangeText={this.setTagText}
                                   onBlur={_ => this.checkTagText()}
                                   value={tagText}/>
                </View>
            </View>);
    }

    renderAddImageButton = _ =>
        <TouchableOpacity style={s.layout_add_image_button}
                          onPress={this.onAddImage}>
            <Icon.Plus size={20} color={colors.gray}/>
        </TouchableOpacity>

    renderAddImage = (image, index, callback) =>
        <View key={index}
              style={s.layout_add_image}>
            <BaseImage style={s.image_add}
                       source={{uri: image.uri}}/>
            <TouchableOpacity style={s.image_close_icon}
                              hitSlop={{top: 4, left: 4, right: 4, bottom: 4}}
                              onPress={_ => callback && callback(index)}>
                <BaseImage style={s.image_close}
                           source={IMAGE_CANCEL}/>
            </TouchableOpacity>
        </View>

    renderImage = _ => {
        const {addImageListByItem, addImageListByLocal} = this.state;
        return (
            <View style={s.layout_image}>
                {/* Title */}
                <View style={s.layout_image_title}>
                    <BaseText style={[FontStyle.CntTitleWhiteLH, {flex: 1}]}>{localize.post.image_title}</BaseText>
                    <BaseText>
                        <BaseText
                            style={FontStyle.SubCntOrangeLN}>{addImageListByItem.length + addImageListByLocal.length}</BaseText>
                        <BaseText
                            style={[FontStyle.SubCntGrayRN, {marginLeft: Layout.UISize(2)}]}>/{ADD_IMAGE_MAX}</BaseText>
                    </BaseText>
                </View>
                {/* List */}
                <ScrollView bounces={false}
                            overScrollMode={"never"}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                    {this.renderAddImageButton()}
                    <View style={s.container_image_list}>
                        {/* By Item */}
                        {Common.checkListSize(addImageListByItem) &&
                        addImageListByItem.map((image, index) => {
                            if (!Common.isEmpty(image)) return this.renderAddImage(image, index, this.removeImageListByItem);
                        })}
                        {/* By Local */}
                        {Common.checkListSize(addImageListByLocal) &&
                        addImageListByLocal.map((image, index) => {
                            if (!Common.isEmpty(image)) return this.renderAddImage(image, index, this.removeImageListByLocal);
                        })}
                    </View>
                </ScrollView>
            </View>);
    }

    renderAttention = _ =>
        <View>
            {/* Border */}
            <View style={s.border}/>
            {/* Attention */}
            <BaseText style={s.text_attention}>
                <Icon.Attention size={10}
                                color={colors.orange}/>
                <View style={s.space_attention}/>
                <BaseText style={FontStyle.Cnt13WhiteLT}>
                    {localize.post.text.attention}
                </BaseText>
            </BaseText>
        </View>

    render() {
        const {
            item,
            isLoading,
            isShowConfirm, errorMessage, confirmCallback,
            isShowAttention, isShowTag,
            linkText
        } = this.state;
        const isModify = !Common.isEmpty(item);
        return (
            <KeyboardAvoidingView style={s.container}
                                  behavior={"padding"}
                                  enabled={Common.checkIOS()}
                                  keyboardVerticalOffset={Layout.getStatusBarHeight(true, false)}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader title={this.getTitle()}
                            skipAndroidStatusBar={false}
                            onBackPress={this.onCancel}/>
                {/* Contents */}
                <ScrollView bounces={false}
                            overScrollMode={"never"}>
                    <View style={s.container_contents}>
                        {this.renderPost()}
                        {/* Border */}
                        <View style={[s.border, s.layout_border]}/>
                        {/* Tag */}
                        {isShowTag && this.renderTag()}
                        {/* Image */}
                        {this.renderImage()}
                        {/* Video */}
                        <FlatInput ref={ref => this.video = ref}
                                   containerStyle={s.layout_video}
                                   label={localize.post.video_title}
                                   placeHolder={localize.post.hint.enter_video}
                                   onChangeText={this.setLinkText}
                                   ellipsizeMode='tail'
                                   numberOfLines={1}
                                   text={linkText}/>
                    </View>
                </ScrollView>
                {/* Bottom */}
                {isShowAttention && this.renderAttention()}
                <View style={s.layout_two_button}>
                    <BaseTouchableButton title={localize.common.cancel}
                                         buttonStyle={{backgroundColor: colors.gray}}
                                         onPress={this.onCancel}/>
                    <BaseTouchableButton title={isModify ? localize.common.save : localize.common.post}
                                         buttonStyle={{marginLeft: Layout.UISize(15)}}
                                         onPress={isModify ? this.onModify : this.onPost}/>
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  this.setShowConfirm(false);
                                  confirmCallback && confirmCallback();
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </KeyboardAvoidingView>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendFocusForTalkTalk: _ => {
            return dispatch(setFocusForTalkTalk(true));
        },
        sendFocusForFromDaniel: _ => {
            return dispatch(setFocusForFromDaniel(true));
        },
        sendFocusForToDaniel: _ => {
            return dispatch(setFocusForToDaniel(true));
        },
        sendFocusForTalk: _ => {
            return dispatch(setFocusForTalk(true));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Post);
