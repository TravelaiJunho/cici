////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from "./_style/EmptyView.style";
import localize from "../../util/Localize";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class EmptyView extends BaseComponent {

    ////////////////////
    // RENDER
    render() {
        return (
            <View style={s.container}>
                <BaseText style={FontStyle.CntGrayDkCN}>{localize.error.list.empty}</BaseText>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default EmptyView;