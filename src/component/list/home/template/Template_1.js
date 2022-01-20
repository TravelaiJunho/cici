////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from 'react-native-easy-grid';
////////////////////
// Local
import s from '../../_style/Template.style';
import Layout from "../../../../util/Layout";
import {SIZE_MARGIN, SIZE_MARGIN_HALF, SIZE_SINGLE} from '../../_type/GridSize';
import Common from "../../../../util/Common";
// Component
import BaseComponent from "../../../_base/BaseComponent";
import HomeItem from './HomeItem';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Template_1 extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    getMarginByKey = key => {
        switch (key) {
            // Row
            case 0:
                return Layout.CreateMargin(0, 0, SIZE_MARGIN_HALF, SIZE_MARGIN_HALF);
            case 1:
                return Layout.CreateMargin(0, SIZE_MARGIN_HALF, 0, SIZE_MARGIN_HALF);
            case 2:
                return Layout.CreateMargin(SIZE_MARGIN_HALF, SIZE_MARGIN_HALF, 0, SIZE_MARGIN_HALF);
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
        let style = [s.container, this.getMarginByKey(key)];
        if (key !== 0) {
            style.push({height: SIZE_SINGLE});
        }
        return style;
    };

    // Event
    onSelectItem = item => this.props.onSelectItem && this.props.onSelectItem(item);

    ////////////////////
    // RENDER
    renderItem = (key, item, isVideo = false) => {
        if (Common.isEmpty(item)) return null;
        return (
            <View key={key}
                  style={this.createItemStyle(key)}>
                <HomeItem item={item}
                          isVideo={isVideo}
                          onPress={this.onSelectItem}/>
            </View>);
    }

    renderImage = _ => {
        const {list} = this.props;
        return (
            <Grid style={{marginBottom: SIZE_MARGIN}}>
                <Row>
                    <Col size={2}>
                        <Row size={2}>{this.renderItem(0, list[0])}</Row>
                    </Col>
                    <Col>
                        <Row>{this.renderItem(1, list[1])}</Row>
                        <Row>{this.renderItem(2, list[2])}</Row>
                    </Col>
                </Row>
                <Row>
                    <Col>{this.renderItem(3, list[3])}</Col>
                    <Col>{this.renderItem(4, list[4])}</Col>
                    <Col>{this.renderItem(5, list[5])}</Col>
                </Row>
                <Row>
                    <Col>{this.renderItem(6, list[6])}</Col>
                    <Col>{this.renderItem(7, list[7])}</Col>
                    <Col>{this.renderItem(8, list[8])}</Col>
                </Row>
            </Grid>);
    };

    renderVideo = _ => {
        const {video, list} = this.props;
        return (
            <Grid style={{marginBottom: SIZE_MARGIN}}>
                <Row>
                    <Col size={2}>
                        <Row size={2}>{this.renderItem(0, video, true)}</Row>
                    </Col>
                    <Col>
                        <Row>{this.renderItem(1, list[0])}</Row>
                        <Row>{this.renderItem(2, list[1])}</Row>
                    </Col>
                </Row>
                <Row>
                    <Col>{this.renderItem(3, list[2])}</Col>
                    <Col>{this.renderItem(4, list[3])}</Col>
                    <Col>{this.renderItem(5, list[4])}</Col>
                </Row>
                <Row>
                    <Col>{this.renderItem(6, list[5])}</Col>
                    <Col size={2}>{this.renderItem(7, list[6])}</Col>
                </Row>
            </Grid>);
    };

    render() {
        return this.props.type === 'img' ? this.renderImage() : this.renderVideo();
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

Template_1.defaultProps = {
    onSelectItem: item => {
    },
    type: 'img',
    list: [],
    video: null,
};

Template_1.propTypes = {
    onSelectItem: PropTypes.func,
    type: PropTypes.string,
    list: PropTypes.array,
    video: PropTypes.any,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Template_1;
