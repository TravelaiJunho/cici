////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from 'react-native-easy-grid';
////////////////////
// Local
import Layout from '../../../../util/Layout';
import s from '../../_style/Template.style';
import {SIZE_MARGIN, SIZE_MARGIN_HALF, SIZE_SINGLE} from '../../_type/GridSize';
// Component
import BaseComponent from '../../../_base/BaseComponent';
import PostItem from './PostItem';
import Common from "../../../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Template_1 extends BaseComponent {

    ////////////////////
    // FUNCTION
    getMarginByKey = key => {
        switch (key) {
            // Row
            case 0:
                return Layout.CreateMargin(0, 0, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF);
            case 1:
                return Layout.CreateMargin(0, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF);
            case 2:
                return Layout.CreateMargin(0, SIZE_MARGIN_HALF, 0, SIZE_MARGIN_HALF);
            // Row
            case 3:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, 0, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF);
            case 4:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF);
            case 5:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, 0, SIZE_MARGIN_HALF);
            // Row
            case 6:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, 0, SIZE_MARGIN_HALF, 0);
            case 7:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, 0);
            case 8:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, 0, 0);
        }
    };

    createItemStyle = key => {
        return [
            s.container,
            this.getMarginByKey(key),
            {height: SIZE_SINGLE},
        ];
    };

    // Event
    onSelectItem = item => this.props.onSelectItem && this.props.onSelectItem(item);

    ////////////////////
    // RENDER
    renderItem = key => {
        const {list} = this.props;
        if (Common.isEmpty(list[key])) return null;
        return (
            <View key={key}
                  style={this.createItemStyle(key)}>
                <PostItem item={list[key]}
                          onPress={this.onSelectItem}/>
            </View>);
    };

    render() {
        return (
            <Grid style={{marginBottom: SIZE_MARGIN}}>
                <Row>
                    <Col>{this.renderItem(0)}</Col>
                    <Col>{this.renderItem(1)}</Col>
                    <Col>{this.renderItem(2)}</Col>
                </Row>
                <Row>
                    <Col>{this.renderItem(3)}</Col>
                    <Col>{this.renderItem(4)}</Col>
                    <Col>{this.renderItem(5)}</Col>
                </Row>
                <Row>
                    <Col>{this.renderItem(6)}</Col>
                    <Col>{this.renderItem(7)}</Col>
                    <Col>{this.renderItem(8)}</Col>
                </Row>
            </Grid>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

Template_1.defaultProps = {
    onSelectItem: item => {
    },
    list: [],
};

Template_1.propTypes = {
    onSelectItem: PropTypes.func,
    list: PropTypes.array,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Template_1;
