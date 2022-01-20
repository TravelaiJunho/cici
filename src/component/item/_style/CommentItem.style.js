import {StyleSheet} from 'react-native';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    layout_item: {
        flexDirection: 'row',
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    layout_item_contents: {
        flex: 1,
        marginLeft: Layout.UISize(8),
    },
    layout_item_contents_top: {
        height: Layout.UISize(26),
        flexDirection: "row",
        alignItems: "center",
    },
    text_name: {
        flex: 1,
    },
    DateRow: {
        marginTop: Layout.UISize(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    }
});

export default s;
