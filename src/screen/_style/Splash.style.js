import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

// ...StyleSheet.absoluteFillObject,

const s = StyleSheet.create({
    // layout_overlay: {
    //     position: 'absolute',
    //     width: Layout.DEVICE_WIDTH,
    //     height: Layout.DEVICE_HEIGHT,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    ////////////////////
    // Logo
    layout_logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_logo: {
        width: Layout.UISize(100),
        height: Layout.UISize(92),
    },
    ////////////////////
    // Button
    layout_button: {
        position: 'absolute',
        bottom: 0,
        // bottom: Layout.getBottomSpace(),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_start: {
        width: Layout.UISize(182),
        height: Layout.UISize(45),
        marginBottom: Layout.UISize(60),
        backgroundColor: colors.orange
    },
});

export default s;
