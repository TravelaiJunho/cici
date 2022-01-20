////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import Video from "react-native-video";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from '../../_style/MediaVideo.style';
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import Common from "../../../util/Common";
// Component
import BaseScreen from "../../_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import BaseImage from "../../../component/_base/BaseImage";
// Asset
import {IMAGE_ICON_PLAY} from "../../../../assets";
import {connect} from "react-redux";
import TranslateHeader from "../../../component/header/TranslateHeader";
import {Translate} from "../../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaVideo extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isPause: true,
            // translate
            autoTrans: false,
            transTitle: null,
        }
    }

    ////////////////////
    // FUNCTION
    setPause = pause => {
        this.setState({isPause: pause})
    }

    // getHeight = (width, height) => {
    //     return {
    //         width: Layout.DEVICE_WIDTH,
    //         height: Layout.UISize(height)
    //     }
    // }

    getVideoData = list => {
        if (Common.checkListSize(list)) {
            return list[list.length - 1];
        }
        return null;
    }

    ////////////////////
    // RENDER
    renderPause = url => {
        return (
            <View style={s.layout_pause}>
                {/* Image */}
                <BaseImage style={{flex: 1}}
                           resizeMode={'contain'}
                           source={{uri: url}}/>
                {/* Button */}
                <TouchableOpacity style={s.layout_button}
                                  onPress={_ => this.setPause(false)}>
                    <BaseImage style={s.image_button}
                               resizeMode={'contain'}
                               source={IMAGE_ICON_PLAY}/>
                </TouchableOpacity>
            </View>);
    }

    render() {
        const {item} = this.props.route.params;
        if (Common.isEmpty(item)) return null;
        const {isPause, autoTrans, transTitle} = this.state;
        const {title, image_url, videos} = item;
        const data = this.getVideoData(videos);
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
                <View style={s.layout_contents}>
                    <Video style={s.video}
                           resizeMode={'contain'}
                           source={{uri: data.url}}
                           playInBackground={false}
                           paused={isPause}
                           controls={true}
                           onReadyForDisplay={_ => {
                               if (Common.checkAndroid()) this.setPause(false)
                           }}/>
                    {isPause && this.renderPause(image_url)}
                </View>
                {/* Border */}
                <View style={s.layout_border}/>
                {/* Title */}
                <View style={s.layout_title}>
                    <BaseText style={FontStyle.CntTitleGrayDkLH}>Video</BaseText>
                    <BaseText style={[FontStyle.Cnt13WhiteLN, {marginTop: Layout.UISize(5)}]}
                              numberOfLines={3}>{transTitle ? transTitle : title}</BaseText>
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
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(MediaVideo);
