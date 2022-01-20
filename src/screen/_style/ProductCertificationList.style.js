import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex:1,
    },
    modal: {
        top: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.COLOR_BG_OPA_BLACK_80
    },
    mask: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.dim
    },
    menu_background: {
        //zIndex: 2000,
        //position: 'absolute',
        //bottom: 0, //-Layout.getBottomSpace(),
        width: "100%",
        borderTopLeftRadius: Layout.UISize(16),
        borderTopRightRadius: Layout.UISize(16),
        paddingBottom: Layout.UISize(15),
        backgroundColor: colors.grayDark,
    },
    layout_password: {
        marginTop: Layout.UISize(20),
        height: Layout.UISize(50),
    },
    menu_title: {
        width: "100%",
        padding: Layout.UISize(20),
    },
    line: {
        height: Layout.UISize(1),
        backgroundColor: colors.SLATE_GREY
    },
    id_area: {
        width: "100%",
        height: Layout.UISize(70),
        marginTop: Layout.UISize(30),
        marginBottom: Layout.UISize(10),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        justifyContent: 'space-between',
    },
    dot: {
        marginLeft: Layout.UISize(5),
        width: Layout.UISize(4),
        height: Layout.UISize(4),
        borderRadius: Layout.UISize(2),
        backgroundColor: colors.orange,
    },
    menu_bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingTop: Layout.UISize(20),
        marginTop: Layout.UISize(20),
        //paddingBottom: Layout.UISize(15), // + Layout.getBottomSpace(),

    },
    menu_btn_area: {
        width: Layout.UISize(160),
        height: Layout.UISize(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: colors.SLATE_GREY
    },
    center_text: {
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: Layout.UISize(60),
        marginRight: Layout.UISize(60),
    },
});

export default s;
