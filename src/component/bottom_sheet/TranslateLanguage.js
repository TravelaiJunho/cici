////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View, Text, ScrollView, Modal} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from "./_style/TranslateLanguage.style";
import localize from '../../util/Localize';
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseNormalBottomSheet from "./_base/BaseNormalBottomSheet";
import BaseTouchableButton from "../button/_base/BaseTouchableButton";
import GroupSingleVerticalButton from "../button/GroupSingleVerticalButton";

import {LanguageList, convertLanguageCode, convertLanguageIndex} from "../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TranslateLanguage extends BaseComponent {
    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectIndex:-1,
            show:false,
        }

        // ref
        this.bs = null;
        this.group = null;
    }

    ////////////////////
    // LIFE CYCLE
    componentDidMount() {
        super.componentDidMount();
    }

    ////////////////////
    // FUNCTION
    onSelectIndex = index => {
         this.setState({
             selectIndex: index
         })
    }

    // Event
    open = code => {
        this.setState({
            selectIndex: convertLanguageIndex(code),
            show: true,
        })

        //this.bs.open();
    }

    close = _ => {
        //this.bs.close();
        this.setState({
            show: false
        })
    }

    apply = _ => {
        if(this.state.selectIndex < 0) {
            return;
        }

        // convert
        let code = convertLanguageCode(this.state.selectIndex);
        this.props.onApplyCode && this.props.onApplyCode(code)
        //this.bs.close();
        this.close()
    }

    ////////////////////
    // RENDER
    renderTop() {
        return (
            <View style={s.top_container}>
                <View style={s.top_inner_view}>
                    <View style={s.title_text} >
                        <Text style={FontStyle.Cnt13GrayCB} >
                            {localize.translateSetting.title}
                        </Text>
                    </View>

                    <Text style={FontStyle.CntGrayLN} >
                        {localize.translateSetting.desc}
                    </Text>
                </View>

                <View style={s.line} />
            </View>
        )
    }

    renderLanguage() {
        const {selectIndex} = this.state;
        return (
            <View style={s.language_container}>
                <ScrollView
                    style={{
                        height: Layout.UISize(306)}}
                    contentContainerStyle={s.language_scrollview}
                >
                    <GroupSingleVerticalButton
                        ref={ref => this.group = ref}
                        titles={LanguageList}
                        //showError={showError}
                        selectIndex={selectIndex}
                        onSelectIndex={this.onSelectIndex}
                    />
                </ScrollView>
            </View>
        )
    }

    renderBottom() {
        const {selectIndex} = this.state;
        return (
            <View style={s.bottom_container}>
                <View style={s.layout_bottom}>
                    <View style={s.button_style}>
                        <BaseTouchableButton onPress={this.close}
                                             buttonStyle={{backgroundColor: colors.gray}}
                                             title={localize.common.cancel}/>
                    </View>
                    <View style={s.button_style}>
                        <BaseTouchableButton onPress={this.apply}
                                             buttonStyle={{backgroundColor: selectIndex !=-1 ? colors.orange : colors.gray}}
                                             title={localize.common.do_apply}/>
                    </View>
                </View>

            </View>
        )
    }

    render() {
        return (
            <Modal
                transparent
                visible={this.state.show}
            >
                <TouchableOpacity
                    style={s.mask}
                    onPress={()=>{
                        this.setState({
                            show:false,
                        })
                    }}
                >
                    <View style={s.container}>
                        {this.renderTop()}
                        {this.renderLanguage()}
                        {this.renderBottom()}
                    </View>

                </TouchableOpacity>

            </Modal>
        )
    }
}

TranslateLanguage.defaultProps = {
    onApplyCode: null
}

TranslateLanguage.propTypes = {
    onApplyCode: PropTypes.func
}

export default TranslateLanguage;
