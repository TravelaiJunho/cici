// https://github.com/CoffeeBeansLabs/react-native-inviewport

'use strict';

import React, {Component} from 'react'
import {View, Dimensions} from 'react-native'
import PropTypes from "prop-types";

export default class InViewPort extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rectTop: 0,
            rectBottom: 0
        }
    }

    componentDidMount() {
        if (!this.props.disabled) {
            this.startWatching()
        }
    }

    componentWillUnmount() {
        this.stopWatching()
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     // return super.shouldComponentUpdate(nextProps, nextState, nextContext);
    //     if (nextProps.disabled) {
    //         this.stopWatching()
    //     } else {
    //         this.lastValue = null
    //         this.startWatching()
    //     }
    //     return false;
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.disabled) {
            this.stopWatching()
        } else {
            this.lastValue = null
            this.startWatching()
        }
    }

    startWatching() {
        if (this.interval) {
            return
        }
        this.interval = setInterval(() => {
            if (!this.myview) {
                return
            }
            this.myview.measure((x, y, width, height, pageX, pageY) => {
                this.setState({
                    rectTop: pageY,
                    rectBottom: pageY + height,
                    rectWidth: pageX + width
                })
            })
            this.isInViewPort()
        }, this.props.delay || 100)
    }

    stopWatching() {
        this.interval = clearInterval(this.interval)
    }

    isInViewPort() {
        const window = Dimensions.get('window')
        const isVisible =
            this.state.rectBottom !== 0 &&
            this.state.rectTop >= 0 &&
            this.state.rectBottom <= window.height &&
            this.state.rectWidth > 0 &&
            this.state.rectWidth <= window.width
        if (this.lastValue !== isVisible) {
            this.lastValue = isVisible
            this.props.onChange(isVisible)
        }
    }

    render() {
        return (
            <View {...this.props}
                  collapsable={false}
                  ref={component => {
                      this.myview = component
                  }}>
                {this.props.children}
            </View>
        )
    }
}

InViewPort.defaultProps = {
    delay: 100,
    disabled: false,
    onChange: isVisible => {
    }
};

InViewPort.propTypes = {
    delay: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};