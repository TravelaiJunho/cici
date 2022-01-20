////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import BaseHeader from "./_base/BaseHeader";
import FontStyle from '../../util/style/Font.style';
import s from './_style/BackHeader.style';
import Common from "../../util/Common";
import {colors} from "../../util/Color";
import Icon from "../../util/Icon";
// Component

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BackHeader extends BaseComponent {

    ////////////////////
    // RENDER
    renderLeft = onPress => {
        return (
            <TouchableOpacity onPress={onPress}
                              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                              style={{
                                  ...Platform.select({
                                      ios: {
                                          shadowColor: colors.grayDark,
                                          shadowOffset: {width: 1, height: 1,},
                                          shadowOpacity: 1,
                                          shadowRadius: 2,
                                      },
                                      android: {
                                          elevation: 8,
                                      },
                                  })
                              }}>
                <Icon.Back size={20}
                           color={colors.white}/>
            </TouchableOpacity>);
    }

    renderRight = (title, onPress) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <BaseText style={FontStyle.BtnMintRN}>{title}</BaseText>
            </TouchableOpacity>);
    }

    renderCenter = title => {
        let titleType = typeof title;
        switch(titleType) {
            case "string":{
                return (
                    <View style={s.layout_center}>
                        <BaseText style={FontStyle.HeadlineCntWhiteCH}>{title}</BaseText>
                    </View>);
            }
            case "function": {
                return (
                    <View style={s.layout_center}>
                        {
                            title && title()
                        }
                    </View>);

            }
        }
    }

    render() {
        const {
            skipAndroidStatusBar,
            title, onBackPress, rightTitle, onRightPress, useBorder,
            style
        } = this.props;
        return (
            <BaseHeader style={style} skipAndroidStatusBar={skipAndroidStatusBar} useBorder={useBorder}>
                {/* Center */}
                {this.renderCenter(title)}
                <View style={s.layout_buttons}>
                    {/* Left */}
                    {this.renderLeft(onBackPress)}
                    {/* Right */}
                    {!Common.isEmpty(rightTitle) && this.renderRight(rightTitle, onRightPress)}
                </View>
            </BaseHeader>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BackHeader.defaultProps = {
    skipAndroidStatusBar: true,
    ////
    title: '',
    rightTitle: '',
    onBackPress: _ => {
    },
    onRightPress: _ => {
    },
    useBorder: true,
    style: {}
};

BackHeader.propTypes = {
    skipAndroidStatusBar: PropTypes.bool,
    ////
    //title: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
    rightTitle: PropTypes.string,
    onBackPress: PropTypes.func,
    onRightPress: PropTypes.func,
    useBorder: PropTypes.bool,
    style: PropTypes.object,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BackHeader;
