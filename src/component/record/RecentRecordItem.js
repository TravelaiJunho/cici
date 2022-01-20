////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from './_style/RecentRecordItem.style';
import Icon from '../../util/Icon';
import {colors} from "../../util/Color";
// Component
import BaseComponent from '../_base/BaseComponent';
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class RecentRecordItem extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    // View Touch Event
    onViewTouch = _ => this.props.onTouch && this.props.onTouch(this.props.index);

    // Remove Event
    onRemove = _ => this.props.onRemove && this.props.onRemove(this.props.index);

    ////////////////////
    // RENDER
    render() {
        return (
            <View>
                <View style={s.list_separator}/>
                <TouchableOpacity style={s.item_container}
                                  onPress={this.onViewTouch}>
                    <BaseText style={[FontStyle.CntWhiteLN, {flex: 1}]}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}>
                        {this.props.word}
                    </BaseText>
                    <View style={{flexWrap: 'wrap'}}>
                        <Icon.CancelOn size={14}
                                       color={colors.gray}
                                       onPress={this.onRemove}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

RecentRecordItem.defaultProps = {
    onTouch: index => {
    },
    onRemove: index => {
    },
    index: 0,
    word: '',
};

RecentRecordItem.propTypes = {
    onTouch: PropTypes.func,
    onRemove: PropTypes.func,
    word: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default RecentRecordItem;
