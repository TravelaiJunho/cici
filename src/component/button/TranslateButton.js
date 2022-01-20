////////////////////////////////////////
// IMPORT
////////////////////////////////////////
import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import Layout from "../../util/Layout";
import BaseComponent from "../_base/BaseComponent";
import BaseTagButton from "./_base/BaseTagButton";
import Icon from "../../util/Icon";
import {colors} from "../../util/Color";
import TranslateLanguage from "../bottom_sheet/TranslateLanguage";
import TagSelectHorizontalScrollButton from "./TagSelectHorizontalScrollButton";
import {connect} from "react-redux";
import {setTargetLanguage, setTranslateCount} from "../../data/redux/action/Translate";
import BaseText from "../_base/BaseText";
import FontStyle from "../../util/style/Font.style";
import localize from "../../util/Localize";
import {MAX_TRANSLATE_COUNT} from "../../util/Constants";
import ConfirmAlert from "../alert/_base/ConfirmAlert";
import Common from "../../data/redux/reducer/Common";

class TranslateButton extends BaseComponent {
    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.bottomLanguage = null;
        this.state = {
            visibleAlert:false,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.enabled !== this.props.enabled) {
            return true;
        }
        if (nextState.visibleAlert !== this.state.visibleAlert) {
            return true;
        }
        return false;
    }


    ////////////////////
    // FUNCTION
    setShowConfirm = visible => {
        this.setState({
            visibleAlert: visible
        })
    }
    onTranslate = () => {
        // 언어가 등록되어있는가?
        if(this.props.translateLanguage) {
            if(!this.props.enabled) {
                // check count
                this.props.setTranslateCount(this.props.translateCount+1);
                if(__DEV__){
                    console.warn("DEV TRANS COUNT : ", this.props.translateCount + 1)
                }else{
                    if(this.props.translateCount >= MAX_TRANSLATE_COUNT) {
                        // message
                        this.setShowConfirm(true)
                        console.warn("MAX TRANSLATE COUNT > ", this.props.translateCount)
                        return;
                    }
                }

            }
            this.onEnabled(!this.props.enabled)
        }else{
            this.bottomLanguage && this.bottomLanguage.open();
        }
    }

    onEnabled = enabled => {
        this.props.onEnabled(enabled)
    }

    onApplyCode = (code) => {
        this.props.setTranslateLanguageCode(code)
    }

    ////////////////////
    // RENDER
    render() {
        const {visibleAlert} = this.state;
        const {enabled, useIcon} = this.props;
        return (
            <View>
                <TouchableOpacity style={{flexDirection: "row"}}
                                  onPress={this.onTranslate}>
                    {
                        useIcon ?
                            <Icon.Translate size={20} color={enabled ? colors.mint : colors.white}/>
                            :
                            <BaseText style={[FontStyle.SubCntGrayLN, {color:colors.mint}]}>{enabled ? localize.common.Translated : localize.common.Translation}</BaseText>
                    }

                </TouchableOpacity>
                <TranslateLanguage
                    ref={ref => this.bottomLanguage = ref}
                    onApplyCode = {this.onApplyCode}
                />
                {/* Alert */}
                <ConfirmAlert isVisible={visibleAlert}
                              buttonConfirm={"ok"}
                              onConfirm={_ => {
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>하루 30개 글만 번역이 가능합니다.</BaseText>
                </ConfirmAlert>
            </View>

        )
    }
}


TranslateButton.defaultProps = {
    useIcon: true,
    enabled: false,
    onEnabled: enabled => {
    }
};

TranslateButton.propTypes =
    {
        useIcon: PropTypes.bool,
        enabled: PropTypes.bool,
        onEnabled: PropTypes.func,
    };

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        translateLanguage: state.translate.get('target'),
        translateCount: state.translate.get('count')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTranslateLanguageCode: code => {
            return dispatch(setTargetLanguage(code))
        },
        setTranslateCount: count => {
            return dispatch(setTranslateCount(count))
        }
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

// export default TranslateButton;
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TranslateButton));
