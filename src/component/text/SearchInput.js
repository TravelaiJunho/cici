////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import s from './_style/SearchInput.style';
import {colors} from "../../util/Color";
import Icon from "../../util/Icon";
import BaseComponent from "../_base/BaseComponent";
import CustomInput from "./_base/CustomInput";
import Common from "../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SearchInput extends BaseComponent {

    ////////////////////
    // FUNCTION
    setText = (text, isShowClear = true) => this.input.setText(text, isShowClear);

    // Event
    onSearch = text => this.props.onSubmitText && this.props.onSubmitText(text);

    onChangeEditing = isEditing => this.props.onEditing && this.props.onEditing(isEditing);

    ////////////////////
    // RENDER
    render() {
        const {text, placeHolder, onChangeText, onClear} = this.props;
        return (
            <View style={s.container}>
                {/* Icon */}
                <TouchableOpacity style={s.layout_icon}
                                  onPress={_ => this.input.setFocusByRef()}>
                    <Icon.Search size={20}
                                 color={colors.white}/>
                </TouchableOpacity>
                {/* Input */}
                <CustomInput ref={ref => this.input = ref}
                             text={text}
                             placeHolder={placeHolder}
                             onChangeText={onChangeText}
                             onClear={onClear}
                             onFocus={_ => this.onChangeEditing(true)}
                             onBlur={_ => this.input.setShowClear(false)}
                             onSubmitEditing={e => this.onSearch(e.nativeEvent.text)}/>
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

SearchInput.defaultProps = {
    placeHolder: '',
    text: '',
    onEditing: isEditing => {
    },
    onSubmitText: text => {
    },
    onChangeText: text => {
    },
    onClear: _ => {
    }
};

SearchInput.propTypes = {
    placeHolder: PropTypes.string,
    text: PropTypes.string,
    onEditing: PropTypes.func,
    onSubmitText: PropTypes.func,
    onChangeText: PropTypes.func,
    onClear: PropTypes.func
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default SearchInput;