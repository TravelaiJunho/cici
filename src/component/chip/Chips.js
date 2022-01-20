////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
// Local
import Layout from '../../util/Layout';
import s from './_style/Chips.style';
import BaseComponent from '../_base/BaseComponent';
import Chip from './Chip';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Chips extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0
        }
    }

    ////////////////////
    // FUNCTION
    setSelectIndex = index => {
        if (this.state.selectIndex !== index) {
            this.setState({selectIndex: index});
        }
    }

    onSelect = index => {
        this.props.onSelect && this.props.onSelect(index);
        this.setSelectIndex(index);
    }

    ////////////////////
    // RENDER
    renderVerticalList = (chips, margin) => (
        <View style={s.vertical_layout}>
            {chips.map((chip, index) => {
                return <Chip chipStyle={{margin: margin}}
                             key={index}
                             word={chip}
                             index={index}
                             onSelect={this.onSelect}/>;
            })}
        </View>
    );

    renderHorizontalList = (chips, margin, padding) => {
        const {selectIndex} = this.state;
        const {maxCount} = this.props;
        return (
            <View style={{width: '100%'}}>
                <ScrollView horizontal={true}
                            pagingEnabled={false}
                            showsHorizontalScrollIndicator={false}>
                    <View style={[s.horizontal_layout, {paddingLeft: padding, paddingRight: padding}]}>
                        {chips.map((chip, index) => {
                            if (maxCount > 0) {
                                if (index < maxCount) {
                                    return <Chip chipStyle={[chips.length !== index + 1 && {marginRight: margin}]}
                                                 key={index}
                                                 word={chip}
                                                 index={index}
                                                 select={selectIndex}
                                                 onSelect={this.onSelect}/>;
                                }
                            } else {
                                return <Chip chipStyle={[chips.length !== index + 1 && {marginRight: margin}]}
                                             key={index}
                                             word={chip}
                                             index={index}
                                             select={selectIndex}
                                             onSelect={this.onSelect}/>;
                            }
                        })}
                    </View>
                </ScrollView>
            </View>);
    }

    render() {
        const padding = Layout.UISize(this.props.paddingBetween);
        const margin = Layout.UISize(this.props.space);
        return (
            <View style={s.container}>
                {this.props.isVertical
                    ? this.renderVerticalList(this.props.list, margin / 2)
                    : this.renderHorizontalList(this.props.list, margin, padding)}
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

Chips.defaultProps = {
    onSelect: index => {
    },
    isVertical: true,
    maxCount: -1,
    paddingBetween: 20,
    space: 15,
    list: [],
};

Chips.propTypes = {
    onSelect: PropTypes.func,
    isVertical: PropTypes.bool,
    maxCount: PropTypes.number,
    space: PropTypes.number,
    list: PropTypes.array,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Chips;
