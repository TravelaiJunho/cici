////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {View} from "react-native";
import PropTypes from "prop-types";
// Local
import BaseComponent from '../../_base/BaseComponent';
import BottomSheet from "../../_common/BottomSheet";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import Common from '../../../util/Common';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseNormalBottomSheet extends BaseComponent {

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
        return this.props.height + Layout.getBottomSpace();
    }

    getCustomStyle = (containerColor, backgroundColor) => {
        return {
            container: {backgroundColor: containerColor},
            wrapper: {backgroundColor: backgroundColor},
        }
    }

    setHeight = _ => this.bs.setHeight(this.getFixHeight());

    // Event
    open = _ => this.bs.open();
    close = _ => this.bs.close(null, _ => this.setHeight());

    // onKeyboardWillShow = _ => this.bs.setHeight(this.getFixHeight() - Layout.getBottomSpace());
    // onKeyboardWillHide = _ => this.setHeight();

    ////////////////////
    // RENDER
    render() {
        const {height} = this.state;
        const {
            isModal, enableKeyboard, // isUseKeyboardEvent,
            containerColor, backgroundColor, onOpen, onClose, children
        } = this.props;
        return (
            <BottomSheet ref={ref => this.bs = ref}
                         isModal={isModal}
                         height={height}
                         keyboardAvoidingViewEnabled={enableKeyboard}
                         customStyles={this.getCustomStyle(containerColor, backgroundColor)}
                // closeOnPressMask={false}
                // closeOnPressBack={false}
                         onOpen={onOpen}
                         onClose={onClose}>
                {/* Keyboard Event */}
                {/*{isUseKeyboardEvent &&*/}
                {/*<KeyboardListener onWillShow={this.onKeyboardWillShow}*/}
                {/*                  onWillHide={this.onKeyboardWillHide}/>}*/}
                {/* Contents */}
                <View style={{height: height, paddingBottom: Layout.getBottomSpace()}}>
                    {children}
                </View>
            </BottomSheet>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseNormalBottomSheet.defaultProps = {
    isModal: true,
    enableKeyboard: Common.checkIOS(),
    isUseKeyboardEvent: false,
    height: 0,
    containerColor: colors.black,
    backgroundColor: colors.dim,
    onOpen: _ => {
    },
    onClose: _ => {
    },
};

BaseNormalBottomSheet.propTypes = {
    isModal: PropTypes.bool,
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

export default BaseNormalBottomSheet;
