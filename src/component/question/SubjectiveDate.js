import React from 'react'
import {
    TouchableOpacity,
    View,
} from "react-native";
import PropTypes from "prop-types";

import BaseComponent from "../_base/BaseComponent";
import s from "./_style/base.style";
import Common from "../../util/Common";
import {colors} from "../../util/Color";
import moment from "moment";
import BottomDatePicker from "../bottom_sheet/BottomDatePicker";
import BaseText from "../_base/BaseText";
import FontStyle from "../../util/style/Font.style";
import localize from "../../util/Localize";
import Layout from "../../util/Layout";
import BaseTransText from "../_base/BaseTransText";

class SubjectiveDate extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            valueData : props.value,
            errorMsg: false,
        }
        this.datePicker = null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['valueData', 'errorMsg'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['editable', 'autoTranslate'])) return true;

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

    setValueData = value => {
        this.setState({valueData: value});
    }

    setErrorMsg = isError => {
        this.setState({errorMsg: isError});
    }

    getValueData = _ => {
        return this.state.valueData;
    }

    resetValueData = () => {
        this.setErrorMsg(false);
        let value = null;
        this.setValueData(value);
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
        const {title, frontTitle} = this.props;

        //let beforedate = moment(new Date()).subtract(50, 'y').toDate();
        let afterdate = moment(new Date()).add(100, 'y').toDate();


        return(
            <View style={s.container}>
                {this.renderTitle()}
                <TouchableOpacity
                    activeOpacity={1}
                    style={[s.question_date, {borderBottomColor: errorMsg ? colors.orange : colors.white}]}
                    onPress={() => {
                        if (!this.props.editable) return;
                        if (this.datePicker) this.datePicker.open()
                    }}
                >
                    <BottomDatePicker ref={ref => this.datePicker = ref}
                                      currentDate={new Date()}
                                      maximumDate={afterdate}
                                      onSelect={result => {
                                          let date = moment(result);
                                          this.onChangeValue(date.format('YYYY-MM-DD'));
                                      }}/>
                    <BaseText
                        style={[FontStyle.Cnt13GrayDkCN, {color: (!Common.isEmpty(valueData)) ? this.props.editable ? colors.white : colors.grayDark : colors.gray}, {padding: 0}]}>
                        {(!Common.isEmpty(valueData)) ? valueData : localize.more.membershiprequest.input_answer}
                    </BaseText>
                    {errorMsg &&
                    <BaseText style={[FontStyle.CntNoticeOrangeLT, {position: 'absolute', bottom: Layout.UISize(-25)}]}>
                        {localize.more.membershiprequest.error_input_answer}
                    </BaseText>}
                </TouchableOpacity>
            </View>

        )
    }
}


////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////
SubjectiveDate.propsTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    frontTitle: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,

    onChange: PropTypes.func,

    autoTranslate: PropTypes.bool
}

SubjectiveDate.defaultProps = {
    editable: true,
    title: null,
    frontTitle: null,
    value:null,
    required: true,

    onChange: _ =>{},

    autoTranslate:false
}

export default SubjectiveDate;
