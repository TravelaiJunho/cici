import {StyleSheet} from "react-native";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Info
    layout_info: {
        paddingTop: Layout.UISize(20),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    text_writer: {
        textAlign: "left",
        marginBottom: Layout.UISize(13),
    },
    text_tag: {
        textAlign: "left",
        marginTop: Layout.UISize(30),
        marginBottom: Layout.UISize(13),
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
