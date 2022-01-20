////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseTextInput from "../_base/BaseTextInput";
import BaseHelperLayout from "../_base/BaseHelperLayout";
import CustomInput from "./_base/CustomInput";
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from './_style/Input.style';
import {colors} from "../../util/Color";
import Input from '../../util/type/Input';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PhoneInput extends BaseComponent {

    ////////////////////
    // FUNCTION
    getNation = _ => {
        return this.props.textNation;
    }

    getPhone = _ => {
        return this.input.getText();
    }

    ////////////////////
    // RENDER
    render() {
        const {
            containerStyle, required, label,
            showError, errorMessage,
            textPhone, textNation, placeHolderNation, placeHolderPhone, maxLength, onPressNation
        } = this.props;
        return (
            <BaseHelperLayout containerStyle={containerStyle}
                              required={required}
                              label={label}
                              showError={showError}
                              errorMessage={errorMessage}>
                <View style={s.container}>
                    <View style={s.layout_nation}>
                        <TouchableOpacity style={s.container}
                                          onPress={onPressNation}>
                            {/* Input */}
                            <BaseTextInput style={[s.input, FontStyle.Cnt13WhiteLN]}
                                           editable={false}
                                           placeholder={placeHolderNation}
                                           placeholderTextColor={colors.gray}
                                           pointerEvents={"none"}
                                           value={textNation}/>
                        </TouchableOpacity>

                        {/* Border */}
                        <View style={[s.layout_border, showError ? BaseStyle.error : s.color_border]}/>
                    </View>
                    <View style={s.layout_phone}>
                        {/* Input */}
                        <CustomInput ref={ref => this.input = ref}
                                     placeHolder={placeHolderPhone}
                                     maxLength={maxLength}
                                     keyboardType={Input.KEYBOARD_PHONE}
                                     text={textPhone}/>
                        {/* Border */}
                        <View style={[s.layout_border, showError ? BaseStyle.error : s.color_border]}/>
                    </View>
                </View>
            </BaseHelperLayout>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

PhoneInput.defaultProps = {
    containerStyle: {},
    required: false,
    label: '',
    ////
    showError: false,
    errorMessage: '',
    ////
    textPhone: '',
    textNation: '',
    placeHolderNation: '',
    placeHolderPhone: '',
    maxLength: 15,
    onPressNation: _ => {
    },
};

PhoneInput.propTypes = {
    containerStyle: PropTypes.objectOf(PropTypes.any),
    required: PropTypes.bool,
    label: PropTypes.string,
    ////
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
    ////
    textPhone: PropTypes.string,
    textNation: PropTypes.string,
    placeHolderNation: PropTypes.string,
    placeHolderPhone: PropTypes.string,
    maxLength: PropTypes.number,
    onPressNation: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default PhoneInput;