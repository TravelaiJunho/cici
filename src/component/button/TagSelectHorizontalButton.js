////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import s from './_style/GroupButton.style';
import Layout from "../../util/Layout";
import BaseComponent from "../_base/BaseComponent";
import BaseTagButton from "./_base/BaseTagButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TagSelectHorizontalButton extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: props.selectIndex,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.selectIndex !== this.state.selectIndex) {
            return true;
        }
        return false;
    }

    ////////////////////
    // FUNCTION
    setSelectIndex = index => {
        if (this.state.selectIndex !== index) {
            this.setState({
                selectIndex: index
            }, _ => {
                this.props.onSelectIndex && this.props.onSelectIndex(index);
            });
        }
    }

    getSelectIndex = _ => {
        return this.state.selectIndex;
    }

    ////////////////////
    // RENDER
    render() {
        const {selectIndex} = this.state;
        const {buttonHeight, margin, titles} = this.props;
        return (
            <View style={s.container_horizontal}>
                {titles.map((title, index) =>
                    <BaseTagButton key={index}
                                   onPress={_ => this.setSelectIndex(index)}
                                   height={buttonHeight}
                                   customStyle={{marginLeft: index > 0 ? Layout.UISize(margin) : 0}}
                                   isSelect={index === selectIndex}
                                   title={title}/>)}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

TagSelectHorizontalButton.defaultProps = {
    buttonHeight: 30,
    margin: 15,
    ////
    titles: [],
    selectIndex: -1,
    onSelectIndex: index => {
    }
};

TagSelectHorizontalButton.propTypes = {
    buttonHeight: PropTypes.number,
    margin: PropTypes.number,
    ////
    titles: PropTypes.arrayOf(PropTypes.string),
    selectIndex: PropTypes.number,
    onSelectIndex: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default TagSelectHorizontalButton;
