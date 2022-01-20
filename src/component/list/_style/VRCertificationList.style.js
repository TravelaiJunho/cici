import {StyleSheet} from 'react-native';
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    layout_item: {
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Layout.UISize(15),
        borderTopWidth: 1,
        borderTopColor: colors.CHARCOAL_GREY,
    },
    hidden_area: {
        width: "100%",
        padding: Layout.UISize(12),
        backgroundColor: colors.COLOR_BG_BLANK,
        //borderBottomWidth: 1,
        //borderBottomColor: colors.CHARCOAL_GREY,
    },
    history_area: {
        marginTop: Layout.UISize(10),
        padding: Layout.UISize(12),
        paddingBottom: Layout.UISize(12),
        paddingTop: Layout.UISize(12),
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: Layout.UISize(1),
        borderColor: colors.SLATE_GREY,
    },
    layout_empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default s;
