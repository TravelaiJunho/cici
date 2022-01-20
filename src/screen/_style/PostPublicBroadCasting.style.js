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
    // Information
    layout_info: {
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20)
    },
    ////////////////////
    // Title
    layout_title: {
        marginTop: Layout.UISize(48),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20)
    },
    ////////////////////
    // Image
    layout_image: {
        marginTop: Layout.UISize(30)
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
        marginTop: Layout.UISize(30),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20)
    },
    ////////////////////
    // Category
    layout_tag_date: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Layout.UISize(5),
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        paddingBottom: Layout.UISize(5),
        borderRadius: Layout.UISize(20),
    },
    layout_tag_vertical_bar: {
        width: Layout.UISize(1),
        height: Layout.UISize(13),
        marginLeft: Layout.UISize(5),
        marginRight: Layout.UISize(5),
    },
    ////////////////////
    // Contents
    layout_contents: {
        flex: 1,
        padding: Layout.UISize(20),
        // marginBottom: Layout.getBottomSpace(),
    },
    /////////////////////
    // Propose
    layout_propose: {
        justifyContent: 'center',
        alignItems:'flex-start',
        marginBottom: Layout.UISize(15),
    },
    propose_ended: {
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    layout_button: {
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        marginTop: Layout.UISize(15),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(15),
        backgroundColor: colors.orange
    },
    line:{
        width:"100%",
        height:Layout.UISize(0.5),
        backgroundColor: colors.grayDark
    },
    // status
    layout_status: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Layout.UISize(5),
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        paddingBottom: Layout.UISize(5),
        borderRadius: Layout.UISize(20),
    },
    layout_progress_status: {
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
    layout_ended_status: {
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderWidth: Layout.UISize(1),
        borderColor: colors.grayDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
});

export default s;
