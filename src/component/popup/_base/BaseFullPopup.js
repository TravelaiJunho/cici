////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {KeyboardAvoidingView, Modal, View} from 'react-native';
import PropTypes from "prop-types";
// Local
import BaseComponent from '../../_base/BaseComponent';
import base from '../../../util/style/Base.style';
import KeyboardListener from "../../_common/KeyboardListener";
import Layout from "../../../util/Layout";
import Common from '../../../util/Common';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseFullPopup extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        // this.state = {
        //     keyboardAreaHeight: this.getFixHeight()
        // }
    }

    ////////////////////
    // FUNCTION
    setKeyboardAreaHeight = height => this.setState({keyboardAreaHeight: height})

    getFixHeight = _ => {
        return this.props.keyboardAreaHeight + Layout.getBottomSpace()
    }

    // Event
    onKeyboardWillShow = _ => this.setKeyboardAreaHeight(this.getFixHeight() - Layout.getBottomSpace())
    onKeyboardWillHide = _ => this.setKeyboardAreaHeight(this.getFixHeight())

    ////////////////////
    // RENDER
    render() {
        const {
            isVisible, isUseKeyboardEvent, keyboardAvoidingViewEnabled,
            // keyboardAreaVisible, keyboardAreaColor, keyboardArea,
            onBackPress, children
        } = this.props
        // const {keyboardAreaHeight} = this.state;
        return (
            <Modal visible={isVisible}
                   animationType={'fade'}
                   onRequestClose={onBackPress}>
                <KeyboardAvoidingView style={base.container}
                                      behavior="padding"
                                      enabled={keyboardAvoidingViewEnabled}>
                    {/* Keyboard Event */}
                    {isUseKeyboardEvent &&
                    <KeyboardListener onWillShow={this.onKeyboardWillShow}
                                      onWillHide={this.onKeyboardWillHide}/>}
                    {/* Contents */}
                    {children}
                    {/* Keyboard Area */}
                    {/*{keyboardAreaVisible &&*/}
                    {/*<View style={{height: keyboardAreaHeight, backgroundColor: keyboardAreaColor}}>*/}
                    {/*    {keyboardArea}*/}
                    {/*</View>}*/}
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseFullPopup.defaultProps = {
    keyboardAvoidingViewEnabled: Common.checkIOS(),
    isVisible: false,
    isUseKeyboardEvent: false,
    // keyboardAreaVisible: false,
    // keyboardAreaHeight: 0,
    // keyboardAreaColor: util.colors.bg_mainred,
    // keyboardArea: <View/>,
    onBackPress: _ => {
    },
    children: <View/>
};

BaseFullPopup.propTypes = {
    keyboardAvoidingViewEnabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    isUseKeyboardEvent: PropTypes.bool,
    // keyboardAreaVisible: PropTypes.bool,
    // keyboardAreaHeight: PropTypes.number,
    // keyboardAreaColor: PropTypes.string,
    // keyboardArea: PropTypes.node,
    onBackPress: PropTypes.func,
    children: PropTypes.node
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseFullPopup;
