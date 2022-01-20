// https://github.com/Nexapp/react-native-scrollable-with-collapsible-header

import * as React from 'react';
import {Animated, View} from 'react-native';
import PropTypes from 'prop-types';

export class ScrollableWithCollapsibleHeader extends React.Component {

    scroll = new Animated.Value(0);
    positiveScroll = this.scroll.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 200],
        extrapolate: 'clamp',
    });

    constructor(props) {
        super(props);
        this.headerY = Animated.multiply(Animated.diffClamp(this.positiveScroll, 0, props.headerHeight), -1);
    }

    listOnScrollHandler = (event) => {
        const {nativeEvent} = event;
        const scrollPosition = nativeEvent.contentOffset.y;
        const layoutHeight = nativeEvent.layoutMeasurement.height;
        const contentHeight = nativeEvent.contentSize.height;
        if (scrollPosition < contentHeight - layoutHeight) {
            Animated.event(
                [{nativeEvent: {contentOffset: {y: this.scroll}}}],
                {useNativeDriver: false}
            )(event);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Animated.View style={{
                    width: '100%',
                    position: 'absolute',
                    transform: [{translateY: this.headerY}],
                    elevation: 0,
                    flex: 1,
                    zIndex: 1,
                }}>{this.props.headerComponent()}</Animated.View>
                {this.props.listComponent({
                    style: {
                        paddingTop: Animated.add(this.props.headerHeight, this.headerY),
                        flex: 1,
                    },
                    onScroll: this.listOnScrollHandler,
                    scrollEventThrottle: 16,
                })}
            </View>
        );
    }

}

ScrollableWithCollapsibleHeader.propTypes = {
    headerComponent: PropTypes.func.isRequired,
    listComponent: PropTypes.func.isRequired,
    headerHeight: PropTypes.number,
};
