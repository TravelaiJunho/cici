////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import _ from "lodash";
////////////////////
// Local
import FontStyle from "../../../../util/style/Font.style";
import s from '../../_style/PostItem.style';
import Icon from "../../../../util/Icon";
import {colors} from "../../../../util/Color";
import {THUMBNAIL_LEVEL} from "../../../../util/Constants";
import {BOARD_MEDIA} from "../../../../util/type/Board";
import {MEDIA_RESPONSE} from "../../../../util/type/Media";
import Common from '../../../../util/Common';
// Component
import BaseComponent from '../../../_base/BaseComponent';
import BaseImage from "../../../_base/BaseImage";
import BaseText from "../../../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostItem extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    getImageUrl = _ => {
        const {images} = this.props.item;
        if (Common.checkListSize(images[0].thumbnails)) {
            return images[0].thumbnails[THUMBNAIL_LEVEL.GRID];
        }
        return images[0];
    }

    checkMultiImage = _ => {
        const {images} = this.props.item;
        if (Common.checkListSize(images)) {
            return images.length > 1;
        }
        return false;
    }

    getItemByVideoFile = list => {
        return _.find(list, v => {
            return v.media_type === MEDIA_RESPONSE.VIDEO_FILE || v.media_type === MEDIA_RESPONSE.VIDEO_YOUTUBE;
        });
    };

    getVideoImageUrl = _ => {
        const {images} = this.props.item;
        const v = this.getItemByVideoFile(images)
        if (!Common.isEmpty(v) && Common.checkListSize(v.thumbnails)) {
            return v.thumbnails[THUMBNAIL_LEVEL.GRID];
        }
        return v;
    }

    // Event
    onPress = _ => {
        const {onPress, item} = this.props;
        onPress && onPress(item);
    }

    ////////////////////
    // RENDER
    renderText = _ => {
        const {title} = this.props.item;
        return (
            <View style={s.text_layout}>
                {!Common.isEmpty(title) &&
                <View style={s.text_in_layout}>
                    <BaseText style={FontStyle.CaptionWhiteLH} numberOfLines={3}>{title}</BaseText>
                </View>}
            </View>);
    };

    renderImage = _ => {
        const f = this.getImageUrl();
        if (!Common.isEmpty(f)) {
            return (
                <BaseImage style={s.image_layout}
                           priority={'high'}
                           resizeMode={'cover'}
                           source={{uri: f.image}}>
                    {this.checkMultiImage() &&
                    <View style={s.layout_icon}>
                        <Icon.ImagePOn size={16} color={colors.orange}/>
                    </View>}
                </BaseImage>);
        }
    };

    renderVideo = _ => {
        const f = this.getVideoImageUrl();
        if (!Common.isEmpty(f)) {
            return (
                <BaseImage style={s.image_layout}
                           priority={'high'}
                           resizeMode={'cover'}
                           source={{uri: f.image}}>
                    <View style={s.layout_icon}>
                        <Icon.VideoOn size={16} color={colors.orange}/>
                    </View>
                </BaseImage>);
        }
    };

    renderAudio = _ => {
        const f = this.getImageUrl();
        if (!Common.isEmpty(f)) {
            return (
                <BaseImage style={s.image_layout}
                           priority={'high'}
                           resizeMode={'cover'}
                           source={{uri: f.image}}>
                    <View style={s.layout_icon}>
                        <Icon.VoiceOn size={16} color={colors.orange}/>
                    </View>
                </BaseImage>);
        }
    }

    renderContents = _ => {
        const {item} = this.props;
        if (Common.isEmpty(item) || Common.isEmpty(item.media_type)) return null;
        switch (item.media_type) {
            case BOARD_MEDIA.TEXT:
                return this.renderText();
            case BOARD_MEDIA.IMAGE:
                return this.renderImage();
            case BOARD_MEDIA.VIDEO:
                return this.renderVideo();
            case BOARD_MEDIA.AUDIO:
                return this.renderAudio();
        }
    }

    render() {
        return (
            <TouchableOpacity style={{flex: 1}}
                              onPress={this.onPress}>
                {this.renderContents()}
            </TouchableOpacity>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

PostItem.defaultProps = {
    onPress: item => {
    },
};

PostItem.propTypes = {
    onPress: PropTypes.func,
    item: PropTypes.any.isRequired,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default PostItem;
