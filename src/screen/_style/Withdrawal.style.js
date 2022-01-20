import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    desc_layout: {
        width: "100%",
        alignItems: 'flex-start',
        padding: Layout.UISize(20)
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: colors.grayDark,
        marginTop: Layout.UISize(20),
        marginBottom: Layout.UISize(20),
    },
    menu_background: {
        width: "100%",
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
        position:'absolute',
        bottom:0,
        width:"100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Layout.UISize(20),
        marginTop: Layout.UISize(20),
        backgroundColor: colors.background,

    },
    menu_btn_area: {
        width: Layout.UISize(160),
        height: Layout.UISize(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: colors.SLATE_GREY
    },
    layout_password: {
        marginTop: Layout.UISize(20),
        width: "100%",
        height: Layout.UISize(50),
        justifyContent:'center',
        alignItems: 'center',
    },
});

export default s;
