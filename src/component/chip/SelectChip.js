////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from '../../util/style/Font.style';
import s from "./_style/SelectChip.style";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SelectChip extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        const {customStyle, title, isSelect, isSelected, onPress, customButtonStyle} = this.props;
        return (
            <View style={customStyle}>
                {isSelected
                    ? <TouchableOpacity onPress={onPress}
                                        style={[s.layout_button, isSelect ? s.button_select : s.button_unselect, customButtonStyle]}>
                        <BaseText style={isSelect ? FontStyle.Cnt13OrangeCB : FontStyle.Cnt13WhiteCN}>{title}</BaseText>
                    </TouchableOpacity>
                    : <View style={[s.layout_button, isSelect ? s.button_select : s.button_disable, customButtonStyle]}>
                        <BaseText style={isSelect ? FontStyle.Cnt13OrangeCB : FontStyle.Cnt13GrayDkCN}>{title}</BaseText>
                    </View>}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

SelectChip.defaultProps = {
    customStyle: {},
    customButtonStyle: {},
    ////
    title: '',
    isSelect: false,
    isSelected: true,
    onPress: _ => {
    }
};

SelectChip.propTypes = {
    customStyle: PropTypes.objectOf(PropTypes.any),
    customButtonStyle: PropTypes.objectOf(PropTypes.any),
    ////
    title: PropTypes.string,
    isSelect: PropTypes.bool,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default SelectChip;