// https://github.com/nlt2390/react-native-view-more-text

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import FontStyle from "../../util/style/Font.style";
import localize from "../../util/Localize";
import BaseText from "../_base/BaseText";
import Layout from "../../util/Layout";

class ViewMoreText extends React.Component {

    trimmedTextHeight = null;
    fullTextHeight = null;
    shouldShowMore = false;

    state = {
        isFulltextShown: true,
        numberOfLines: this.props.numberOfLines,
    }

    hideFullText = () => {
        if (this.state.isFulltextShown && this.trimmedTextHeight && this.fullTextHeight) {
            this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
            this.setState({isFulltextShown: false});
        }
    }

    onLayoutTrimmedText = (event) => {
        const {height} = event.nativeEvent.layout;
        this.trimmedTextHeight = height;
        this.hideFullText();
    }

    onLayoutFullText = (event) => {
        const {height} = event.nativeEvent.layout;
        this.fullTextHeight = height;
        this.hideFullText();
    }

    onPressMore = () => {
        this.setState({
            numberOfLines: null,
        }, () => {
            this.props.afterExpand();
        });
    }

    onPressLess = () => {
        this.setState({
            numberOfLines: this.props.numberOfLines,
        }, () => {
            this.props.afterCollapse();
        });
    }

    getWrapperStyle = () => {
        if (this.state.isFulltextShown) {
            return styles.transparent;
        }
        return {};
    }

    renderViewMore = () =>
        <TouchableOpacity onPress={this.onPressMore}
                          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <BaseText style={[FontStyle.Btn13MintLN, {marginTop: Layout.UISize(5)}]}>
                {this.props.ellipsizeText + localize.common.more}
            </BaseText>
        </TouchableOpacity>

    renderViewLess = () =>
        <BaseText style={[FontStyle.Btn13MintLN, {marginTop: Layout.UISize(5)}]}
                  onPress={this.onPressLess}>{this.props.ellipsizeText + 'View Less'}</BaseText>

    renderFooter = () => {
        const {numberOfLines} = this.state;
        if (this.shouldShowMore === true) {
            if (numberOfLines > 0) {
                return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
            }
            // return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
        }
        return null;
    }

    renderFullText = () => {
        if (this.state.isFulltextShown) {
            return (
                <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
                    <BaseText style={this.props.textStyle}>{this.props.children}</BaseText>
                </View>);
        }
        return null;
    }

    render() {
        return (
            <View style={this.getWrapperStyle()}>
                <View onLayout={this.onLayoutTrimmedText}>
                    <BaseText style={this.props.textStyle}
                              numberOfLines={this.state.numberOfLines}>
                        {this.props.children}
                    </BaseText>
                    {this.renderFooter()}
                </View>
                {this.renderFullText()}
            </View>);
    }
}

const styles = StyleSheet.create({
    fullTextWrapper: {
        opacity: 0,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    // viewMoreText: {
    //     color: 'blue',
    // },
    transparent: {
        opacity: 0,
    },
});

ViewMoreText.propTypes = {
    renderViewMore: PropTypes.func,
    renderViewLess: PropTypes.func,
    afterCollapse: PropTypes.func,
    afterExpand: PropTypes.func,
    numberOfLines: PropTypes.number.isRequired,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    ellipsizeText: PropTypes.string,
};

ViewMoreText.defaultProps = {
    afterCollapse: () => {
    },
    afterExpand: () => {
    },
    textStyle: {},
    ellipsizeText: '...'
};

export default ViewMoreText;