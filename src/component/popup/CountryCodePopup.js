////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import _ from 'lodash';
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseFullPopup from "./_base/BaseFullPopup";
import BaseText from "../_base/BaseText";
import BackHeader from "../header/BackHeader";
import FontStyle from '../../util/style/Font.style';
import s from './_style/CountryCodePopup.style';
import AlphabetSectionList from "../_common/alphabet/AlphabetSectionList";
import {getAlphabet} from "../_common/alphabet/AlphabetNationData";
import SearchInput from "../text/SearchInput";
import Icon from '../../util/Icon';
import {colors} from "../../util/Color";
import Common from "../../util/Common";
import Layout from "../../util/Layout";
import localize from '../../util/Localize';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class CountryCodePopup extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            data: getAlphabet(),
            selectItem: null,
            searchText: ''
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.isVisible !== nextProps.isVisible) {
            this.setSearchText('');
            return true;
        }
        if (this.state.selectItem !== nextState.selectItem) {
            return true;
        }
        if (this.state.data !== nextState.data) {
            return true;
        }
        // if (this.state.searchText !== nextState.searchText) {
        //     return true;
        // }
        return false;
    }

////////////////////
    // FUNCTION
    setSelectItem = item => {
        const {selectItem} = this.state;
        if (Common.isEmpty(selectItem)) {
            this.setState({selectItem: item});
        } else {
            if (item.id !== selectItem.id) {
                this.setState({selectItem: item});
            }
        }
    }

    setData = data => this.setState({data: data});

    setSearchText = text => this.setState({searchText: text}, this.filterData);

    filterData = _.debounce(_ => {
        let data = JSON.parse(JSON.stringify(getAlphabet()))
        Object.keys(data).map((key) => {
            data[key] = data[key].filter((el) => {
                return el.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                    || el.code.includes(this.state.searchText)
            })
            if (data[key].length === 0) {
                delete (data[key])
            }
        })
        this.setData(data)
    }, 500)

    // Event
    onConfirm = _ => {
        if (Common.isEmpty(this.state.selectItem)) {
            this.props.onBackPress && this.props.onBackPress();
        } else {
            this.props.onConfirm && this.props.onConfirm(this.state.selectItem);
        }
    }

    onSearch = text => this.setSearchText(text);

    ////////////////////
    // RENDER
    renderSection = ({section}) => {
        return (
            <View style={s.layout_section}>
                <BaseText style={FontStyle.CntTitleOrangeLH}>{section.title}</BaseText>
            </View>);
    }

    renderItem = ({item, section}) => {
        // Check Select Item
        const {selectItem} = this.state;
        let selected = false;
        if (!Common.isEmpty(selectItem) && item.id === selectItem.id) {
            selected = true;
        }
        return (
            <View style={s.layout_row_total}>
                {/* Row */}
                <TouchableOpacity activeOpacity={1}
                                  onPress={_ => this.setSelectItem(item)}
                                  style={[s.layout_row_contents,
                                      {backgroundColor: selected ? colors.navyLight : colors.navy}]}>
                    <BaseText style={[FontStyle.CntWhiteLN, s.text_row_nation]}>{item.name}</BaseText>
                    <BaseText style={[FontStyle.CntWhiteLN, s.text_row_code]}>{item.code}</BaseText>
                    {selected &&
                    <View style={s.layout_icon}>
                        <Icon.Select size={14}
                                     color={colors.orange}/>
                    </View>}
                </TouchableOpacity>
                {/* Border */}
                <View style={s.layout_border}/>
            </View>);
    }

    renderFooter = _ => <View style={{height: Layout.getBottomSpace()}}/>

    render() {
        const {data} = this.state;
        const {isVisible, onBackPress} = this.props;
        return (
            <BaseFullPopup isVisible={isVisible}
                           onBackPress={onBackPress}>
                {/* Header */}
                <BackHeader title={localize.country.title}
                            rightTitle={localize.common.done}
                            onRightPress={this.onConfirm}
                            onBackPress={onBackPress}/>
                {/* Search */}
                <View style={s.layout_search}>
                    <SearchInput placeHolder={localize.country.hint_search}
                                 onChangeText={this.onSearch}/>
                </View>
                {/* List */}
                <AlphabetSectionList data={data}
                                     renderSectionHeader={this.renderSection}
                                     renderItem={this.renderItem}
                                     renderFooter={this.renderFooter}
                                     stickySectionHeadersEnabled={true}
                                     hideRightSectionList={true}/>
            </BaseFullPopup>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

CountryCodePopup.defaultProps = {
    isVisible: false,
    onBackPress: _ => {
    },
    onConfirm: item => {
    }
};

CountryCodePopup.propTypes = {
    isVisible: PropTypes.bool,
    onBackPress: PropTypes.func,
    onConfirm: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default CountryCodePopup;
