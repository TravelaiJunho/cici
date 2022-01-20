////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import {colors} from "../../util/Color";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Loader extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {isLoading: this.props.isLoading}
    }

    static getDerivedStateFromProps(nextProps) {
        return {isLoading: nextProps.isLoading};
    }

    render() {
        return (
            <Modal transparent={true}
                   animationType={'none'}
                   visible={this.state.isLoading}
                   onRequestClose={_ => {
                   }}>
                <View style={{flex: 1, justifyContent: 'space-around'}}>
                    <ActivityIndicator animating={this.state.loading}
                                       color={colors.orange}
                                       size={40}/>
                </View>
            </Modal>)
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Loader;