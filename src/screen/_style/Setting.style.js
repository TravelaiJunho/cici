import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";
import Common from "../../util/Common";

const s = StyleSheet.create({
    listItemContainer: {
        width: "100%",
        minHeight: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.navy,
        borderTopWidth: 1,
        borderTopColor: colors.grayDark,
    },
    mask: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: Layout.DEVICE_HEIGHT,
        backgroundColor: colors.dim
    },
    popEditContainer: {
        // position: 'absolute',
        // width: Layout.DEVICE_WIDTH,
        // height: Layout.DEVICE_HEIGHT,
        // marginBottom: Layout.UISize(34),
        // marginBottom: Platform.OS === 'ios' ? Layout.getBottomSpace() : Layout.UISize(30),
        justifyContent: 'flex-end',
        alignItems: 'center',
        // bottom:  Platform.OS === 'ios' ? Layout.getBottomSpace() : Layout.UISize(30),
        marginBottom: Common.checkIOS() ? Layout.getStatusBarHeight(true, false) : 0,
    },
    popEditBtnContainer: {
        width: Layout.UISize(335),
        height: Layout.UISize(155),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.grayDark,
        marginBottom: Layout.UISize(20),
    },
    popEditBtnTitle: {
        height: Layout.UISize(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {width: '100%', height: 1, backgroundColor: colors.gray},
    popEditBtn: {
        width: Layout.UISize(335),
        height: Layout.UISize(55),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.grayDark
    },
    btnContainer: {
        width: "100%",
        height: Layout.UISize(60), // + (Platform.OS == 'ios' ?  Layout.getBottomSpace() : Layout.UISize(34)),
        backgroundColor: colors.navy,
        borderTopColor: colors.grayLight,
        borderTopWidth: 1,
    },
    btnBottomContainer: {
        width: "100%",
        height: Layout.UISize(60),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: colors.navy,
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    btnBottom: {
        width: Layout.UISize(160),
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.gray
    },
    btnBottomSpace: {
        width: "100%",
        // height: Layout.getBottomSpace(),
        backgroundColor: colors.navy,
    },
});

export default s;
