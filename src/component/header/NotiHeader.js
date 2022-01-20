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

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class NotiHeader extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // RENDER

    renderRight = (onPress, isAlarm) => {
        return (
            <View style={s.layout_right}>
                <TouchableOpacity
                    onPress={()=>{
                    console.warn('touch')
                    onPress && onPress()
                }}>
                    <Icon.Bell size={20}
                               color={colors.white}/>
                    {isAlarm && <View style={s.dot}/>}
                </TouchableOpacity>
            </View>
            );
    }

    renderCenter = (title, onPress) => {
        return (
            <TouchableOpacity style={s.layout_center}
                              activeOpacity={1}
                              onPress={onPress}>
                {typeof title == 'string'
                    ? <BaseText style={FontStyle.HeadlineCntWhiteCH}>{title}</BaseText>
                    : title()}
            </TouchableOpacity>);
    }

    render() {
        const {
            skipAndroidStatusBar,
            title, onNotiPress, onTitlePress, useBorder,
            isAlarm
        } = this.props;
        return (
            <BaseHeader skipAndroidStatusBar={skipAndroidStatusBar} useBorder={useBorder}>
                <View style={s.container}>
                    {/* Center */}
                    {!Common.isEmpty(title) ? this.renderCenter(title, onTitlePress) : <View/>}
                    {/* Right */}
                    {this.renderRight(onNotiPress, isAlarm)}
                </View>
            </BaseHeader>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

NotiHeader.defaultProps = {
    skipAndroidStatusBar: true,
    ////
    title: '',
    titleComponent: <View/>,
    onTitlePress: _ => {
    },
    onNotiPress: _ => {
    },
    useBorder: true,
};

NotiHeader.propTypes = {
    skipAndroidStatusBar: PropTypes.bool,
    ////
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onTitlePress: PropTypes.func,
    onNotiPress: PropTypes.func,
    useBorder: PropTypes.bool,
};

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        isAlarm: state.badge.get('alarm'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(NotiHeader);
