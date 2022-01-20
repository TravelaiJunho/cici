import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    // Contents
    layout_contents: {
        flex: 1,
        backgroundColor: colors.black
    },
    video: {
        width: '100%',
        height: '100%'
    },
    layout_pause: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        backgroundColor: colors.black
    },
    layout_button: {
        ...StyleSheet.absoluteFill,
        justifyContent: "center",
        alignItems: "center"
    },
    image_button: {
        width: Layout.UISize(60),
        height: Layout.UISize(60)
    },
    // Title
    layout_title: {
        paddingTop: Layout.UISize(13),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(13),
    },
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark,
    },
});

export default s;
