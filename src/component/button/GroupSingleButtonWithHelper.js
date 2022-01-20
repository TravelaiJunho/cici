////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseHelperLayout from "../_base/BaseHelperLayout";
import GroupSingleHorizontalButton from "./GroupSingleHorizontalButton";
import GroupSingleVerticalButton from "./GroupSingleVerticalButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class GroupSingleButtonWithHelper extends BaseComponent {

    ////////////////////
    // FUNCTION
    getSelectIndex = _ => {
        return this.group.getSelectIndex();
    }

    ////////////////////
    // RENDER
    render() {
        const {
            selectIndex,
            containerStyle, isHorizontal,
            required, label, showError, errorMessage,
            titles, onSelectIndex
        } = this.props;
        return (
            <BaseHelperLayout containerStyle={containerStyle}
                              required={required}
                              label={label}
                              showError={showError}
                              errorMessage={errorMessage}>
                {isHorizontal
                    ? <GroupSingleHorizontalButton ref={ref => this.group = ref}
                                                   titles={titles}
                                                   showError={showError}
                                                   selectIndex={selectIndex}
                                                   onSelectIndex={onSelectIndex}/>
                    : <GroupSingleVerticalButton ref={ref => this.group = ref}
                                                 titles={titles}
                                                 showError={showError}
                                                 selectIndex={selectIndex}
                                                 onSelectIndex={onSelectIndex}/>}
            </BaseHelperLayout>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

GroupSingleButtonWithHelper.defaultProps = {
    containerStyle: {},
    isHorizontal: true,
    ////
    required: false,
    label: '',
    showError: false,
    errorMessage: '',
    ////
    titles: [],
    selectIndex: -1, // -1, None
    onSelectIndex: index => {
    }
};

GroupSingleButtonWithHelper.propTypes = {
    containerStyle: PropTypes.objectOf(PropTypes.any),
    isHorizontal: PropTypes.bool,
    ////
    required: PropTypes.bool,
    label: PropTypes.string,
    showError: PropTypes.bool,
    errorMessage: PropTypes.string,
    ////
    titles: PropTypes.arrayOf(PropTypes.string),
    selectIndex: PropTypes.number,
    onSelectIndex: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default GroupSingleButtonWithHelper;