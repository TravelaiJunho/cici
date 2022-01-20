////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {KeyboardAvoidingView, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../../_base/BaseComponent";
import BaseTextInput from "../../_base/BaseTextInput";
import FontStyle from '../../../util/style/Font.style';
import s from '../_style/CustomInput.style';
import {colors} from "../../../util/Color";
import Common from "../../../util/Common";
import Input from "../../../util/type/Input";
import Icon from "../../../util/Icon";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class CustomInput extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        const isPasswordType = this.isPasswordType(props.type);
        this.state = {
            text: props.text,
            // Focus
            isFocus: false,
            // Password
            isShowPassword: isPasswordType,
            // Clear
            isShowClear: false,
        }
    }

    ////////////////////
    // FUNCTION
    setFocus = isFocus => {
        this.setState({isFocus: isFocus}, _ => {
            if (isFocus) {
                if(this.getText()) {
                    this.setShowClear(this.getText().length > 0);
                }
            }
        });
    }

    setFocusByRef = _ => this.input.setFocus();
    setBlurByRef = _ => this.input.setBlur();

    setShowClear = isShow => {
        if (this.state.isShowClear !== isShow) {
            this.setState({isShowClear: isShow});
        }
    }

    // Text
    setText = (text, isShowClear = true) => {
        this.setState({
            text: text
        }, _ => {
            this.setShowClear(isShowClear ? !Common.isEmpty(text) : false);
            this.props.onChangeText && this.props.onChangeText(text);
        })
    }

    getText = _ => {
        return this.state.text;
    }

    // Password
    setShowPassword = isShow => {
        if (this.state.isShowPassword !== isShow) {
            this.setState({isShowPassword: isShow});
        }
    }

    isPasswordType = type => {
        return type === Input.PASSWORD;
    }

    ////////////
    // Event
    changeText = text => this.setText(text)

    onClear = _ => {
        this.setText('', this.state.isFocus);
        this.props.onClear && this.props.onClear();
    }

    ////////////////////
    // RENDER
    render() {
        const {
            inputStyle,
            type, keyboardType, editable,
            placeHolder, placeholderColor,
            useClear,
            onFocus, onBlur
        } = this.props;
        const {text, isShowPassword, isShowClear} = this.state;
        return (
            <KeyboardAvoidingView style={s.container}
                                  behavior={"padding"}
                                  enabled={Common.checkIOS()}>
                {/* Input */}
                <BaseTextInput {...this.props}
                               ref={ref => this.input = ref}
                               style={[s.input, FontStyle.Cnt13WhiteLN, inputStyle]}
                               keyboardType={keyboardType}
                               editable={editable}
                               placeholder={placeHolder}
                               placeholderTextColor={placeholderColor}
                               autoCorrect={false}
                               secureTextEntry={isShowPassword}
                               onChangeText={this.changeText}
                               onFocus={_ => {
                                   onFocus && onFocus(_);
                                   this.setFocus(true);
                               }}
                               onBlur={_ => {
                                   onBlur && onBlur();
                                   this.setFocus(false);
                               }}
                               value={text}/>
                {/* Clear */}
                {useClear && isShowClear &&
                <TouchableOpacity style={s.layout_button}
                                  onPress={this.onClear}
                                  hitSlop={{top: 4, left: 4, right: 4, bottom: 4}}>
                    <Icon.CancelOn size={14} color={colors.gray}/>
                </TouchableOpacity>}
                {/* Password */}
                {this.isPasswordType(type) &&
                <TouchableOpacity style={s.layout_button}
                                  onPress={_ => this.setShowPassword(!isShowPassword)}
                                  hitSlop={{top: 4, left: 4, right: 4, bottom: 4}}>
                    {isShowPassword
                        ? <Icon.Invisible size={14} color={colors.gray}/>
                        : <Icon.Visible size={14} color={colors.gray}/>}
                </TouchableOpacity>}
            </KeyboardAvoidingView>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

CustomInput.defaultProps = {
    inputStyle: {},
    type: Input.NORMAL,
    keyboardType: Input.KEYBOARD_DEFAULT,
    editable: true,
    placeHolder: '',
    placeholderColor: colors.gray,
    useClear: true,
    text: '',
    onChangeText: text => {
    },
    onClear: _ => {
    },
    onFocus: _ => {
    },
    onBlur: _ => {
    }
};

CustomInput.propTypes = {
    inputStyle: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.oneOf(Input.LIST_TYPE),
    keyboardType: PropTypes.oneOf(Input.LIST_KEYBOARD),
    editable: PropTypes.bool,
    placeHolder: PropTypes.string,
    placeholderColor: PropTypes.string,
    useClear: PropTypes.bool,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default CustomInput;
