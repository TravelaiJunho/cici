////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {Platform, View} from "react-native";
import PropTypes from "prop-types";
// Local
import BottomSheet from "../../_common/BottomSheet";
import KeyboardListener from "../../_common/KeyboardListener";
import FontStyle from '../../../util/style/Font.style';
import s from "../_style/BaseBottomSheet.style";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import Common from '../../../util/Common';
import BaseComponent from '../../_base/BaseComponent';
import BaseText from "../../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseRadiusBottomSheet extends BaseComponent {

    bs = React.createRef()

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            height: this.getFixHeight()
        }
    }

    ////////////////////
    // FUNCTION
    getFixHeight = _ => {
        const {isUseTitle, height} = this.props;
        return isUseTitle
            ? height + Layout.getBottomSpace() + Layout.UISize(46) // Title = 45 1
            : height + Layout.getBottomSpace()
    }

    getCustomStyle = (containerColor, backgroundColor) => {
        return {
            container: {
                backgroundColor: containerColor,
                borderTopLeftRadius: Layout.UISize(16),
                borderTopRightRadius: Layout.UISize(16),
                ...Platform.select({
                    ios: {
                        shadowColor: colors.dim,
                        shadowOffset: {
                            width: 5,
                            height: 5,
                        },
                        shadowRadius: 5,
                        shadowOpacity: 0.8
                    },
                    android: {
                        elevation: 5
                    },
                }),
            },
            // mask: {},
            wrapper: {backgroundColor: backgroundColor},
        }
    }

    setHeight = _ => this.bs.setHeight(this.getFixHeight());

    // Event
    open = _ => this.bs.open();
    close = _ => this.bs.close(null, _ => this.setHeight());

    onKeyboardWillShow = _ => this.bs.setHeight(this.getFixHeight() - Layout.getBottomSpace());
    onKeyboardWillHide = _ => this.setHeight();

    ////////////////////
    // RENDER
    render() {
        const {height} = this.state;
        const {
            isModal, title, isUseTitle, enableKeyboard, isUseKeyboardEvent,
            containerColor, backgroundColor, onOpen, onClose, children
        } = this.props;
        return (
            <BottomSheet ref={ref => this.bs = ref}
                         isModal={isModal}
                         height={height}
                         keyboardAvoidingViewEnabled={enableKeyboard}
                         customStyles={this.getCustomStyle(containerColor, backgroundColor)}
                         onOpen={onOpen}
                         onClose={onClose}>
                {/* Keyboard Event */}
                {isUseKeyboardEvent &&
                <KeyboardListener onWillShow={this.onKeyboardWillShow}
                                  onWillHide={this.onKeyboardWillHide}/>}
                {/* Title */}
                {isUseTitle &&
                <View>
                    <View style={s.title_layout}>
                        <BaseText style={FontStyle.Cnt13GrayCB}>{title}</BaseText>
                    </View>
                    <View style={s.border_layout}/>
                </View>}

                {/* Contents */}
                {children}
            </BottomSheet>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseRadiusBottomSheet.defaultProps = {
    isModal: true,
    title: '',
    isUseTitle: true,
    enableKeyboard: Common.checkIOS(),
    isUseKeyboardEvent: false,
    height: 0,
    containerColor: colors.grayDark,
    backgroundColor: colors.dim,
    onOpen: _ => {
    },
    onClose: _ => {
    },
};

BaseRadiusBottomSheet.propTypes = {
    isModal: PropTypes.bool,
    title: PropTypes.string,
    isUseTitle: PropTypes.bool,
    enableKeyboard: PropTypes.bool,
    isUseKeyboardEvent: PropTypes.bool,
    height: PropTypes.number,
    containerColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseRadiusBottomSheet;
