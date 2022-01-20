////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {KeyboardAvoidingView, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";
////////////
// Local
import FontStyle from '../../util/style/Font.style';
import s from './_style/AudioTitlePopup.style';
import {colors} from "../../util/Color";
import Icon from "../../util/Icon";
import Layout from "../../util/Layout";
import Common from "../../util/Common";
// Component
import BaseComponent from '../../component/_base/BaseComponent';
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class AudioTitlePopup extends BaseComponent {

    MAX_HEIGHT = Layout.UISize(420);

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        }
    }

    ////////////////////
    // FUNCTION
    setHeight = height => {
        if (this.state.height !== height) {
            this.setState({height: height});
        }
    }

    ////////////////////
    // RENDER
    renderTitle = _ => {
        const {title} = this.props;
        const {height} = this.state;
        if (this.MAX_HEIGHT < height) {
            return (
                <ScrollView style={{maxHeight: this.MAX_HEIGHT}}
                            overScrollMode={"never"}>
                    <BaseText style={[FontStyle.CntNoticeWhiteCN, {textAlign: 'left'}]}
                              onLayout={e => this.setHeight(e.nativeEvent.layout.height)}>{title}</BaseText>
                </ScrollView>);
        } else {
            return (
                <BaseText style={[FontStyle.CntNoticeWhiteCN, {textAlign: 'left'}]}
                          onLayout={e => this.setHeight(e.nativeEvent.layout.height)}>{title}</BaseText>);
        }
    }

    render() {
        const {isVisible, onBackPress} = this.props
        return (
            <Modal transparent
                // onRequestClose={onBackPress}
                   visible={isVisible}>
                <KeyboardAvoidingView style={s.mask}
                                      behavior="padding"
                                      enabled={Common.checkIOS()}>
                    {/* Title */}
                    <View style={s.layout_title}>{this.renderTitle()}</View>
                    {/* Button */}
                    <TouchableOpacity style={s.button_close}
                                      onPress={onBackPress}>
                        <Icon.Close size={20} color={colors.white}/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

AudioTitlePopup.defaultProps = {
    isVisible: false,
    onBackPress: _ => {
    },
};

AudioTitlePopup.propTypes = {
    isVisible: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onBackPress: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default AudioTitlePopup;
