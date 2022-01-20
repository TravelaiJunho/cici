import React from 'react'
import {
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import PropTypes, {oneOfType} from "prop-types";

import BaseComponent from "../_base/BaseComponent";
import s from "./_style/base.style";
import Common from "../../util/Common";
import BaseText from "../_base/BaseText";
import FontStyle from "../../util/style/Font.style";
import Layout from "../../util/Layout";
import Icon from "../../util/Icon";
import {colors} from "../../util/Color";
import BaseCheckBox from "../checkbox/_base/BaseCheckBox";
import SquareCheckBox from "../checkbox/SquareCheckBox";
import CircleCheckBox from "../checkbox/CircleCheckBox";
import BaseImage from "../_base/BaseImage";
import {navRef} from "../../navigation/RootNavigation";
import Screen from "../../util/type/Screen";
import {ANSWER_TYPE} from "../../util/type/AnswerType";
import localize from "../../util/Localize";
import BaseTransText from "../_base/BaseTransText";

class MultipleChoice extends BaseComponent {
    constructor(props) {
        super(props);


        this.singleSelectIndex = 0;
        this.multiSelectIndex = [];
        let checked = null;
        switch(props.type) {
            case ANSWER_TYPE.C: {
                this.singleSelectIndex = Common.isEmpty(props.checked) ? 0 : props.checked;
                checked = this.singleSelectIndex;
            }
            case ANSWER_TYPE.CM: {
                this.multiSelectIndex = Common.isEmpty(props.checked) ? [] : props.checked;
                checked = this.multiSelectIndex;
            }
        }

        this.state = {
            checked: checked,
        }

        this.refChecker = [];
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['checked'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['editable', 'autoTranslate'])){
            console.warn(nextProps.editable)
            return true;
        }

        return false;
    }

    checkValue = () => {
        let selectValue = null;
        switch(this.props.type) {
            case ANSWER_TYPE.C: {
                selectValue = this.singleSelectIndex + 1;
                break;
            }
            case ANSWER_TYPE.CM: {
                let values = [];
                this.multiSelectIndex.map((item, index)=>{
                    if(item) {
                        values.push(index + 1)
                    }
                })
                selectValue = values.length!=0 ? values : null;
                break;
            }
        }
        if (this.props.required) {
            if (Common.isEmpty(selectValue)) {
                this.setErrorMsg(true)
                return {require: true, data: null};
            }
            this.setErrorMsg(false);
            return {require: true, data: selectValue};
        }
        let value = Common.isEmpty(selectValue) ? null : selectValue
        return {require: false, data: value};
    }

    resetValueData = () => {
        this.singleSelectIndex = 0;
        this.multiSelectIndex = [];
        switch(this.props.type) {
            case ANSWER_TYPE.C: {
                this.setState({
                    checked: this.singleSelectIndex
                })
            }
            case ANSWER_TYPE.CM: {
                this.setState({
                    checked: this.multiSelectIndex
                })
            }
        }
    }

    setValueData = value => {
        //his.setState({valueData: value});
        switch(this.props.type) {
            case ANSWER_TYPE.C: {
                this.singleSelectIndex = value;
                this.setState({
                    checked: this.singleSelectIndex
                })
            }
            case ANSWER_TYPE.CM: {
                this.multiSelectIndex = value;
                this.setState({
                    checked: this.multiSelectIndex
                })
            }
        }
    }

    setErrorMsg = isError => {
        this.setState({errorMsg: isError});
    }

    getValueData = _ => {
        switch(this.props.type) {
            case ANSWER_TYPE.C: {
                return this.singleSelectIndex;
            }
            case ANSWER_TYPE.CM: {
                return this.multiSelectIndex;
            }
        }
    }

    setMultiCheck = (check, index) => {
        this.multiSelectIndex[index] = check;
        this.refChecker[index] && this.refChecker[index].setCheck(check);
        this.setState({
            checked: this.multiSelectIndex
        })
    }

    setSingleCheck = (index) => {
        this.singleSelectIndex = index;
        this.refChecker.map((item, index)=>{
            if(item) {
                if(index !=this.singleSelectIndex )
                    item.setCheck(false);
                else
                    item.setCheck(true);
            }
        })
        this.setState({
            checked: this.singleSelectIndex
        })
    }

    renderItemMulti = (item, index) => {
        let checked = this.multiSelectIndex[index];
        return (
            <TouchableOpacity
                key={`renderItemMulti ${index}`}
                style={s.sidebysice}
                onPress={() => {
                    let selected = false;
                    if(Common.isEmpty(this.multiSelectIndex[index]) ) {
                        selected = false;
                    }else{
                        selected = this.multiSelectIndex[index]
                    }
                    this.setMultiCheck(!selected,index)
                }}
                disabled={!this.props.editable}
            >
                <SquareCheckBox
                    ref={r=>this.refChecker[index] = r}
                    hitSlop={4}
                    checked={checked}
                    onChange={(c) => {
                        this.setMultiCheck(c, index)
                    }}
                    title={item.answer}
                    disabled={!this.props.editable}
                    autoTranslate={this.props.autoTranslate}
                />
            </TouchableOpacity>
        )
    }

    renderItemSingle = (item, index) => {
        let selected = index == this.singleSelectIndex ? true : false;
        return (
            <TouchableOpacity
                key={`renderItemSingle_${index}`}
                style={s.sidebysice}
                onPress={() => {
                    this.setSingleCheck(index)
                }}
                disabled={!this.props.editable}
            >
                <CircleCheckBox
                    ref={r=>this.refChecker[index] = r}
                    hitSlop={4}
                    checked={selected}
                    onChange={(c) => {
                        this.setSingleCheck(index)
                    }}
                    title={item.answer}
                    disabled={!this.props.editable}
                    autoTranslate={this.props.autoTranslate}
                    singleType={true}
                />
            </TouchableOpacity>
        )
    }

    renderImageItemMulti = (item, index) => {
        let checked = this.multiSelectIndex[index];
        return (
            <View
                key={`renderImageItemMulti${index}`}
                style={s.select_image_box}
            >
                <SquareCheckBox
                    ref={r=>this.refChecker[index] = r}
                    hitSlop={4}
                    checked={checked}
                    onChange={(c) => {
                        this.setMultiCheck(c, index)
                    }}
                    disabled={!this.props.editable}
                />
                <TouchableOpacity
                    disabled={!this.props.editable}
                    onPress={()=>{
                        // image viewer
                        navRef.current.navigate(Screen.SCREEN_ACTIVITY.IMAGE_VIEWER, {source:{uri:item.answer_image}});
                    }}
                >
                    <BaseImage style={s.image_box} source={{uri:item.answer_image}} />
                </TouchableOpacity>

            </View>
        )
    }

    renderImageItemSingle = (item, index) => {
        let selected = index == this.singleSelectIndex ? true : false;
        return (
            <View
                key={`renderImageItemSingle${index}`}
                style={s.select_image_box}
            >
                <CircleCheckBox
                    ref={r=>this.refChecker[index] = r}
                    hitSlop={4}
                    checked={selected}
                    onChange={(c) => {
                         this.setSingleCheck(index)
                    }}
                    disabled={!this.props.editable}
                    singleType={true}
                />
                <TouchableOpacity
                    disabled={!this.props.editable}
                    onPress={()=>{
                        // image viewer
                        navRef.current.navigate(Screen.SCREEN_ACTIVITY.IMAGE_VIEWER, {source:{uri:item.answer_image}});
                    }}
                >
                    <BaseImage style={s.image_box} source={{uri:item.answer_image}} />
                </TouchableOpacity>
            </View>
        )
    }

    renderContent = () => {
        const {items, title, frontTitle, type, vertical} = this.props;

        // image type 인지 알아봐야한다.
        if(vertical) {
            return (
                <View>
                    {
                        items.map((item, index) => {
                            switch(type) {
                                case ANSWER_TYPE.C: {
                                    if (item.answer_type === "T") {
                                        return this.renderItemSingle(item, index)
                                    } else {
                                        return this.renderImageItemSingle(item, index)
                                    }
                                }
                                case ANSWER_TYPE.CM: {
                                    if(item.answer_type === "T"){
                                        return this.renderItemMulti(item, index)
                                    }else{
                                        return this.renderImageItemMulti(item, index)
                                    }
                                }

                            }
                        })
                    }
                </View>
            )
        }else{
            return (
                <ScrollView horizontal={true}>
                    {
                        items.map((item, index) => {
                            switch(type) {
                                case ANSWER_TYPE.C: {
                                    if (item.answer_type === "T") {
                                        return this.renderItemSingle(item, index)
                                    } else {
                                        return this.renderImageItemSingle(item, index)
                                    }
                                }
                                case ANSWER_TYPE.CM: {
                                    if(item.answer_type === "T"){
                                        return this.renderItemMulti(item, index)
                                    }else{
                                        return this.renderImageItemMulti(item, index)
                                    }
                                }

                            }
                        })
                    }
                </ScrollView>
            )
        }
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

    render() {
        const {items, title, frontTitle, type} = this.props;
        // title view
        let titleShow = false;
        if (title != null || frontTitle != null) {
            titleShow = true;
        }
        return (
            <View style={s.container}>
                {this.renderTitle()}
                <View style={{height: Layout.UISize(20)}}/>
                {this.renderContent()}
            </View>
        )
    }
}


////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////
MultipleChoice.propsTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    frontTitle: PropTypes.string,

    type: PropTypes.oneOf(["S", "M", "SI", "MI"]),
    items: PropTypes.array,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    required: PropTypes.bool,
    vertical: PropTypes.bool,


    onChange: PropTypes.func,

    autoTranslate: PropTypes.bool
}

MultipleChoice.defaultProps = {
    editable: true,
    title: null,
    frontTitle: null,

    type: "S",
    items: [],
    //checked: false,
    required: true,
    vertical: true,

    onChange: _ =>{},

    autoTranslate: false
}

export default MultipleChoice;
