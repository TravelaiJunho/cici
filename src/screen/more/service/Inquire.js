////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from "../../../util/style/Font.style";
import s from '../../_style/Inquire.style';
import localize from "../../../util/Localize";
import {colors} from "../../../util/Color";
import Icon from "../../../util/Icon";
import Screen from "../../../util/type/Screen";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BackHeader from "../../../component/header/BackHeader";
import BaseText from "../../../component/_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Inquire extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    onShowPost = _ => {
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.POST_INQUIRE);
    }

    onShowList = _ => {
        this.props.navigation.navigate(Screen.STACK_MORE.INQUIRE_LIST);
    }

    ////////////////////
    // RENDER
    renderMenu = (title, onPress, isShowBorder = true) => {
        return (
            <View>
                <TouchableOpacity style={s.layout_menu}
                                  onPress={onPress}>
                    <BaseText style={[{flex: 1}, FontStyle.CntWhiteLN]}>{title}</BaseText>
                    <Icon.SignRight size={14} color={colors.white}/>
                </TouchableOpacity>
                {isShowBorder &&
                <View style={s.layout_border}/>}
            </View>);
    }

    render() {
        return (
            <View style={BaseStyle.container}>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.inquire.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Menu */}
                <ScrollView style={{flex: 1}}>
                    {this.renderMenu(localize.more.inquire.title, this.onShowPost)}
                    {this.renderMenu(localize.more.inquire.history, this.onShowList, false)}
                </ScrollView>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Inquire;
