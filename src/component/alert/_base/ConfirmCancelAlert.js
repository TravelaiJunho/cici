////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {KeyboardAvoidingView, Modal, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";
// Local
import BaseComponent from '../../_base/BaseComponent';
import BaseText from "../../_base/BaseText";
import FontStyle from '../../../util/style/Font.style';
import s from '../_style/Alert.style';
import Common from '../../../util/Common';
import localize from '../../../util/Localize';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class ConfirmCancelAlert extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // RENDER
    render() {
        const {
            isVisible, keyboardAvoidingViewEnabled, children,
            title, buttonConfirm, buttonCancel,
            onConfirm, onCancel
        } = this.props
        return (
            <Modal transparent
                   visible={isVisible}>
                <KeyboardAvoidingView style={s.mask}
                                      behavior="padding"
                                      enabled={keyboardAvoidingViewEnabled}>
                    <View style={s.wrapper}>
                        <View style={s.container}>
                            {/* Title */}
                            {!Common.isEmpty(title) && <BaseText style={s.text_title}>{title}</BaseText>}
                            {/* Contents */}
                            <View style={s.contents_layout}>{children}</View>
                        </View>
                        {/* Bottom */}
                        <View style={s.bottom_button_layout}>
                            <View style={s.divider_horizontal}/>
                            <View style={s.button_layout}>
                                <TouchableOpacity style={s.button_single}
                                                  onPress={onCancel}>
                                    <BaseText style={FontStyle.BtnGrayCB}>{buttonCancel}</BaseText>
                                </TouchableOpacity>
                                <View style={s.divider_vertical}/>
                                <TouchableOpacity style={s.button_single}
                                                  onPress={onConfirm}>
                                    <BaseText style={FontStyle.BtnOrangeCH}>{buttonConfirm}</BaseText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

ConfirmCancelAlert.defaultProps = {
    keyboardAvoidingViewEnabled: Common.checkIOS(),
    isVisible: false,
    onConfirm: _ => {
    },
    onCancel: _ => {
    },
    title: '',
    buttonConfirm: localize.common.ok,
    buttonCancel: localize.common.cancel,
    children: <View/>
};

ConfirmCancelAlert.propTypes = {
    keyboardAvoidingViewEnabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    buttonConfirm: PropTypes.string,
    buttonCancel: PropTypes.string,
    children: PropTypes.node
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default ConfirmCancelAlert;
