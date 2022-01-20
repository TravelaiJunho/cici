import {StyleSheet} from 'react-native';
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    iframe_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    ////////////////////
    //
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
