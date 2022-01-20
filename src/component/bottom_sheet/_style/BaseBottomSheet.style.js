import {StyleSheet} from "react-native";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Title
    title_layout: {
        height: Layout.UISize(45),
        alignItems: "center",
        justifyContent: "center",
    },
    ////////////////////
    // Border
    border_layout: {
        height: Layout.UISize(1),
        backgroundColor: colors.gray
    },
});

export default s;
