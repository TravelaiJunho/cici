import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    layout_top: {
        width: Layout.DEVICE_WIDTH,
        height: Layout.UISize(Layout.HEADER_HEIGHT),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    rectangle: {
        width: Layout.UISize(105),
        height: Layout.UISize(55),
        borderRadius: Layout.UISize(4),
        //marginLeft: Layout.UISize(5),
        //marginRight: Layout.UISize(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grayDark
    },
    menuContainer: {
        flexGrow: 1,
    },
    listItemContainer: {
        width: "100%",
        height: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.navy,
        borderTopWidth: 1,
        borderTopColor: colors.grayDark,
    },
    newTag: {
        width: Layout.UISize(34),
        height: Layout.UISize(16),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Layout.UISize(15),
        marginBottom: Layout.UISize(20),
    },
    topMenuContainer: {
        height: Layout.UISize(55),
        marginTop: Layout.UISize(20),
        marginBottom: Layout.UISize(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.background,
    },
    dot: {
        position: 'absolute',
        top: Layout.UISize(-5),
        right: Layout.UISize(-5),
        width: Layout.UISize(5),
        height: Layout.UISize(5),
        borderRadius: Layout.UISize(2.5),
        backgroundColor: colors.orange,
    },
    ////////////////////////////////
    // Service Center
    layout_help: {
        height: Layout.UISize(90),
        alignItems: "center",
        justifyContent: "center",
        marginTop: Layout.UISize(15),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(15), // + Layout.getBottomSpace(),
        borderColor: colors.gray,
        borderWidth: Layout.UISize(1),
        borderRadius: Layout.UISize(4),
    },
    layout_help_mail: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
});

export default s;
