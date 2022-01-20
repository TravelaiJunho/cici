// MODULE
import React, {Component} from "react";
import {
    View,
    Dimensions,
    PixelRatio, TouchableOpacity, StatusBar, Modal, BackHandler, Platform
} from "react-native";

// LOCAL
import BaseScreen from "../../_base/BaseScreen";
import s from "../../_style/MediaViewer.style";
import Loader from "../../../component/loader/Loader";
import Layout from "../../../util/Layout";
import Common from "../../../util/Common";
import ZoomImage from "../../../component/image/ZoomImage";
import Orientation from "react-native-orientation-locker";
import Icon from "../../../util/Icon";
import {colors} from "../../../util/Color";
import BaseStyle from "../../../util/style/Base.style";
import {navRef} from "../../../navigation/RootNavigation";
//////////////////
// CLASS
class ImageViewer extends BaseScreen {
    //////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            visible: false
        }
    }

    //////////////////
    // LIFECYCLE
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _onOrientationDidChange = (orientation) => {
        this.setState({
            screen_Width: Dimensions.get("window").width
        })
    };

    //////////////////
    // FUNCTION
    setLoading = (load) => {
        this.setState({
            isLoading: load
        })
    }

    render() {
        const {isLoading,} = this.state;
        const {source} = this.props.route.params;
        if (Platform.OS == "android") {
            return (
                <View style={s.container}>
                    <Loader isLoading={isLoading}/>
                    <StatusBar barStyle="light-content"
                               backgroundColor={colors.black}
                               translucent={false}
                               hidden={true}/>
                    <ZoomImage
                        source={source}
                    />
                    <TouchableOpacity
                        style={[BaseStyle.header, {
                            zIndex: 100000,
                            position: 'absolute',
                            top: Layout.getStatusBarHeight(true, false),
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingLeft: Layout.UISize(20)
                        }]}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    >
                        <Icon.Close color={colors.white} size={Layout.UISize(20)}/>
                    </TouchableOpacity>
                </View>

            )
        } else {
            return (
                <Modal
                    visible={true}
                    presentationStyle={"fullScreen"}
                    supportedOrientations={['portrait', 'landscape']}
                    onOrientationChange={(event) => {
                        console.warn(event.nativeEvent)
                    }}
                    onRequestClose={() => {
                        this.props.navigation.goBack();
                        this.setState({visible: false})
                    }}
                >
                    <View style={s.container}>
                        <Loader isLoading={isLoading}/>
                        <StatusBar barStyle="light-content"
                                   backgroundColor={colors.black}
                                   translucent={false}
                                   hidden={true}/>
                        <ZoomImage
                            source={source}
                        />
                        <TouchableOpacity
                            style={[BaseStyle.header, {
                                zIndex: 100000,
                                position: 'absolute',
                                top: Layout.getStatusBarHeight(true, false),
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                paddingLeft: Layout.UISize(20)
                            }]}
                            onPress={() => {
                                this.props.navigation.pop()
                            }}
                        >
                            <Icon.Close color={colors.white} size={Layout.UISize(20)}/>
                        </TouchableOpacity>
                    </View>
                </Modal>

            )
        }

    }
}

///////////////////////
// EXPORT
export default ImageViewer;
