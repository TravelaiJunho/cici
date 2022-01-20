////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../../_base/BaseComponent";
import FontStyle from '../../../util/style/Font.style';
import s from "../_style/BaseSelectButton.style";
import Layout from "../../../util/Layout";
import BaseButton from "../../_base/BaseButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseSelectButton extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        const {
            customStyle, height, title,
            showError,
            isSelect, onPress
        } = this.props;
        return (
            <View style={[s.container, customStyle]}>
                <BaseButton onPress={onPress}
                    // type={isSelect ? "solid" : "outline"}
                            type={"clear"}
                            buttonStyle={[s.layout_button,
                                showError ? s.button_error :
                                    isSelect ? s.button_select : s.button_unselect,
                                {height: Layout.UISize(height)}]}
                            title={title}
                            titleStyle={isSelect ? FontStyle.BtnWhiteCH : FontStyle.Cnt13WhiteCN}/>
                {/*<TouchableOpacity onPress={onPress}*/}
                {/*                  style={[s.layout_button,*/}
                {/*                      isSelect ? s.button_select : s.button_unselect,*/}
                {/*                      {height: Layout.UISize(height)}]}>*/}
                {/*    <BaseText style={[s.text_title, isSelect ? s.text_select : s.text_unselect]}>{title}</BaseText>*/}
                {/*</TouchableOpacity>*/}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseSelectButton.defaultProps = {
    customStyle: {},
    height: 40,
    ////
    title: '',
    showError: false,
    isSelect: false,
    onPress: _ => {
    }
};

BaseSelectButton.propTypes = {
    customStyle: PropTypes.objectOf(PropTypes.any),
    height: PropTypes.number,
    ////
    title: PropTypes.string,
    showError: PropTypes.bool,
    isSelect: PropTypes.bool,
    onPress: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseSelectButton;