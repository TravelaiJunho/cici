import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    // Youtube
    layout_youtube: {
        height: Layout.DEVICE_WIDTH,
        justifyContent: 'center',
        backgroundColor: colors.black,
    },
    youtube: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.black
    },
    image_youtube: {
        width: Layout.UISize(67),
        height: Layout.UISize(15),
        marginTop: Layout.UISize(25)
    },
    // Title
    layout_title: {
        paddingTop: Layout.UISize(13),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(13),
    },
});

export default s;
