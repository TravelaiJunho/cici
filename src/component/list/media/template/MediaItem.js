////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
////////////////////
// Local
import s from '../../_style/MediaItem.style';
import Icon from "../../../../util/Icon";
import {colors} from "../../../../util/Color";
import {MEDIA_RESPONSE} from '../../../../util/type/Media';
import {THUMBNAIL_LEVEL} from "../../../../util/Constants";
import Common from '../../../../util/Common';
// Component
import BaseComponent from '../../../_base/BaseComponent';
import BaseImage from "../../../_base/BaseImage";
// Asset
import {IMAGE_LOGO_DANITY} from "../../../../../assets";
import GifImage from "@lowkey/react-native-gif";
import Layout from "../../../../util/Layout";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaItem extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    getImageUrl = _ => {
        const {thumbnails, image_url} = this.props.item;
        if (Common.checkListSize(thumbnails)) {
            return thumbnails[THUMBNAIL_LEVEL.GRID].image_url;
        }
        return image_url;
    }

    getIcon = type => {
        switch (type) {
            case MEDIA_RESPONSE.IMAGE_WALLPAPER:
                return <Icon.WallpaperOn size={16} color={colors.orange}/>
            case MEDIA_RESPONSE.AUDIO_FILE:
                return <Icon.VoiceOn size={16} color={colors.orange}/>
            case MEDIA_RESPONSE.VIDEO_FILE:
            case MEDIA_RESPONSE.VIDEO_YOUTUBE:
                return <Icon.VideoOn size={16} color={colors.orange}/>
            default: // MEDIA_RESPONSE.IMAGE_DEFAULT
                return null;
        }
    }

    // Event
    onPress = _ => {
        this.props.onPress && this.props.onPress(this.props.item);
    }

    ////////////////////
    // RENDER
    renderProductOverlay = score => {
        const {media_type} = this.props.item;
        return (
            <View style={s.overlay_container}>
                {/* Icon */}
                <View style={s.icon_layout}>
                    {this.getIcon(media_type)}
                </View>
            </View>);
    }

    renderImage = _ => {
        let url = this.getImageUrl();
        if (!Common.isEmpty(url)) {
            if(url.includes('.gif')) {
                return(
                        <GifImage
                            source={{uri: url}}
                            style={s.image_layout}
                        >
                        </GifImage>

                )
            }else{
                return <BaseImage style={s.image_layout}
                               source={Common.isEmpty(url) ? IMAGE_LOGO_DANITY : {uri: url}}/>;
            }
        }

        // return <BaseImage style={s.image_layout}
        //                   source={Common.isEmpty(url) ? IMAGE_LOGO_DANITY : {uri: url}}/>;
    };

    render() {
        return (
            <TouchableOpacity style={{flex: 1}}
                              onPress={this.onPress}>
                {this.renderImage()}
                {this.renderProductOverlay()}
            </TouchableOpacity>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

MediaItem.defaultProps = {
    onPress: item => {
    },
};

MediaItem.propTypes = {
    onPress: PropTypes.func,
    item: PropTypes.any.isRequired,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default MediaItem;
