import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    ////////////////////
    // Item
    layout_item_delete: {
        height: Layout.UISize(55),
        justifyContent: "center",
        paddingLeft: Layout.UISize(55),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Post
    layout_post: {
        flexDirection: "row",
        marginTop: Layout.UISize(10),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(10)
    },
    layout_avatar: {
        backgroundColor: colors.grayDark
    },
    layout_input_post: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: Layout.UISize(40),
        maxHeight: Layout.UISize(100),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        marginLeft: Layout.UISize(10),
        backgroundColor: colors.grayDark,
        borderRadius: Layout.UISize(20),
    },
    layout_input_inner: {
        flex: 1,
        marginRight: Layout.UISize(34),
        paddingTop: Layout.UISize(4),
        ...Platform.select({
            ios: {
                paddingBottom: Layout.UISize(8),
            },
            android: {
                paddingBottom: Layout.UISize(4),
            },
        }),
    },
    input_post: {
        padding: 0,
        // textAlignVertical: "top",
    },
    layout_post_button: {
        position: "absolute",
        bottom: 0,
        right: 0,
        height: Layout.UISize(40),
        justifyContent: 'center',
        marginRight: Layout.UISize(15),
    },
    ////////////////////
    // Border
    border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
