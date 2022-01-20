import {StyleSheet} from 'react-native';
import {colors} from '../../../util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    mask: {
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: colors.dim
    },
    container: {
        //position: 'absolute',
        //bottom:0,
        //paddingBottom: Layout.UISize(15),
        paddingTop: Layout.UISize(15),
        backgroundColor: colors.grayDark,
        //height: Layout.UISize(475),
        borderTopRightRadius: Layout.UISize(16),
        borderTopLeftRadius: Layout.UISize(16),
        paddingBottom: Layout.UISize(15) + Layout.getBottomSpace(),
    },
    top_container: {
        height: Layout.UISize(74),
    },
    top_inner_view: {
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        marginBottom: Layout.UISize(15),
    },
    layout_bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //height: Layout.getBottomSpace(),
        marginTop: Layout.UISize(30)
    },
    button_style: {
        width: Layout.UISize(160),
        height: Layout.UISize(45),
        borderRadius: 4,
    },
    title_text: {
        marginBottom: Layout.UISize(8)
    },
    line: {
        width: "100%",
        height: Layout.UISize(1),
        backgroundColor: colors.gray
    },
    bottom_container: {
        justifyContent: "flex-end",
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
    },
    language_container: {
        //flex:1,
        //paddingTop:Layout.UISize(20),

        height:Layout.UISize(306),
    },
    language_scrollview: {
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingTop: Layout.UISize(20),
    }
})

export default s;
