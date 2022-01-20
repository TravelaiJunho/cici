import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    // Item
    layout_item: {
        // borderTopWidth: 1,
        // borderTopColor: colors.grayDark,
        width: Layout.DEVICE_WIDTH,
        // height: Layout.UISize(65),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15)
    },
    layout_item_read: {
        marginRight: Layout.UISize(20)
    },
    layout_item_not_read: {
        marginRight: Layout.UISize(20)
    },
    layout_item_text: {
        flex: 1,
    },
    layout_item_badge: {
        position: 'absolute',
        top: Layout.UISize(-4),
        right: Layout.UISize(-6),
        width: Layout.UISize(4),
        height: Layout.UISize(4),
        borderRadius: Layout.UISize(2),
        backgroundColor: colors.orange
    },
    // Footer
    layout_footer: {
        height: Layout.UISize(20) // + Layout.getBottomSpace()
    },
    ////////////////////
    // Border
    border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;