import {StyleSheet} from 'react-native';
import Layout from '@util/Layout';
import {colors} from '@util/Color';

const s = StyleSheet.create({
    container: {
        backgroundColor: colors.background
    },
    ////////////////////
    // DIVIDER
    divider_horizontal: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
    ////////////////////
    // TAB
    tab_container: {
        height: Layout.UISize(60), // + Layout.getBottomSpace(),
        flexDirection: 'row',
        justifyContent: "space-between",
        // paddingLeft: Layout.UISize(20),
        // paddingRight: Layout.UISize(20),
        // paddingBottom: Layout.getBottomSpace()
    },
    tab_layout: {
        flex: 1,
    },
    tab_contents_layout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab_text_title: {
        marginTop: Layout.UISize(5)
    },
    ////////////////////
    // BADGE
    badge_contents_layout: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
    },
    badge_top_area: {
        width: Layout.UISize(35),
        alignItems: 'flex-end',
        marginTop: Layout.UISize(8),
    }
});

export default s;
