////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, {Component} from 'react';
import {Image, View} from 'react-native';
import PropTypes from "prop-types";
////////////////////
// Local
import Common from "../../util/Common";
import BaseImage from "../_base/BaseImage";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class FullWidthImage extends Component {

    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0
        };
    }

    onLayout = event => {
        const containerWidth = event.nativeEvent.layout.width;
        Image.getSize(this.props.url, (width, height) => {
            this.setState({
                width: containerWidth,
                height: containerWidth * height / width
            });
        });
        // if (this.props.ratio) {
        //     this.setState({
        //         width: containerWidth,
        //         height: containerWidth * this.props.ratio
        //     });
        // }
    }

    render() {
        const {url} = this.props;
        if (Common.isEmpty(url)) return null;
        const {width, height} = this.state;
        return (
            <View onLayout={this.onLayout}>
                <BaseImage source={{uri: url}}
                           style={{width: width, height: height}}/>
            </View>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

FullWidthImage.defaultProps = {
    url: null,
};

FullWidthImage.propTypes = {
    url: PropTypes.string.isRequired,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default FullWidthImage;