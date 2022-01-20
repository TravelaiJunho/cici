import React from 'react'
import {
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import PropTypes from "prop-types";

import BaseComponent from "../_base/BaseComponent";
import s from "./_style/base.style";
import Common from "../../util/Common";
import {ADD_IMAGE_MAX} from "../../util/Constants";
import {MEDIA_RESPONSE} from "../../util/type/Media";
import ImagePicker from "react-native-image-crop-picker";
import {getDefaultImageOptions} from "../../util/Options";
import localize from "../../util/Localize";
import Icon from "../../util/Icon";
import {colors} from "../../util/Color";
import BaseImage from "../_base/BaseImage";
import {IMAGE_CANCEL} from "../../../assets";
import BaseText from "../_base/BaseText";
import FontStyle from "../../util/style/Font.style";
import Layout from "../../util/Layout";
import ConfirmAlert from "../alert/_base/ConfirmAlert";
import BaseTransText from "../_base/BaseTransText";
import PhotoManipulator from "react-native-photo-manipulator";

class SelectImage extends BaseComponent {
    constructor(props) {
        super(props);
        const addImageListByItem = this.getImageListByItem(props.item);
        this.state = {
            // Image
            isShowAddImageButton: addImageListByItem.length < props.imageCount,
            addImageListByItem: addImageListByItem,
            removeImageListByItem: [],
            addImageListByLocal: [],

            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['isShowConfirm', 'isShowAddImageButton', 'addImageListByItem', 'removeImageListByItem', 'addImageListByLocal'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['editable', 'autoTranslate'])) {
            const addImageListByItem = this.getImageListByItem(nextProps.item);
            this.setState({
                isShowAddImageButton: addImageListByItem.length < nextProps.imageCount,
                addImageListByItem: addImageListByItem,
            })
            return true;
        }
        // if (Common.shouldUpdate(this.props, nextProps, ['item'])) {
        //
        //
        //     return true;
        // }

        return false;
    }

    ////////////
    // Image By Item
    checkValue = () => {
        const {addImageListByLocal, addImageListByItem} = this.state;
        let data = [];
        data = data.concat(addImageListByItem);
        data = data.concat(addImageListByLocal);
        if (this.props.required) {

            if (Common.isEmpty(data)) {
                this.setErrorMsg(true)
                return {require: true, data: null};
            }
            this.setErrorMsg(false);
            return {require: true, data: data};
        }
        let value = Common.isEmpty(data) ? null : data
        return {require: false, data: value};
    }

    resetValueData = () => {

    }

    setValueData = value => {
        //his.setState({valueData: value});
    }

    setErrorMsg = isError => {
        this.setState({errorMsg: isError});
    }

    getValueData = _ => {
        return null;
    }

    getImageListByItem = item => {
        if (Common.isEmpty(item)) return [];
        return item.map(v => {
            return this.createImageDataByItem(v);
        });
    }

    setImageListByItem = list => {
        const {addImageListByLocal} = this.state;
        const {imageCount} = this.props;
        this.setState({
            addImageListByItem: list,
            isShowAddImageButton: (addImageListByLocal.length + list.length) < imageCount
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

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message,
                callback: callback
            });
        }
    }


    ////////////
    // Image By Local
    setImageListByLocal = list => {
        const {addImageListByItem} = this.state;
        const {imageCount} = this.props;
        this.setState({
            addImageListByLocal: list,
            isShowAddImageButton: (addImageListByItem.length + list.length) < imageCount
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
                //if (!Common.isEmpty(image.mime)) this.addImageDataByLocal(image);
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
                console.warn(e);
                if(e.message.includes("cancelled image selection")) return;
                this.setShowConfirm(true, localize.error.post.image_resize_error)
            });
    }

    onAddImage = _ => {
        const {addImageListByItem, addImageListByLocal} = this.state;
        const {imageCount} = this.props;
        if (addImageListByItem.length + addImageListByLocal.length === imageCount) {
            this.setShowConfirm(true, localize.formatString(localize.error.post.image_max, imageCount));
            return;
        }
        this.showGallery();
    }

    ////////////////////////////////
    // RANDER

    renderAddImageButton = _ =>
        <TouchableOpacity style={s.layout_add_image_button}
                          disabled={!this.props.editable}
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

    renderTitle = () => {
        const {title, frontTitle, required, autoTranslate} = this.props;
        return (
            <View style={s.title}>
                <BaseText
                    style={[FontStyle.CntTitleOrangeLH]}
                >
                    {frontTitle}
                    <BaseTransText
                        autoTranslate={autoTranslate}
                        style={FontStyle.CntTitleWhiteLH}
                    >
                        {
                            required ?
                                `${localize.more.membershiprequest.answer_require} `
                                :
                                `${localize.more.membershiprequest.answer_select} `}
                    </BaseTransText>
                    <BaseTransText
                        autoTranslate={autoTranslate}
                        style={FontStyle.CntTitleWhiteLH}
                    >
                        {title}
                    </BaseTransText>
                </BaseText>
            </View>
        )
    }

    render() {
        const {addImageListByItem, addImageListByLocal, isShowConfirm, errorMessage, callback} = this.state;
        const {title, frontTitle} = this.props;

        return (
            <View style={s.container}>
                {this.renderTitle()}
                <View style={s.layout_image}>
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
                </View>
                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>

        )
    }
}


////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////
SelectImage.propsTypes = {
    editable: PropTypes.bool,
    images: PropTypes.array,

    title: PropTypes.string,
    frontTitle: PropTypes.string,
    required: PropTypes.bool,
    imageCount: PropTypes.number,

    onChange: PropTypes.func,

    autoTranslate: PropTypes.bool,
}

SelectImage.defaultProps = {
    editable: true,
    images: [],

    title: null,
    frontTitle: null,
    required: true,
    imageCount: 1,

    onChange: _ => {
    },

    autoTranslate: false
}

export default SelectImage;
