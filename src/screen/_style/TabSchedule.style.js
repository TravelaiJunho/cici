import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    layout_date: {
        marginTop: Layout.UISize(30),
        marginBottom: Layout.UISize(10),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ////////////////////
    // Item
    layout_item: {
        height: Layout.UISize(65),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    layout_item_icon: {
        width: Layout.UISize(26),
        height: Layout.UISize(26),
    },
    layout_item_badge: {
        alignItems: "flex-end"
    },
    layout_item_contents: {
        flex: 1,
        marginLeft: Layout.UISize(14),
    },
    ////////////////////
    // Empty
    layout_empty: {
        height: Layout.UISize(65),
        alignItems: "center",
        justifyContent: "center",
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark
    },
    layout_date_border: {
        marginTop: Layout.UISize(5),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
    }
});

export default s;
