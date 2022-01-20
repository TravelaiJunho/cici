import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        width: Layout.DEVICE_WIDTH,
        height: Layout.DEVICE_HEIGHT - Layout.getBottomSpace() - Layout.getStatusBarHeight(false, false),
        backgroundColor: colors.background
    },
    ////////////////////
    // Logo
    layout_logo: {
        flex: 1,
        alignItems: 'center',
    },
    image_logo: {
        width: Layout.UISize(100),
        height: Layout.UISize(92),
        marginTop: Layout.UISize(206),
    },
    ////////////////////
    // Password
    layout_password: {
        marginTop: Layout.UISize(40)
    },
    // Re Password
    layout_re_password: {
        flex: 1,
        alignItems: "flex-end",
    },
    text_re_password: {
        marginTop: Layout.UISize(15),
        marginBottom: Layout.UISize(25)
    },
    ////////////////////
    // Button
    layout_bottom: {
        position: 'absolute',
        bottom: 0,
        // bottom: Layout.getBottomSpace(),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    layout_bottom_width: {
        width: '100%',
    },
    button_enable: {
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.orange
    },
    button_disable: {
        flex: 1,
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.gray
    },
    ////////////////////
    // Join
    layout_join: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: Layout.UISize(44),
        marginBottom: Layout.UISize(22)
    },
    text_button_join: {
        marginLeft: Layout.UISize(10)
    }
});

export default s;
