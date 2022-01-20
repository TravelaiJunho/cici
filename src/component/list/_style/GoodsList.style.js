import {StyleSheet} from 'react-native';
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_layout: {
        height: Layout.UISize(295),
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: colors.black
    },
    layout_item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Layout.UISize(20),
    },
    layout_empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        backgroundColor: colors.grayDark
    },
    types: {
        marginTop: Layout.UISize(10),
        marginBottom: Layout.UISize(10)
    },
    goods_info_layout: {
        justifyContent:'center',
        alignItems:'flex-start',
        width: '100%',
        marginTop: Layout.UISize(10),
        paddingBottom: Layout.UISize(25),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    type_layout: {
        marginBottom: Layout.UISize(15),
        justifyContent:'center',
        alignItems:'center',
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        height: Layout.UISize(25),
        borderRadius: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.LIGHT_AQUA
    },
    typeFont: {
        fontSize: 13,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.LIGHT_AQUA
    },
    date: {
        marginTop: Layout.UISize(5),
        marginBottom: Layout.UISize(5),
    },
    line: {
        width: "100%",
        height: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.CHARCOAL_GREY
    }
});

export default s;
