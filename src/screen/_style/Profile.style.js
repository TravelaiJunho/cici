import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";
import Common from "../../util/Common";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Layout.getStatusBarHeight(false),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mask: {
        position: 'absolute',
        bottom: 0,
        width: Layout.DEVICE_WIDTH,
        height: Layout.DEVICE_HEIGHT,
        justifyContent: 'flex-end',
        backgroundColor: colors.dim
    },
    popEditContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Common.checkIOS() ? Layout.getStatusBarHeight(true, false) : 0,
        // bottom: Platform.OS === 'ios' ? Layout.getBottomSpace()  : Layout.UISize(30),
    },
    popEditBtnContainer: {
        width: Layout.UISize(335),
        height: Layout.UISize(210),
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
    listLine: {width: Layout.DEVICE_WIDTH, height: 1, backgroundColor: colors.gray},
    popEditBtn: {
        width: Layout.UISize(335),
        height: Layout.UISize(55),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.grayDark
    },
    btnContainer: {
        width: "100%",
        height: Layout.UISize(80), // + Layout.getBottomSpace(),
        backgroundColor: colors.navy,
        borderTopColor: colors.grayDark,
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
        height: Layout.getBottomSpace(),
        backgroundColor: colors.navy,
    },
    topContainer: {
        width: "100%",
        height: Layout.UISize(236),
        padding: Layout.UISize(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    topImageBase: {
        width: Layout.UISize(140),
        height: Layout.UISize(140),
        borderRadius: Layout.UISize(70),
        backgroundColor: colors.grayDark,
        marginBottom: Layout.UISize(20),
        alignItems: "center",
        justifyContent: "center",
    },
    phoneEditor: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    phoneEditorInput: {
        marginLeft: Layout.UISize(10),
        width: "100%",
        height: Layout.UISize(55),
    },
    nicknameEditorInput: {
        width: "100%",
        height: Layout.UISize(55),
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        height: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        backgroundColor: colors.navy,
        borderTopWidth: 1,
        borderTopColor: colors.grayDark,
    }
});

export default s;
