////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
// Local
import FontStyle from '../../util/style/Font.style';
import s from "./_style/SquareCheckBox.style";
import Icon from '../../util/Icon';
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";
import Common from "../../util/Common";
// Component
import BaseComponent from '../_base/BaseComponent';
import BaseCheckBox from "./_base/BaseCheckBox";
import BaseText from "../_base/BaseText";
import BaseTransText from "../_base/BaseTransText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class CircleCheckBox extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['checked'])) this.setCheck(nextProps.checked);
        if (Common.shouldUpdate(this.state, nextState, ['checked'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['disabled', 'autoTranslate','singleType'])) return true;

        return false;
    }

    ////////////////////
    // FUNCTION

    // Event
    onCheck = _ => {
        if(this.state.checked && this.props.singleType) return;
        this.cb.onCheck(checked => this.props.onChange(checked))
    }

    setCheck = check => {
        if(Common.isEmpty(check)) {
            check = !this.state.checked;
        }
        this.setState({
            checked: check
        })
    }

    ////////////////////
    // RENDER
    render() {
        const {
            hitSlop, onChange,
            title, titleMargin, iconSize,
            disabled,
            autoTranslate,
            singleType
        } = this.props;
        const {checked} = this.state;
        return (
            <View style={s.container}>
                <BaseCheckBox ref={ref => this.cb = ref}
                              disabled={disabled}
                              hitSlop={hitSlop}
                              checked={checked}
                              on={<Icon.ChoiceCircleOn size={iconSize} color={colors.orange}/>}
                              off={<Icon.ChoiceCircleOff size={iconSize} color={colors.white}/>}
                              onChange={onChange}
                              singleType={singleType}/>
                {!Common.isEmpty(title) &&
                <TouchableOpacity activeOpacity={1}
                                  disabled={disabled}
                                  onPress={this.onCheck}>
                    <BaseTransText autoTranslate={autoTranslate} style={[FontStyle.Cnt13WhiteLN, {marginLeft: Layout.UISize(titleMargin)}]}>{title}</BaseTransText>
                </TouchableOpacity>}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

CircleCheckBox.defaultProps = {
    hitSlop: 0,
    checked: false,
    onChange: checked => {
    },
    title: '',
    titleMargin: 10,
    iconSize: 14,
    disabled: false,
    autoTranslate:false,
    singleType:false,
};

CircleCheckBox.propTypes = {
    hitSlop: PropTypes.number,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    title: PropTypes.string,
    titleMargin: PropTypes.number,
    iconSize: PropTypes.number,
    disabled: PropTypes.bool,
    autoTranslate: PropTypes.bool,
    singleType: PropTypes.bool,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default CircleCheckBox;
