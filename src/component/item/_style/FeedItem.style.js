import {StyleSheet} from 'react-native';
import {colors} from '../../../util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        paddingTop: Layout.UISize(20),
        paddingBottom: Layout.UISize(25),
    },

    ////////////////////
    // Top
    layout_top: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    layout_top_info: {
        flex: 1,
        marginLeft: Layout.UISize(10)
    },
    ////////////////////
    // Contents
    layout_contents: {
        marginTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Media
    layout_media: {
        marginTop: Layout.UISize(15)
    },
    pager_media: {
        height: Layout.DEVICE_WIDTH
        // height: Layout.UISize(295)
    },
    layout_indicator: {
        alignItems: 'center',
        marginTop: Layout.UISize(12)
    },
    layout_image: {
        flex: 1,
    },
    image_media: {
        flex: 1,
        backgroundColor: colors.black,
        // transform: [{scale: 0.8}]
    },
    video_media_detail: {
        width: Layout.DEVICE_WIDTH,
        height: Layout.DEVICE_WIDTH,
    },
    image_media_detail: {
        width: Layout.DEVICE_WIDTH,
        backgroundColor: colors.black,
    },
    ////////////////////
    // Bottom
    layout_bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    layout_bottom_inside: {
        flexDirection: "row",
    },
    layout_bottom_like: {
        marginLeft: Layout.UISize(5),
        marginRight: Layout.UISize(15)
    },
    layout_bottom_comment: {
        marginLeft: Layout.UISize(5)
    },
    DateRow: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'
    },
    translate_layout: {
        width:Layout.DEVICE_WIDTH,
        justifyContent:'center',
        alignItems:'flex-end',
        marginTop: Layout.UISize(20),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    //////////////////////
    // disable
    layout_disable: {
        marginTop: Layout.UISize(20),
        paddingTop: Layout.UISize(25),
        paddingBottom: Layout.UISize(25),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.COLOR_BG_BLANK,
    },
    layout_disable_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Layout.UISize(15),
    },
    layout_disable_comment: {
        borderWidth: Layout.UISize(1),
        borderRadius: 5,
        borderColor: colors.white,
        padding: Layout.UISize(15),
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        justifyContent: 'center',
        alignItems : 'flex-start'
    },

});

export default s;
