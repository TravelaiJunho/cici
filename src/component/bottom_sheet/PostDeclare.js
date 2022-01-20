////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from "./_style/PostDeclare.style";
import localize from '../../util/Localize';
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseNormalBottomSheet from "./_base/BaseNormalBottomSheet";
import BaseText from "../_base/BaseText";
import BaseTouchableButton from "../button/_base/BaseTouchableButton";
import CircleBorderImage from "../image/CircleBorderImage";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostDeclare extends BaseComponent {

    ////////////////////
    // FUNCTION

    // Event
    open = _ => this.bs.open();
    close = _ => this.bs.close();

    onDeclare = _ => {
        this.props.onDeclare && this.props.onDeclare();
        this.close();
    }

    onCopy = _ => {
        this.props.onCopy && this.props.onCopy();
        this.close();
    }

    ////////////////////
    // RENDER
    render() {
        const {name, url, grade} = this.props;
        return (
            <BaseNormalBottomSheet ref={ref => this.bs = ref}
                                   height={Layout.UISize(276)} // 149 + 51 / 20 / 55
                                   containerColor={'transparent'}>
                <View style={s.container}>
                    {/* Contents */}
                    <View style={s.layout_contents}>
                        <View style={s.layout_contents_avatar}>
                            {/* Avatar */}
                            <CircleBorderImage size={32}
                                               gradeSize={14}
                                               borderWidth={2}
                                               userGrade={grade}
                                               source={url}/>
                            {/* Name */}
                            <BaseText style={[FontStyle.Cnt13GrayCB, {marginTop: Layout.UISize(8)}]}>{name}</BaseText>
                        </View>
                        {/* Border */}
                        <View style={s.border}/>
                        {/* Button */}
                        <TouchableOpacity style={s.layout_contents_button}
                                          onPress={this.onCopy}>
                            <BaseText style={FontStyle.CntWhiteCN}>{localize.common.copy_text}</BaseText>
                        </TouchableOpacity>
                        {/* Border */}
                        <View style={s.border}/>
                        {/* Button */}
                        <TouchableOpacity style={s.layout_contents_button}
                                          onPress={this.onDeclare}>
                            <BaseText style={FontStyle.CntOrangeCB}>{localize.common.declare_verb}</BaseText>
                        </TouchableOpacity>
                    </View>
                    {/* Bottom */}
                    <View style={s.layout_bottom}>
                        <BaseTouchableButton onPress={this.close}
                                             buttonStyle={{backgroundColor: colors.grayDark}}
                                             title={localize.common.cancel}/>
                    </View>
                </View>
            </BaseNormalBottomSheet>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

PostDeclare.defaultProps = {
    onDeclare: _ => {
    },
    onCopy: _ => {
    },
};

PostDeclare.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
    onDeclare: PropTypes.func,
    onCopy: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default PostDeclare;