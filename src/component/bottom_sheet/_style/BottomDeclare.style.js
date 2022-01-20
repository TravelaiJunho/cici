import {StyleSheet} from "react-native";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Info
    layout_info: {
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    text_title: {
        textAlign: "left",
        marginBottom: Layout.UISize(13),
    },
    layout_etc: {
        paddingTop: Layout.UISize(10),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    layout_etc_input: {
        height: Layout.UISize(125),
        padding: Layout.UISize(15),
        borderColor: colors.orange,
        borderWidth: Layout.UISize(1),
        borderRadius: Layout.UISize(4),
    },
    input_etc: {
        padding: 0,
        textAlignVertical: "top",
    },
    ////////////////////
    // Button
    layout_two_button: {
        height: Layout.UISize(75),
        flexDirection: "row",
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
