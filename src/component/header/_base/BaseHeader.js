////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../../_base/BaseComponent";
import BaseStyle from '../../../util/style/Base.style';
import s from '../_style/BaseHeader.style';
import Layout from "../../../util/Layout";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseHeader extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        const {skipAndroidStatusBar, children, useBorder, style} = this.props;

        let header =  Layout.getStatusBarHeight(false,true);
        header = 0;
        return (
            <View style={[BaseStyle.header, {marginTop: header}, style]}>
                {/* {marginTop: Layout.getStatusBarHeight(skipAndroidStatusBar)},*/}
                {/* Contents */}
                <View style={s.contents}>
                    {children}
                </View>
                {/* Border */}
                {useBorder && <View style={s.border}/>}
            </View>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseHeader.defaultProps = {
    skipAndroidStatusBar: true,
    useBorder: true,
    style: {}
};

BaseHeader.propTypes = {
    skipAndroidStatusBar: PropTypes.bool,
    useBorder: PropTypes.bool,
    style: PropTypes.object
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseHeader;
