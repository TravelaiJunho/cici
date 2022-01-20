////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";
////////////////////
// Local
import FontStyle from '../../util/style/Font.style';
import s from './_style/NotiHeader.style';
import {colors} from "../../util/Color";
import Icon from "../../util/Icon";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import BaseHeader from "./_base/BaseHeader";
import Screen from "../../util/type/Screen";
import BaseImage from "../_base/BaseImage";
import {IMAGE_SUBTAGVR} from "../../../assets";
import {Translate} from "../../data/http/Translate";
import TranslateButton from "../button/TranslateButton";
import BaseTransText from "../_base/BaseTransText";
import Layout from "../../util/Layout";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TranslateHeader extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // RENDER
    onBackPress = () => {
        this.props.onBackPress && this.props.onBackPress()
    }
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

    renderRight = (onPress, translateEnabled) => {
        return (
            <View style={s.layout_right}>
                <TranslateButton useIcon={true} enabled={translateEnabled} onEnabled={enabled=>{
                    onPress && onPress(enabled)
                }} />
            </View>
        );
    }

    renderCenter = (title, onPress) => {
        return (
            <View
                //style={s.layout_center}
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: Layout.UISize(60),
                    marginRight: Layout.UISize(60),
                }}
            >
                {typeof title == 'string'
                    ? <BaseTransText
                        autoTranslate={this.props.translateEnabled} style={FontStyle.HeadlineCntWhiteCH}>{title}</BaseTransText>
                    : title()}
            </View>);
    }

    render() {
        const {
            skipAndroidStatusBar,
            title, onBackPress, onPressTranslate, useBorder,
            translateEnabled
        } = this.props;
        return (
            <BaseHeader skipAndroidStatusBar={skipAndroidStatusBar} useBorder={useBorder}>
                <View style={s.container}>
                    {/* Left */}
                    {this.renderLeft(onBackPress)}
                    {/* Center */}
                    {!Common.isEmpty(title) ? this.renderCenter(title) : <View/>}
                    {/* Right */}
                    {this.renderRight(onPressTranslate, translateEnabled)}
                </View>
            </BaseHeader>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

TranslateHeader.defaultProps = {
    skipAndroidStatusBar: true,
    ////
    onBackPress: _ => {
    },
    title: '',
    translateEnabled: false,
    onPressTranslate: null,
    useBorder: true,
};

TranslateHeader.propTypes = {
    skipAndroidStatusBar: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onBackPress: PropTypes.func,
    translateEnabled: PropTypes.bool,
    onPressTranslate: PropTypes.func,
    useBorder: PropTypes.bool,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default TranslateHeader;
