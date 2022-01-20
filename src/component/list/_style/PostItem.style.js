import {StyleSheet} from 'react-native';
import Layout from '../../../util/Layout';
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    // text
    text_layout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.navyLight
    },
    text_in_layout: {
        position: 'absolute',
        left: Layout.UISize(12),
        right: Layout.UISize(12),
        bottom: Layout.UISize(12),
    },
    // Image
    image_layout: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    layout_icon: {
        position: 'absolute',
        top: Layout.UISize(10),
        right: Layout.UISize(10),
        resizeMode: 'cover',
    },
});

export default s;
