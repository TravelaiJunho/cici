import React from 'react'
import {
    View,
} from "react-native";
import PropTypes from "prop-types";

import BaseComponent from "../_base/BaseComponent";
import s from "./_style/base.style";
import Common from "../../util/Common";
import FlatInput from "../text/FlatInput";
import {colors} from "../../util/Color";
import localize from "../../util/Localize";
import Input from "../../util/type/Input";
import BaseText from "../_base/BaseText";
import FontStyle from "../../util/style/Font.style"
import Layout from "../../util/Layout";
import {ANSWER_TYPE} from "../../util/type/AnswerType";
import BaseTransText from "../_base/BaseTransText";

class SubjectiveText extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            valueData: props.value,
            errorMsg:false,
        }
        this.textInput = null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['valueData','errorMsg'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['type', 'editable', 'autoTranslate'])) return true;

        return false;
    }

    checkValue = () => {
        if (this.props.required) {
            if (Common.isEmpty(this.state.valueData)) {
                this.setErrorMsg(true)
                return {require: true, data: null};
            }
            this.setErrorMsg(false);
            return {require: true, data: this.state.valueData};
        }
        let value = Common.isEmpty(this.state.valueData) ? null : this.state.valueData
        return {require: false, data: value};
    }


    setErrorMsg = isError => {
        this.setState({errorMsg: isError});
    }

    setValueData = value => {
        this.setState({valueData: value});
    }

    getValueDta = () => {
        return this.state.valueData;
    }

    resetValueData = () => {
        this.setErrorMsg(false);
        let value = Common.isEmpty(this.props.type) ? null :  '';
        this.setValueData(value);
        if (this.textInput) {
            Common.debug('text input ', value)
            this.textInput.setText(value)
        }
    }

    onChangeValue = (value) => {
        if (this.state.errorMsg) this.setErrorMsg(false);
        this.setValueData(value);
        if (this.props.onChange) this.props.onChange(value)
    }

    renderTitle = () => {
        const { title, frontTitle, required, autoTranslate} = this.props;
        return (
            <View style={s.title}>
                <BaseText
                    style={[FontStyle.CntTitleOrangeLH]}
                >
                    {frontTitle}
                    <BaseTransText
                        autoTranslate={autoTranslate}
                        style={FontStyle.CntTitleWhiteLH}
                    >
                        {
                            required ?
                                `${localize.more.membershiprequest.answer_require} `
                                :
                                `${localize.more.membershiprequest.answer_select} `}
                    </BaseTransText>
                    <BaseTransText
                        autoTranslate={autoTranslate}
                        style={FontStyle.CntTitleWhiteLH}
                    >
                        {title}
                    </BaseTransText>
                </BaseText>
            </View>
        )
    }

    render(){
        const {valueData, errorMsg} = this.state;
        const {type, editable, title, frontTitle} = this.props;
        let keyboardType = Input.KEYBOARD_DEFAULT;
        switch (type) {
            case ANSWER_TYPE.T: {
                keyboardType = Input.KEYBOARD_DEFAULT
                break;
            }
            case ANSWER_TYPE.TN: {
                keyboardType = Input.KEYBOARD_NUMBER
                break;
            }
        }


        return(
            <View style={s.container}>
                {this.renderTitle()}

                <View style={s.question_text}>
                    <FlatInput ref={r => this.textInput = r}
                               inputStyle={{color: this.props.editable ? colors.white : colors.grayDark}}
                               keyboardType={keyboardType}
                               required={true}
                               text={valueData}
                               editable={editable}
                               placeHolder={localize.more.membershiprequest.input_answer}
                               showError={errorMsg}
                               errorMessage={localize.more.membershiprequest.error_input_answer}
                               onChangeText={(result) => {
                                   let value = result;
                                   if (Input.KEYBOARD_NUMBER == keyboardType)
                                       value = Common.isEmpty(value) ? null : value;
                                   this.onChangeValue(value)
                               }}/>
                </View>
            </View>

        )
    }
}


////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////
SubjectiveText.propsTypes = {
    type: PropTypes.oneOf(["T", "TN"]),
    editable: PropTypes.bool,
    title: PropTypes.string,
    frontTitle: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,

    onChange: PropTypes.func,

    autoTranslate: PropTypes.bool
}

SubjectiveText.defaultProps = {
    type: "T",
    editable: true,
    title: null,
    frontTitle: null,
    value: null,
    required: true,

    onChange: _ =>{},

    autoTranslate: false,
}

export default SubjectiveText;
