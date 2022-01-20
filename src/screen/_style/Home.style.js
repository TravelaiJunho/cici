import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    list_container: {
        flex: 1,
        // marginTop: Layout.UISize(10),
    },
    // Title
    layout_title: {
        width: Layout.UISize(160),
        height: Layout.UISize(20),
        //justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    image_title: {
        width: Layout.UISize(158),
        height: Layout.UISize(20),
    },
    layout_badge: {
        position: 'absolute',
        right: -Layout.UISize(14),
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
