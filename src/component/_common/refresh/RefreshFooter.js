// https://github.com/mrarronz/react-native-blog-examples/tree/master/Chapter4-PullRefresh/PullRefreshExample

import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RefreshState from './RefreshState';
import PropTypes from 'prop-types';

export default class RefreshFooter extends Component {

    static propTypes = {
        onLoadMore: PropTypes.func,
        onRetryLoading: PropTypes.func,
    };

    render() {
        let {state} = this.props;
        let footer = null;
        switch (state) {
            // Idle
            // case RefreshState.Idle:

            // Refresh
            case RefreshState.Refreshing:
                footer =
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="large" color="gray"/>
                    </View>;
                break;

            // Load More
            case RefreshState.CanLoadMore:
                footer =
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="large" color="gray"/>
                    </View>;
                break;

            // No More
            // case RefreshState.NoMoreData:

            // Failure
            // case RefreshState.Failure:
        }
        return footer;
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
});
