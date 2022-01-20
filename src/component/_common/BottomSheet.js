// https://github.com/nysamnang/react-native-raw-bottom-sheet

import React, {Component} from "react";
import {Animated, KeyboardAvoidingView, Modal, PanResponder, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

class BottomSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            fixHeight: props.height,
            animatedHeight: new Animated.Value(0),
            pan: new Animated.ValueXY()
        };
        this.createPanResponder(props);
    }

    setModalVisible(visible, props, callback = null) {
        const {minClosingHeight, openDuration, closeDuration, onClose, onOpen} = this.props;
        const {fixHeight, animatedHeight, pan} = this.state;
        if (visible) {
            this.setState({modalVisible: visible});
            if (typeof onOpen === "function") onOpen(props);
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: fixHeight,
                duration: openDuration
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: minClosingHeight,
                duration: closeDuration
            }).start(() => {
                pan.setValue({x: 0, y: 0});
                this.setState({
                    modalVisible: visible,
                    animatedHeight: new Animated.Value(0)
                });
                if (typeof onClose === "function") onClose(props);
                callback && callback();
            });
        }
    }

    setHeight = height => {
        this.state.animatedHeight.setValue(height);
        this.setState({fixHeight: height});
    }

    createPanResponder(props) {
        const {closeOnDragDown, height} = props;
        const {pan} = this.state;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
                    this.setModalVisible(false);
                } else {
                    Animated.spring(pan, {toValue: {x: 0, y: 0}, useNativeDriver: false}).start();
                }
            }
        });
    }

    open(props) {
        this.setModalVisible(true, props);
    }

    close(props, callback = null) {
        this.setModalVisible(false, props, callback);
    }

    ////////////////////
    // RENDER
    renderContents = _ => {
        const {
            isModal,
            closeOnDragDown,
            dragFromTopOnly,
            closeOnPressMask,
            keyboardAvoidingViewEnabled,
            customStyles,
            children
        } = this.props;
        const {animatedHeight, pan} = this.state;
        return (
            <KeyboardAvoidingView enabled={keyboardAvoidingViewEnabled}
                                  behavior="padding"
                                  style={[styles.wrapper, customStyles.wrapper]}>
                {isModal &&
                <TouchableOpacity style={styles.mask}
                                  activeOpacity={1}
                                  onPress={() => (closeOnPressMask ? this.close() : null)}/>}
                <Animated.View {...(!dragFromTopOnly && this.panResponder.panHandlers)}
                               style={[styles.container, customStyles.container, {height: animatedHeight, transform: pan.getTranslateTransform()}]}>
                    {closeOnDragDown &&
                    (<View {...(dragFromTopOnly && this.panResponder.panHandlers)}
                           style={styles.draggableContainer}>
                        <View style={[styles.draggableIcon, customStyles.draggableIcon]}/>
                    </View>)}
                    {children}
                </Animated.View>
            </KeyboardAvoidingView>)
    }

    renderByView = _ => {
        const {customStyles} = this.props;
        const {fixHeight} = this.state;
        return (
            <View style={[styles.absolute, {height: fixHeight}, customStyles.container]}>
                {this.renderContents()}
            </View>)
    }

    renderByModal = _ => {
        const {animationType, closeOnPressBack} = this.props;
        const {modalVisible} = this.state;
        return (
            <Modal transparent
                   animationType={animationType}
                   visible={modalVisible}
                   supportedOrientations={SUPPORTED_ORIENTATIONS}
                   onRequestClose={() => {
                       if (closeOnPressBack) this.setModalVisible(false);
                   }}>
                {this.renderContents()}
            </Modal>);
    }

    render() {
        return this.props.isModal ? this.renderByModal() : this.renderByView();
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#00000077"
    },
    mask: {
        flex: 1,
        backgroundColor: "transparent"
    },
    absolute: {
        backgroundColor: 'white',
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    container: {
        backgroundColor: 'white',
        width: "100%",
        height: 0,
        // overflow: "hidden"
    },
    draggableContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    draggableIcon: {
        width: 35,
        height: 5,
        borderRadius: 5,
        margin: 10,
        backgroundColor: "#ccc"
    }
});

BottomSheet.propTypes = {
    animationType: PropTypes.oneOf(["none", "slide", "fade"]),
    isModal: PropTypes.bool,
    height: PropTypes.number,
    minClosingHeight: PropTypes.number,
    openDuration: PropTypes.number,
    closeDuration: PropTypes.number,
    closeOnDragDown: PropTypes.bool,
    closeOnPressMask: PropTypes.bool,
    dragFromTopOnly: PropTypes.bool,
    closeOnPressBack: PropTypes.bool,
    keyboardAvoidingViewEnabled: PropTypes.bool,
    customStyles: PropTypes.objectOf(PropTypes.object),
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    children: PropTypes.node
};

BottomSheet.defaultProps = {
    animationType: "none",
    isModal: true,
    height: 260,
    minClosingHeight: 0,
    openDuration: 0,
    closeDuration: 0,
    closeOnDragDown: false,
    dragFromTopOnly: false,
    closeOnPressMask: true,
    closeOnPressBack: true,
    keyboardAvoidingViewEnabled: Platform.OS === "ios",
    customStyles: {},
    onClose: null,
    onOpen: null,
    children: <View/>
};

export default BottomSheet;
