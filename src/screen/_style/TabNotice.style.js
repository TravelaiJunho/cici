import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Item
    layout_item: {
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    layout_item_top: {
        flexDirection: "row",
        marginBottom: Layout.UISize(5),
        alignItems: "center",
    },
    layout_item_new: {
        height: Layout.UISize(16),
        marginRight: Layout.UISize(10),
        paddingTop: Layout.UISize(2),
        paddingLeft: Layout.UISize(5),
        paddingRight: Layout.UISize(5),
        paddingBottom: Layout.UISize(2),
        borderRadius: Layout.UISize(7),
        backgroundColor: colors.orange,
    },
    layout_item_title: {
        flex: 1,
    },
    // Chip
    layout_chip: {
        marginTop: Layout.UISize(15),
        marginBottom: Layout.UISize(0)
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark
    },
    layout_status: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: Layout.UISize(10),
    },
    layout_status2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    layout_progress_status: {
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
    layout_progress_status2: {
        height: Layout.UISize(16),
        borderRadius: Layout.UISize(20),
        paddingTop: Layout.UISize(2),
        paddingLeft: Layout.UISize(5),
        paddingRight: Layout.UISize(5),
        paddingBottom: Layout.UISize(2),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
    layout_ended_status: {
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderWidth: Layout.UISize(1),
        borderColor: colors.grayDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
    layout_ended_status2: {
        height: Layout.UISize(16),
        borderRadius: Layout.UISize(20),
        paddingTop: Layout.UISize(2),
        paddingLeft: Layout.UISize(5),
        paddingRight: Layout.UISize(5),
        paddingBottom: Layout.UISize(2),
        borderWidth: Layout.UISize(1),
        borderColor: colors.grayDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    }
});

export default s;
