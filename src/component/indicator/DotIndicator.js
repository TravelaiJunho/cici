////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import _ from 'lodash';
////////////////////
// Local
import s from './_style/DotIndicator.style';
import BaseComponent from "../_base/BaseComponent";
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class DotIndicator extends BaseComponent {

    render() {
        const {totalCount, selectIndex} = this.props;
        if (totalCount > 0) {
            return (
                <View style={s.container}>
                    {_.range(0, totalCount)
                        .map((value, index) =>
                            <View key={index}
                                  style={[s.layout_dot, {
                                      marginLeft: index === 0 ? 0 : Layout.UISize(5),
                                      backgroundColor: selectIndex === value ? colors.orange : colors.gray
                                  }]}/>)}
                </View>)
        }
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

DotIndicator.defaultProps = {
    totalCount: 0,
    selectIndex: 0,
};

DotIndicator.propTypes = {
    totalCount: PropTypes.number,
    selectIndex: PropTypes.number,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default DotIndicator;