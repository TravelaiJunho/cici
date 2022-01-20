////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Keyboard, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from './_style/SearchBar.style';
import {colors} from "../../util/Color";
import Icon from "../../util/Icon";
import localize from "../../util/Localize";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import SearchInput from "./SearchInput";
import Storage from "../../util/Storage";
import Layout from "../../util/Layout";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SearchBar extends BaseComponent {

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.setText(nextProps.text);
        if (Common.shouldUpdate(this.props, nextProps, ['text', 'isFocus', 'isShowTopRightFilter', 'isShowTopRightPost'])) return true;
        return false;
    }

    ////////////////////
    // FUNCTION
    setText = text => this.search && this.search.setText(text, false);

    // Event
    onSearchText = text => {
        Keyboard.dismiss();
        this.onEditing(false);
        Storage.setSearchRecordByValue(text);
        const {onSearchText} = this.props;
        onSearchText && onSearchText(text);
    }

    onCancel = text => {
        this.onSearchText(text);
        this.setText(text)
    }

    onEditing = isEditing => {
        const {onEditing} = this.props;
        onEditing && onEditing(isEditing);
    }

    onShowFilter = _ => {
        const {onShowFilter} = this.props;
        onShowFilter && onShowFilter();
    }

    onPost = _ => {
        const {onPost} = this.props;
        onPost && onPost();
    };

    ////////////////////
    // RENDER
    render() {
        const {text, isFocus, isShowTopRightFilter, isShowTopRightPost} = this.props;
        let header =  Layout.getStatusBarHeight(false,true);
        header = 0;
        return (
            <View style={[s.container, {marginTop: header}]}>
                {/* Search */}
                <View style={{flex: 1}}>
                    <SearchInput ref={ref => this.search = ref}
                                 text={text}
                                 placeHolder={localize.keyword.hint_search}
                                 onEditing={this.onEditing}
                                 onSubmitText={this.onSearchText}/>
                </View>
                {/* Right */}
                <View style={{marginLeft: 15}}>
                    {isFocus
                        ? <TouchableOpacity onPress={_ => this.onCancel(text)}>
                            <BaseText style={FontStyle.BtnMintRN}>{localize.common.cancel}</BaseText>
                        </TouchableOpacity>
                        : <View style={{flexDirection: "row"}}>
                            {/* Filter */}
                            {isShowTopRightFilter &&
                            <TouchableOpacity onPress={this.onShowFilter}
                                              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
                                <Icon.Filter size={20}
                                             color={colors.white}/>
                            </TouchableOpacity>}
                            {/* Post */}
                            {isShowTopRightPost &&
                            <TouchableOpacity style={isShowTopRightFilter && {marginLeft: 15}}
                                              onPress={this.onPost}
                                              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
                                <Icon.Writing size={20}
                                              color={colors.orange}/>
                            </TouchableOpacity>}
                        </View>}
                </View>
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

SearchBar.defaultProps = {
    text: '',
    isFocus: false,
    isShowTopRightFilter: true,
    isShowTopRightPost: true,
    onSearchText: text => {
    },
    onEditing: isEditing => {
    },
    onShowFilter: _ => {
    },
    onPost: _ => {
    },
};

SearchBar.propTypes = {
    text: PropTypes.string,
    isFocus: PropTypes.bool,
    isShowTopRightFilter: PropTypes.bool,
    isShowTopRightPost: PropTypes.bool,
    onSearchText: PropTypes.func,
    onEditing: PropTypes.func,
    onShowFilter: PropTypes.func,
    onPost: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default SearchBar;
