import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
        backgroundColor: colors.black
    },
    item_layout: {
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    video_layout: {
        width: Layout.DEVICE_WIDTH,
        height: Layout.DEVICE_WIDTH,
        justifyContent:"center",
        alignItems:"center",
    },
    youtube: {
        width: '100%',
        height: '100%',
    },
    image_thumb: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    layout_icon: {
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
    },
    image_icon: {
        width: Layout.UISize(60),
        height: Layout.UISize(60),
    }
});

export default s;
