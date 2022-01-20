import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Contents
    layout_buttons: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Left
    image_icon: {
        width: Layout.UISize(20),
        height: Layout.UISize(20),
    },
    ////////////////////
    // Center
    layout_center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: Layout.UISize(60),
        marginRight: Layout.UISize(60),
    },
});

export default s;
