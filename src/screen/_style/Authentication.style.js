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
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        // marginBottom: Layout.getBottomSpace()
    },
    ////////////////////
    // Button
    layout_button: {
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        marginBottom: Layout.UISize(15),
        backgroundColor: colors.orange
    }
});

export default s;
