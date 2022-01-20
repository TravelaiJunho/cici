import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    layout_contents: {
        flex: 1,
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Resend
    layout_resend: {
        flex: 1,
        alignItems: "flex-end",
    },
    text_resend: {
        marginTop: Layout.UISize(10),
    },
    ////////////////////
    // Bottom
    layout_bottom: {
        // marginBottom: Layout.getBottomSpace()
    },
    ////////////////////
    // Button
    layout_two_button: {
        height: Layout.UISize(45),
        flexDirection: "row",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        marginTop: Layout.UISize(15),
        marginBottom: Layout.UISize(15),
    },
    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
