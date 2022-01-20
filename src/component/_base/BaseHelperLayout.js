////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "./BaseComponent";
import BaseText from "./BaseText";
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from './BaseHelperLayout.style';
import Common from "../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * infoMessage , errorMessage 를 하단에 표시해주는 Component
 * @extends {BaseComponent}
 */
class BaseHelperLayout extends BaseComponent {

    ////////////////////
    // RENDER
    /**
     * Main Renderer
     * @returns {JSX.Element}
     */
    render() {
        const {
            containerStyle, required, label,
            infoMessage, showError, errorMessage,
            children
        } = this.props;
        return (
            <View style={[s.container, containerStyle]}>
                {/* Label */}
                {!Common.isEmpty(label) &&
                <View style={s.layout_label}>
                    <BaseText style={FontStyle.CntTitleWhiteLH}>{label}</BaseText>
                    {required && <View style={[BaseStyle.badge_dot, s.badge_label]}/>}
                </View>}

                {/* Child */}
                {children}

                {/* Info Message */}
                {!Common.isEmpty(infoMessage) && <BaseText style={[FontStyle.Cnt13WhiteLT, s.text_Info]}>{infoMessage}</BaseText>}

                {/* Error Message */}
                {showError && !Common.isEmpty(errorMessage) && <BaseText style={[FontStyle.CntNoticeOrangeLT, s.text_error]}>{errorMessage}</BaseText>}
            </View>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////
/**
 *
 * @type {{showError: boolean, containerStyle: {}, errorMessage: string, label: string, required: boolean, infoMessage: string}}
 */
BaseHelperLayout.defaultProps = {
    containerStyle: {},
    required: false,
    label: '',
    infoMessage: '',
    showError: false,
    errorMessage: '',
};

BaseHelperLayout.propTypes = {
    containerStyle: PropTypes.objectOf(PropTypes.any),
    required: PropTypes.bool,
    label: PropTypes.string,
    infoMessage: PropTypes.string,
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseHelperLayout;
