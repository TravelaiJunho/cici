import {StyleSheet} from 'react-native';
import Layout from '../../../util/Layout';

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Image
    image_layout: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    // Overlay
    overlay_container: {
        // flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: Layout.UISize(10),
    },
    // Icon
    icon_layout: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
});

export default s;
