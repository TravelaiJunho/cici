import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Contents
    container: {
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        alignItems: "flex-start",
        justifyContent: "center",
    },
    dot: {
        position: 'absolute',
        top: Layout.UISize(-5),
        right: Layout.UISize(-5),
        width: Layout.UISize(5),
        height: Layout.UISize(5),
        borderRadius: Layout.UISize(2.5),
        backgroundColor: colors.orange,

    },
    layout_right: {
        flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'
    },
    layout_badge: {
        position: 'absolute',
        right: -Layout.UISize(8),
        top: -Layout.UISize(7),
        width: Layout.UISize(14),
        height: Layout.UISize(14),
        borderRadius: Layout.UISize(7),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.orange
    },
});

export default s;
