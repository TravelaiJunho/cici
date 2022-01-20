////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
// Local
import FontStyle from '../../util/style/Font.style';
import s from './_style/Chip.style';
import BaseComponent from '../_base/BaseComponent';
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Chip extends BaseComponent {

    ////////////////////
    // FUNCTION
    onSelect = _ => this.props.onSelect && this.props.onSelect(this.props.index);

    ////////////////////
    // RENDER
    render() {
        const {word, index, select} = this.props;
        let isSelect = index === select;
        return (
            <TouchableOpacity onPress={this.onSelect}>
                <View style={[s.container, isSelect ? s.layout_select : s.layout_unselect, this.props.chipStyle]}>
                    {/*<BaseText style={FontStyle.BtnWhiteCB}>{word.replace(/(^\s*)|(\s*$)/gi, "")}</BaseText>*/}
                    <BaseText style={FontStyle.BtnWhiteCB}>{word}</BaseText>
                </View>
            </TouchableOpacity>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

Chip.defaultProps = {
    onSelect: index => {
    },
    word: '',
    index: 0,
    select: 0,
};

Chip.propTypes = {
    chipStyle: PropTypes.any,
    onSelect: PropTypes.func,
    word: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    select: PropTypes.number,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Chip;
