////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../../_base/BaseComponent";
import FontStyle from '../../../util/style/Font.style';
import s from "../_style/BaseTouchableButton.style";
import BaseText from "../../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseTouchableButton extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        const {buttonStyle, title, onPress} = this.props;
        return (
            <TouchableOpacity style={[s.layout_button, buttonStyle]}
                              onPress={onPress}>
                <BaseText style={FontStyle.BtnWhiteCH}>{title}</BaseText>
            </TouchableOpacity>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseTouchableButton.defaultProps = {
    buttonStyle: {},
    title: '',
    onPress: _ => {
    }
};

BaseTouchableButton.propTypes = {
    buttonStyle: PropTypes.objectOf(PropTypes.any),
    title: PropTypes.string,
    onPress: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseTouchableButton;