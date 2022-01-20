import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Item
    layout_item: {
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    layout_item_top: {
        flexDirection: "row",
        marginBottom: Layout.UISize(5),
        alignItems: "center",
    },
    layout_item_new: {
        paddingTop: Layout.UISize(2),
        paddingLeft: Layout.UISize(5),
        paddingRight: Layout.UISize(5),
        paddingBottom: Layout.UISize(2),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.orange,
    },
    layout_item_title: {
        flex: 1,
        marginLeft: Layout.UISize(5)
    },
    // Chip
    layout_chip: {
        marginTop: Layout.UISize(15),
        marginBottom: Layout.UISize(15)
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark
    },
});

export default s;