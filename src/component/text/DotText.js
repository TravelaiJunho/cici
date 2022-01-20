////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Text, View} from "react-native";
////////////////////
// Local
import BaseComponent from "./../_base/BaseComponent";
import PropTypes from "prop-types";
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class DotText extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        const {dotContainerSize, dotSize, rightMargin, dotColor} = this.props;
        return (
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                <View
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width: dotContainerSize,
                        height: dotContainerSize,
                        marginRight:rightMargin,
                    }}
                >
                    <View style={{
                        width:dotSize,
                        height:dotSize,
                        borderRadius:dotSize*0.5,
                        backgroundColor: dotColor}}
                    />
                </View>

                <Text  {...this.props} style={[this.props.style]} />
            </View>
        )
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

DotText.defaultProps = {
    dotContainerSize: Layout.UISize(5),
    dotSize: Layout.UISize(5),
    rightMargin: Layout.UISize(0),
    dotColor: colors.white,
};

DotText.propTypes = {
    dotContainerSize: PropTypes.number,
    dotSize: PropTypes.number,
    rightMargin: PropTypes.number,
    dotColor: PropTypes.string
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default DotText;
