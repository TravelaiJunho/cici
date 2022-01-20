import {StyleSheet} from "react-native";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Top
    layout_top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: Layout.UISize(50),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.black94
    },
    text_title: {
        fontWeight: "bold",
        color: colors.orange
    },
    ////////////////////
    // Picker
    layout_picker: {
        height: Layout.UISize(215),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.black
    }
});

export default s;
