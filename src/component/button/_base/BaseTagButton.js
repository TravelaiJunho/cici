////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from '../../../util/style/Font.style';
import s from "../_style/BaseTagButton.style";
// Component
import BaseComponent from "../../_base/BaseComponent";
import BaseText from "../../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseTagButton extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        const {
            customStyle, // height,
            title, isSelect, onPress, customButtonStyle
        } = this.props;
        return (
            <View style={[s.container, customStyle]}>
                <TouchableOpacity onPress={onPress}
                                  style={[s.layout_button, // {height: Layout.UISize(height)},
                                      isSelect ? s.button_select : s.button_unselect, customButtonStyle]}>
                    <BaseText style={isSelect ? FontStyle.Cnt13OrangeCB : FontStyle.Cnt13WhiteCN}>{title}</BaseText>
                </TouchableOpacity>
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseTagButton.defaultProps = {
    customStyle: {},
    customButtonStyle:{},
    height: 30,
    ////
    title: '',
    isSelect: false,
    onPress: _ => {
    }
};

BaseTagButton.propTypes = {
    customStyle: PropTypes.objectOf(PropTypes.any),
    customButtonStyle: PropTypes.objectOf(PropTypes.any),
    height: PropTypes.number,
    ////
    title: PropTypes.string,
    isSelect: PropTypes.bool,
    onPress: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseTagButton;