////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/PostInquire.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import Icon from "../../../util/Icon";
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
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import BaseHelperLayout from "../../../component/_base/BaseHelperLayout";
import FlatInput from "../../../component/text/FlatInput";
// API
import {post} from '../../../data/http/Inquire';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostInquire extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            // Loading
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            confirmCallback: null,
            // Main Text
            mainText: '',
            // Image
            isShowAddImageButton: true,
            addImageListByLocal: [],
        };
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
                errorMessage: message,
                confirmCallback: callback,
            });
        }
    }

    ////////////
    // Title
    checkTitle = _ => {
        const t = this.title.getText().trim();
        if (Common.isEmpty(t)) {
            this.setShowConfirm(true, localize.error.post.title);
            return false;
        }
        return true;
    }

    ////////////
    // Main Text
    setMainText = text => this.setState({mainText: text});

    checkMainText = _ => {
        const t = this.state.mainText.trim();
        if (Common.isEmpty(t)) {
            this.setShowConfirm(true, localize.error.post.empty_detail);
            return false;
        }
        if (t.length < 5) {
            this.setShowConfirm(true, localize.error.post.empty_detail);
            return false;
        }
        return true;
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
            .catch(e => {
                console.warn(e)
                if(e.message.includes("cancelled image selection")) return;
                this.setShowConfirm(true, localize.error.post.image_resize_error)
            })
    }

    ////////////
    // Event
    ////////////

    onSelectIndex = index => this.setSelectTagIndex(index);

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
        if (this.checkTitle() && this.checkMainText()) this.sendPost();
    }

    ////////////////////
    // API
    ////////////////////

    sendPost = _ => {
        this.setShowLoading(true);
        const {mainText, addImageListByLocal} = this.state;
        post(this.title.getText(), mainText, addImageListByLocal, this.onResultPost);
    }

    onResultPost = (success, code, message, data) => {
        this.setShowLoading(false);
        if (success) {
            this.setShowConfirm(true, localize.success.post.inquire_complete, this.onCancel);
        } else {
            this.setShowConfirm(true, message);
        }
    }

    ////////////////////
    // RENDER
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
                        <BaseText
                            style={FontStyle.SubCntOrangeLN}>{addImageListByLocal.length}</BaseText>
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
                        {/* By Local */}
                        {Common.checkListSize(addImageListByLocal) &&
                        addImageListByLocal.map((image, index) => {
                            if (!Common.isEmpty(image)) return this.renderAddImage(image, index, this.removeImageListByLocal);
                        })}
                    </View>
                </ScrollView>
            </View>);
    }

    render() {
        const {
            isLoading,
            isShowConfirm, errorMessage, confirmCallback,
            mainText
        } = this.state;
        return (
            <KeyboardAvoidingView style={s.container}
                                  behavior={"padding"}
                                  enabled={Common.checkIOS()}
                                  keyboardVerticalOffset={Layout.getStatusBarHeight(true, false)}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader title={localize.more.inquire.title}
                            skipAndroidStatusBar={false}
                            onBackPress={this.onCancel}/>
                {/* Contents */}
                <ScrollView bounces={false}
                            overScrollMode={"never"}>
                    <View style={s.container_contents}>
                        {/* Information */}
                        <BaseText
                            style={[s.layout_info, FontStyle.Cnt13WhiteLT]}>{localize.more.inquire.text.information}</BaseText>
                        {/* Title */}
                        <View style={s.layout_title}>
                            <FlatInput ref={ref => this.title = ref}
                                       required={true}
                                       maxLength={50}
                                       label={localize.more.inquire.text.title}
                                       placeHolder={localize.more.inquire.hint.title}/>
                        </View>
                        {/* Main Text */}
                        <View style={s.layout_main}>
                            <BaseHelperLayout label={localize.more.inquire.text.contents}
                                              required={true}>
                                {/* Input */}
                                <View style={s.layout_input_main}>
                                    <BaseTextInput style={[FontStyle.Cnt13WhiteLN, s.input_main]}
                                                   multiline={true}
                                                   placeholder={localize.more.inquire.hint.contents}
                                                   placeholderTextColor={colors.gray}
                                                   onChangeText={this.setMainText}
                                                   value={mainText}/>
                                </View>
                            </BaseHelperLayout>
                        </View>
                        {/* Border */}
                        <View style={[s.border, s.layout_border]}/>
                        {/* Image */}
                        {this.renderImage()}
                    </View>
                </ScrollView>
                {/* Bottom */}
                <View style={s.layout_two_button}>
                    <BaseTouchableButton title={localize.common.cancel}
                                         buttonStyle={{backgroundColor: colors.gray}}
                                         onPress={this.onCancel}/>
                    <BaseTouchableButton title={localize.common.done}
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
// EXPORT
////////////////////////////////////////

export default PostInquire;
