import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    // Title
    layout_title: {
        paddingTop: Layout.UISize(13),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(13),
    },
    // Button
    layout_button_back: {
        height: Layout.UISize(60),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    layout_button:{
        height: Layout.UISize(45),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: Layout.UISize(50),
        paddingRight: Layout.UISize(50),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.gray
    },
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark,
    },
});

export default s;
