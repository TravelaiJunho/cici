import {StyleSheet} from 'react-native';
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    layout_empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    // Banner
    layout_banner: {
        height: Layout.UISize(207),
        marginTop: Layout.UISize(20),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        borderRadius: Layout.UISize(8),
        backgroundColor: colors.grayLight
    },
    ////////////////////
    // Item
    layout_item: {
        marginTop: Layout.UISize(10),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(20),
    },
    layout_item_top: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    layout_item_tag: {
        height: Layout.UISize(25),
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        marginRight: Layout.UISize(10),
        marginBottom: Layout.UISize(20),
        borderRadius: Layout.UISize(20),
    },
    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
