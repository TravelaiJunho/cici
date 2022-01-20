////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from "react-native";
import {Avatar} from "react-native-elements";
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import _ from "lodash";
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/EventPost.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import Icon from "../../../util/Icon";
import Screen from "../../../util/type/Screen";
import {ADD_IMAGE_MAX} from '../../../util/Constants';
import {getImageOptions} from "../../../util/Options";
import {IMAGE_CANCEL} from "../../../../assets";
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
import {setFocusEventForNotice} from "../../../data/redux/action/TabEventForNotice";
import {postPartEventForNotice} from "../../../data/http/TabEventForNotice";
import {setFocusEventForMemberShip} from "../../../data/redux/action/TabEventForMemberShip";
import {postPartEventForMemberShip} from "../../../data/http/TabEventForMemberShip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostEvent extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = this.initState(props);
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.addBackHandler();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeBackHandler();
    }

    ////////////////////
    // FUNCTION
    initState = props => {
        const {type, item} = props.route.params;
        if (Common.isEmpty(type)) return null;
        return {
            // Loading
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            confirmCallback: null,
            // Main Text
            mainText: '',
            // Tag
            selectTagCode: this.getTagIndexByItem(item),
            tagText: this.getTagByItem(item),
            // Image
            isShowAddImageButton: true,
            addImageListByLocal: [],
            // Youtube
            linkText: '',
        }
    }

    changeFocus = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.props.sendFocusEventForNotice();

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return this.props.sendFocusEventForMemberShip();

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
        return localize.event.detail.participate;
    }

    ////////////
    // Main Text
    setMainText = text => this.setState({mainText: text});

    checkMainText = _ => {
        if (Common.isEmpty(this.state.mainText)) {
            this.setShowConfirm(true, localize.error.post.empty);
            return false;
        }
        return true;
    }

    ////////////
    // Tag
    getTagIndexByItem = item => {
        if (Common.isEmpty(item)) return '';
        if (Common.isEmpty(item.static_hashtag)) return '';
        return item.static_hashtag;
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

    getTagByItem = item => {
        if (Common.isEmpty(item)) return '';
        if (!Common.checkListSize(item.mission_tags)) return '';
        return this.createTagListToHashTag(item.mission_tags);
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

    setTagText = text => this.setState({tagText: text});

    checkTagText = _ => this.setTagText(this.replaceTagText(this.state.tagText))

    getStaticTagList = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return null;
        switch (type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.props.tagListByNoticeTabEvent;

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return this.props.tagListByMemberShipTabEvent;
        }
        return null;
    }

    getTagTitle = list => {
        return list.map(v => {
            if (!Common.isEmpty(v.name)) return '#' + v.name;
        });
    }

    getTagIndex = (list, code) => {
        return _.findIndex(list, v => {
            return v.code === code;
        });
    }

    ////////////
    // Image By Local
    setImageListByLocal = list => {
        this.setState({
            addImageListByLocal: list,
            isShowAddImageButton: list.length < ADD_IMAGE_MAX
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
            .openPicker(getImageOptions())
            .then((image) => {
                if (!Common.isEmpty(image.mime)) this.addImageDataByLocal(image);
            })
            .catch(e=>{
                console.warn(e)
                if(e.message.includes("cancelled image selection")) return;
                this.setShowConfirm(true, localize.error.post.image_resize_error)
            })
    }

    ////////////
    // Link
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
    // Event
    ////////////

    onAddImage = _ => {
        const {addImageListByLocal} = this.state;
        if (addImageListByLocal.length === ADD_IMAGE_MAX) {
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

    ////////////////////
    // API
    ////////////////////

    sendPost = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.sendPostForEventForNotice();

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return this.sendPostForEventForMemberShip();
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

    // Notice Event
    sendPostForEventForNotice = _ => {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return;
        this.setShowLoading(true);
        const {mainText, selectTagCode, tagText, addImageListByLocal, linkText} = this.state;
        postPartEventForNotice(
            item.id,
            mainText,
            selectTagCode,
            this.replaceTagText(tagText, false),
            addImageListByLocal,
            linkText,
            this.onResultPost);
    }

    // MemberShip Event
    sendPostForEventForMemberShip = _ => {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return;
        this.setShowLoading(true);
        const {mainText, selectTagCode, tagText, addImageListByLocal, linkText} = this.state;
        postPartEventForMemberShip(
            item.id,
            mainText,
            selectTagCode,
            this.replaceTagText(tagText, false),
            addImageListByLocal,
            linkText,
            this.onResultPost);
    }

    ////////////////////
    // RENDER
    renderPost = _ => {
        const {profile} = this.props;
        const {mainText} = this.state;
        return (
            <View style={s.layout_post}>
                {/* Avatar */}
                {Common.isEmpty(profile.image_url)
                    ? <View style={s.empty_avatar}>
                        <Icon.MemberShipOn
                            size={Layout.UISize(17)}
                            color={colors.grayLight}/>
                    </View>
                    : <Avatar rounded={true}
                              containerStyle={s.layout_avatar}
                              size={Layout.UISize(40)}
                              source={{uri: profile.image_url}}/>}
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
        const list = this.getStaticTagList();
        if (!Common.checkListSize(list)) return null;
        const {selectTagCode, tagText} = this.state;
        return (
            <View style={s.layout_tag}>
                {/* Title */}
                <BaseText style={[FontStyle.CntTitleWhiteLH, {marginBottom: Layout.UISize(15)}]}>
                    {localize.post.tag_title}
                </BaseText>
                {/* Select */}
                <SelectChips isSelected={false}
                             titles={this.getTagTitle(list)}
                             selectIndex={this.getTagIndex(list, selectTagCode)}/>
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
        const {addImageListByLocal} = this.state;
        return (
            <View style={s.layout_image}>
                {/* Title */}
                <View style={s.layout_image_title}>
                    <BaseText style={[FontStyle.CntTitleWhiteLH, {flex: 1}]}>{localize.post.image_title}</BaseText>
                    <BaseText>
                        <BaseText style={FontStyle.SubCntOrangeLN}>{addImageListByLocal.length}</BaseText>
                        <BaseText style={[FontStyle.SubCntGrayRN, {marginLeft: Layout.UISize(2)}]}>/{ADD_IMAGE_MAX}</BaseText>
                    </BaseText>
                </View>
                {/* List */}
                <ScrollView bounces={false}
                            overScrollMode={"never"}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                    {this.renderAddImageButton()}
                    <View style={s.container_image_list}>
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
            isLoading,
            isShowConfirm, errorMessage, confirmCallback,
            linkText
        } = this.state;
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
                        {this.renderTag()}
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
                {this.renderAttention()}
                <View style={s.layout_two_button}>
                    <BaseTouchableButton title={localize.common.cancel}
                                         buttonStyle={{backgroundColor: colors.gray}}
                                         onPress={this.onCancel}/>
                    <BaseTouchableButton title={localize.common.post}
                                         buttonStyle={{marginLeft: Layout.UISize(15)}}
                                         onPress={this.onPost}/>
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
    return {
        profile: state.user.get('profile'),
        tagListByNoticeTabEvent: state.tab_event_for_notice.get('tagList'),
        tagListByMemberShipTabEvent: state.tab_event_for_membership.get('tagList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendFocusEventForNotice: _ => {
            return dispatch(setFocusEventForNotice(true));
        },
        sendFocusEventForMemberShip: _ => {
            return dispatch(setFocusEventForMemberShip(true));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(PostEvent);
