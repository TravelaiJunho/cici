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
import BaseSelectButton from "./_base/BaseSelectButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class GroupSingleVerticalButton extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: props.selectIndex,
            showError: props.showError,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.selectIndex !== this.state.selectIndex) {
            return true;
        }
        if (nextProps.selectIndex !== this.state.selectIndex) {
            this.setSelectIndex(nextProps.selectIndex);
            return true;
        }
        if (nextState.showError !== this.state.showError) {
            this.setShowError(nextState.showError);
            return true;
        }
        if (nextProps.showError !== this.props.showError) {
            this.setShowError(nextProps.showError);
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
                this.setShowError(false);
            });
        }
    }

    setShowError = isShow => {
        if (this.state.showError !== isShow) {
            this.setState({showError: isShow});
        }
    }

    getSelectIndex = _ => {
        return this.state.selectIndex;
    }

    ////////////////////
    // RENDER
    render() {
        const {selectIndex, showError} = this.state;
        const {height, margin, titles} = this.props;
        return (
            <View style={s.container_vertical}>
                {titles.map((title, index) =>
                    <BaseSelectButton key={index}
                                      onPress={_ => this.setSelectIndex(index)}
                                      height={height}
                                      customStyle={{marginTop: index > 0 ? Layout.UISize(margin) : 0}}
                                      isSelect={index === selectIndex}
                                      showError={showError}
                                      title={title}/>)}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

GroupSingleVerticalButton.defaultProps = {
    buttonHeight: 40,
    margin: 10,
    ////
    titles: [],
    showError: false,
    selectIndex: -1, // -1, None
    onSelectIndex: index => {
    }
};

GroupSingleVerticalButton.propTypes = {
    buttonHeight: PropTypes.number,
    margin: PropTypes.number,
    ////
    titles: PropTypes.arrayOf(PropTypes.string),
    showError: PropTypes.bool,
    selectIndex: PropTypes.number,
    onSelectIndex: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default GroupSingleVerticalButton;