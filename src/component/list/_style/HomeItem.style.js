import {StyleSheet} from 'react-native';
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Thumbnail
    thumbnail_layout: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.black
    },
    // Image
    image_layout: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
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
    // Video
    video_layout: {
        height: '100%',
        width: '100%',
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    // Count
    count_layout: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    count_in_layout: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: Layout.UISize(5),
        paddingLeft: Layout.UISize(8),
        paddingRight: Layout.UISize(8),
        paddingBottom: Layout.UISize(5),
        backgroundColor: 'rgba(51, 51, 51, 0.7)',
        borderRadius: Layout.UISize(10),
    },
    count_text: {
        marginLeft: Layout.UISize(5),
        fontSize: Layout.UISize(14),
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.white,
    },
    mission: {
        position: 'absolute',
        right: Layout.UISize(2),
        top: Layout.UISize(10),
        height: Layout.UISize(16),
        width: Layout.UISize(55),
        resizeMode: 'cover',
    },
    media: {
        position: 'absolute',
        top: Layout.UISize(10),
        right: Layout.UISize(10),
        resizeMode: 'cover',
    },
});

export default s;
