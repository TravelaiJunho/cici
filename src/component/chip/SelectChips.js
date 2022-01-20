////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import s from './_style/Chips.style';
import Layout from "../../util/Layout";
import BaseComponent from "../_base/BaseComponent";
import SelectChip from "./SelectChip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SelectChips extends BaseComponent {

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
    shouldComponentUpdate(nextProps, nextState, nextContext){
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

    getMargins = margin => {
        return {
            // marginTop: 0,
            // marginLeft: 0,
            marginRight: margin,
            marginBottom: margin,
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {selectIndex} = this.state;
        const {buttonHeight, margin, titles, isSelected} = this.props;
        return (
            <View style={s.vertical_layout}>
                {titles.map((title, index) =>
                    <SelectChip key={index}
                                onPress={_ => this.setSelectIndex(index)}
                                height={buttonHeight}
                                customStyle={this.getMargins(Layout.UISize(margin))}
                                isSelect={index === selectIndex}
                                isSelected={isSelected}
                                title={title}/>)}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

SelectChips.defaultProps = {
    buttonHeight: 30,
    margin: 10,
    ////
    titles: [],
    isSelected: true,
    selectIndex: -1,
    onSelectIndex: index => {
    }
};

SelectChips.propTypes = {
    buttonHeight: PropTypes.number,
    margin: PropTypes.number,
    ////
    titles: PropTypes.arrayOf(PropTypes.string),
    isSelected: PropTypes.bool,
    selectIndex: PropTypes.number,
    onSelectIndex: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default SelectChips;
