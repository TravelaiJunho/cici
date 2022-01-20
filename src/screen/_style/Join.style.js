import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    layout_contents: {
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        // marginBottom: Layout.getBottomSpace()
    },
    layout_confirm_row: {
        flexDirection: "row",
        alignItems: "center",
    },
    layout_confirm_row_dot:{
        width: Layout.UISize(14),
        alignItems: "center",
    },
    text_confirm_row: {
        flex: 1,
        marginLeft: Layout.UISize(10)
    },
    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        marginTop: Layout.UISize(30),
        backgroundColor: colors.grayDark
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
