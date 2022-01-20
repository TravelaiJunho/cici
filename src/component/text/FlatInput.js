////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseStyle from "../../util/style/Base.style";
import s from './_style/Input.style';
import Input from '../../util/type/Input';
import BaseHelperLayout from "../_base/BaseHelperLayout";
import CustomInput from "./_base/CustomInput";
import {colors} from "../../util/Color";
import Common from "../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class FlatInput extends BaseComponent {

    ////////////////////
    // FUNCTION
    getText = _ => {
        return this.input.getText();
    }

    setText = text => {
        this.input.setText(text);
    }

    setBlur = _ => {
        this.input.setBlurByRef();
    }

    ////////////////////
    // RENDER
    render() {
        const {
            containerStyle, inputStyle,
            type, keyboardType, placeHolder, placeholderColor,
            required, label,
            infoMessage, showError, errorMessage,
            onChangeText,editable, useClear, onFocus
        } = this.props;
        return (
            <BaseHelperLayout containerStyle={containerStyle}
                              required={required}
                              label={label}
                              infoMessage={infoMessage}
                              showError={showError}
                              errorMessage={errorMessage}>
                {/* Input */}
                <CustomInput {...this.props}
                             inputStyle={inputStyle}
                             ref={ref => this.input = ref}
                             type={type}
                             placeHolder={placeHolder}
                             placeholderColor={placeholderColor}
                             keyboardType={keyboardType}
                             onChangeText={onChangeText}
                             editable={editable}
                             useClear={useClear}
                             onFocus={onFocus}/>

                {/* Border */}
                <View style={[s.layout_border, showError ? BaseStyle.error : s.color_border]}/>

            </BaseHelperLayout>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

FlatInput.defaultProps = {
    containerStyle: {},
    inputStyle: {},
    type: Input.NORMAL,
    keyboardType: Input.KEYBOARD_DEFAULT,
    placeHolder: '',
    placeholderColor: colors.gray,
    required: false,
    label: '',
    editable: true,
    useClear: true,
    ////
    infoMessage: '',
    showError: false,
    errorMessage: '',
    text: '',
    onChangeText: text => {
    },
    onFocus: event => {
    }
};

FlatInput.propTypes = {
    containerStyle: PropTypes.objectOf(PropTypes.any),
    inputStyle: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.oneOf(Input.LIST_TYPE),
    keyboardType: PropTypes.oneOf(Input.LIST_KEYBOARD),
    placeHolder: PropTypes.string,
    placeholderColor: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string,
    editable: PropTypes.bool,
    useClear: PropTypes.bool,
    ////
    infoMessage: PropTypes.string,
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default FlatInput;
