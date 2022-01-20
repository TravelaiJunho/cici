////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from './_style/BottomDeclare.style';
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import {colors} from "../../util/Color";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import BaseTextInput from "../_base/BaseTextInput";
import BaseTouchableButton from "../button/_base/BaseTouchableButton";
import BaseRadiusBottomSheet from "./_base/BaseRadiusBottomSheet";
import GroupSingleVerticalButton from "../button/GroupSingleVerticalButton";
import BaseSelectButton from "../button/_base/BaseSelectButton";
import ConfirmAlert from "../alert/_base/ConfirmAlert";

////////////////////////////////////////
// LOCAL VALUE
////////////////////////////////////////

// Height
const HEIGHT_BOTTOM_BUTTON = Layout.UISize(76); // Bottom Button
// const HEIGHT_ETC_ON = Layout.UISize(150); // 10 + 125 + 15
// const HEIGHT_ETC_OFF = Layout.UISize(65); // 10 + 40 + 15

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BottomDeclare extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirm: false,
            errorMessage: '',
            // Index
            selectIndex: -1,
            // Etc
            isShowEtcInput: false,
            etcText: '',
        }
        this.HEIGHT_BUTTONS = this.getButtonHeight(props.titles.length);
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message
            });
        }
    }

    getButtonHeight = count => {
        return count > 0 ? Layout.UISize(count * 50) : 0;
    }

    // Index
    setSelectIndex = index => {
        if (index > -1) this.setShowEtcInput(false);
        this.setState({selectIndex: index});
        // this.setState({selectIndex: index}, _ => this.bs.setHeight());
    }

    resetIndex = _ => this.setSelectIndex(-1);

    // Etc
    setEtcText = text => this.setState({etcText: text});

    setShowEtcInput = isShow => {
        if (this.state.isShowEtcInput !== isShow) {
            this.setState({isShowEtcInput: isShow});
        }
    }

    setEtcIndex = _ => {
        this.setShowEtcInput(true);
        this.resetIndex();
    }

    ////////////
    // Event
    open = _ => this.bs.open();
    close = _ => this.bs.close();

    onClose = _ => {
        this.resetIndex();
        this.setEtcText('');
        this.setShowEtcInput(false);
    }

    onDeclare = _ => {
        // Check
        const {selectIndex, isShowEtcInput, etcText} = this.state;
        if (isShowEtcInput && etcText.length < 5) {
            this.setShowConfirm(true, localize.error.declare.min_length);
            return;
        }
        if (selectIndex > -1 || isShowEtcInput) {
            const {onDeclare} = this.props;
            if (!Common.isEmpty(onDeclare)) onDeclare(selectIndex, etcText);
        } else {
            this.setShowConfirm(true, localize.declare.text.select_reason);
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {titles} = this.props;
        const {
            isShowConfirm, errorMessage,
            selectIndex, isShowEtcInput
        } = this.state;
        return (
            <BaseRadiusBottomSheet ref={ref => this.bs = ref}
                                   isUseKeyboardEvent={true}
                                   height={
                                       Layout.UISize(240) + HEIGHT_BOTTOM_BUTTON
                                       // isShowEtcInput
                                       // ? this.HEIGHT_BUTTONS + HEIGHT_BOTTOM_BUTTON + HEIGHT_ETC_ON
                                       // : this.HEIGHT_BUTTONS + HEIGHT_BOTTOM_BUTTON + HEIGHT_ETC_OFF
                                   }
                                   title={localize.declare.title}
                                   onClose={this.onClose}>
                <ScrollView ref={ref => this.scroll = ref}
                            onContentSizeChange={_ => {
                                if (isShowEtcInput) this.scroll.scrollToEnd({animated: true});
                            }}
                            style={{maxHeight: Layout.UISize(240)}}>
                    {/* Buttons */}
                    <View style={[s.layout_info, {height: this.HEIGHT_BUTTONS}]}>
                        <GroupSingleVerticalButton titles={titles}
                                                   selectIndex={selectIndex}
                                                   onSelectIndex={this.setSelectIndex}/>
                    </View>
                    {/* Etc */}
                    <View style={[
                        s.layout_etc,
                        // {height: isShowEtcInput ? HEIGHT_ETC_ON : HEIGHT_ETC_OFF}
                    ]}>
                        {isShowEtcInput
                            ? <View style={s.layout_etc_input}>
                                {/* Input */}
                                <BaseTextInput style={[FontStyle.Cnt13WhiteLN, s.input_etc]}
                                               maxLength={100}
                                               multiline={true}
                                               placeholder={localize.declare.hint.reason}
                                               placeholderTextColor={colors.gray}
                                               onChangeText={this.setEtcText}/>
                            </View>
                            : <BaseSelectButton onPress={this.setEtcIndex}
                                                title={localize.declare.etc}/>}
                    </View>
                </ScrollView>

                {/* Bottom */}
                <View style={s.layout_border}/>
                <View style={s.layout_two_button}>
                    <BaseTouchableButton title={localize.common.cancel}
                                         buttonStyle={{backgroundColor: colors.gray}}
                                         onPress={this.close}/>
                    <BaseTouchableButton title={localize.common.declare}
                                         buttonStyle={{marginLeft: Layout.UISize(10)}}
                                         onPress={this.onDeclare}/>
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => this.setShowConfirm(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>

            </BaseRadiusBottomSheet>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BottomDeclare.defaultProps = {
    onDeclare: (index, reason) => {
    }
};

BottomDeclare.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeclare: PropTypes.func
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BottomDeclare;
