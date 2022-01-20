////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseHelperLayout from "../_base/BaseHelperLayout";
import BaseTextInput from "../_base/BaseTextInput";
import BaseStyle from "../../util/style/Base.style";
import s from './_style/Input.style';
import {colors} from "../../util/Color";
import FontStyle from "../../util/style/Font.style";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SelectInput extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    getText = _ => {
        return this.props.text;
    }

    ////////////////////
    // RENDER
    render() {
        const {
            containerStyle, required, label,
            showError, errorMessage,
            text, placeHolder, rightIcon, onPress
        } = this.props;
        return (
            <BaseHelperLayout containerStyle={containerStyle}
                              required={required}
                              label={label}
                              showError={showError}
                              errorMessage={errorMessage}>
                <TouchableOpacity style={s.container}
                                  onPress={onPress}>
                    {/* Input */}
                    <BaseTextInput style={[s.input, FontStyle.Cnt13WhiteLN]}
                                   editable={false}
                                   placeholder={placeHolder}
                                   placeholderTextColor={colors.gray}
                                   pointerEvents={"none"}
                                   value={text}/>
                    {/* Icon */}
                    <View style={s.layout_button}>
                        {rightIcon}
                    </View>
                </TouchableOpacity>

                {/* Border */}
                <View style={[s.layout_border, showError ? BaseStyle.error : s.color_border]}/>
            </BaseHelperLayout>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

SelectInput.defaultProps = {
    containerStyle: {},
    required: false,
    label: '',
    ////
    showError: false,
    errorMessage: '',
    ////
    text: '',
    placeHolder: '',
    rightIcon: <View/>,
    onPress: _ => {
    }
};

SelectInput.propTypes = {
    containerStyle: PropTypes.objectOf(PropTypes.any),
    required: PropTypes.bool,
    label: PropTypes.string,
    ////
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
    ////
    text: PropTypes.string,
    placeHolder: PropTypes.string,
    rightIcon: PropTypes.node,
    onPress: PropTypes.func
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default SelectInput;