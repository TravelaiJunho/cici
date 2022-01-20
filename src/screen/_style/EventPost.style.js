import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    container_contents: {
        flex: 1,
        paddingTop: Layout.UISize(20),
        paddingBottom: Layout.UISize(20),
    },
    ////////////////////
    // Post
    layout_post: {
        flexDirection: "row",
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20)
    },
    layout_avatar: {
        backgroundColor: colors.grayDark
    },
    empty_avatar: {
        backgroundColor: colors.grayDark,
        width: Layout.UISize(40),
        height: Layout.UISize(40),
        borderRadius: Layout.UISize(20),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    layout_input_post: {
        flex: 1,
        padding: Layout.UISize(15),
        marginLeft: Layout.UISize(10),
        backgroundColor: colors.grayDark,
        borderRadius: Layout.UISize(8),
    },
    input_post: {
        padding: 0,
        textAlignVertical: "top",
        height: Layout.UISize(160),
    },
    ////////////////////
    // Tag
    layout_tag: {
        marginTop: Layout.UISize(25),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20)
    },
    layout_input_tag: {
        paddingTop: Layout.UISize(12),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(12),
        borderColor: colors.gray,
        borderWidth: Layout.UISize(1),
        borderRadius: Layout.UISize(20),
    },
    input_tag: {
        padding: 0,
        textAlignVertical: "top",
        height: Layout.UISize(50),
    },
    ////////////////////
    // Image
    layout_image: {
        marginTop: Layout.UISize(25)
    },
    layout_image_title: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(8)
    },
    container_image_list: {
        flexDirection: "row",
        marginRight: Layout.UISize(20),
    },
    layout_add_image_button: {
        alignItems: "center",
        justifyContent: "center",
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        marginTop: Layout.UISize(8),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(8),
        borderRadius: Layout.UISize(8),
        backgroundColor: colors.grayDark,
    },
    layout_add_image: {
        marginLeft: Layout.UISize(8),
    },
    image_add: {
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        marginTop: Layout.UISize(8),
        marginRight: Layout.UISize(8),
        borderRadius: Layout.UISize(8),
    },
    image_close_icon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    image_close: {
        width: Layout.UISize(16),
        height: Layout.UISize(16)
    },
    ////////////////////
    // Video
    layout_video: {
        marginTop: Layout.UISize(25),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Bottom
    text_attention: {
        marginTop: Layout.UISize(15),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(5),
    },
    space_attention: {
        width: Layout.UISize(5)
    },
    ////////////////////
    // Button
    layout_two_button: {
        height: Layout.UISize(75),
        flexDirection: "row",
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    ////////////////////
    // Border
    border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
    layout_border: {
        marginTop: Layout.UISize(25),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20)
    }
});

export default s;
