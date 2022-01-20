////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import _ from 'lodash';
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseSelectButton from "./_base/BaseSelectButton";
import s from './_style/GroupButton.style';
import Layout from "../../util/Layout";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class GroupMultiVerticalButton extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectMultiIndex: props.selectMultiIndex,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!_.isEqual(nextState.selectMultiIndex, this.state.selectMultiIndex)) {
            return true;
        }
        return false;
    }

    ////////////////////
    // FUNCTION
    setSelectMultiIndex = index => {
        let list = [...this.state.selectMultiIndex];
        if (_.includes(list, index)) {
            _.pull(list, index);
        } else {
            list.push(index);
        }
        this.setState({
            selectMultiIndex: list
        }, _ => {
            this.props.onSelectMultiIndex && this.props.onSelectMultiIndex(list);
        });
    }

    getSelectMultiIndex = _ => {
        return this.state.selectMultiIndex;
    }

    ////////////////////
    // RENDER
    render() {
        const {selectMultiIndex} = this.state;
        const {height, margin, titles} = this.props;
        return (
            <View style={s.container_vertical}>
                {titles.map((title, index) =>
                    <BaseSelectButton key={index}
                                      onPress={_ => this.setSelectMultiIndex(index)}
                                      height={height}
                                      customStyle={{marginTop: index > 0 ? Layout.UISize(margin) : 0}}
                                      isSelect={_.includes(selectMultiIndex, index)}
                                      title={title}/>)}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

GroupMultiVerticalButton.defaultProps = {
    buttonHeight: 40,
    margin: 10,
    ////
    titles: [],
    selectMultiIndex: [],
    onSelectMultiIndex: indexes => {
    }
};

GroupMultiVerticalButton.propTypes = {
    buttonHeight: PropTypes.number,
    margin: PropTypes.number,
    ////
    titles: PropTypes.arrayOf(PropTypes.string),
    selectMultiIndex: PropTypes.arrayOf(PropTypes.number),
    onSelectMultiIndex: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default GroupMultiVerticalButton;
