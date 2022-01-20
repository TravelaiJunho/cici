////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
// Local
import BaseComponent from '../../_base/BaseComponent';
import Common from "../../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BaseCheckBox extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['checked'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['checked'])) { this.setChecked(nextProps.checked); return true;}
        if (Common.shouldUpdate(this.props, nextProps, ['disabled','singleType'])) return true;
        return false;
    }



    ////////////////////
    // FUNCTION
    setChecked = (checked, callback) => {
        if (this.state.checked !== checked) {
            this.setState({
                checked: checked
            }, _ => callback && callback(checked))
        }
    }

    // Event
    onCheck = callback => {
        if(this.state.checked && this.props.singleType) return;
        this.setChecked(!this.state.checked, callback)
    }

    ////////////////////
    // RENDER
    render() {
        const {hitSlop, hitSlops, on, off, onChange, disabled} = this.props;

        return (
            <TouchableOpacity activeOpacity={1}
                              disabled={disabled}
                              hitSlop={hitSlops ? hitSlops : {top: hitSlop, left: hitSlop, right: hitSlop, bottom: hitSlop}}
                              onPress={_ => this.onCheck(onChange)}>
                {this.state.checked ? on : off}
            </TouchableOpacity>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseCheckBox.defaultProps = {
    hitSlop: 0,
    hitSlops: null,
    checked: false,
    onChange: checked => {
    },
    disabled: false,
    singleType: false,
};

BaseCheckBox.propTypes = {
    hitSlop: PropTypes.number,
    hitSlops: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    on: PropTypes.node.isRequired,
    off: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    singleType: PropTypes.bool
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseCheckBox;
