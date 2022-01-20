import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: Layout.UISize(30)
    },
    title: {
        width: "100%",
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginBottom:Layout.UISize(10)
    },
    sidebysice: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom: Layout.UISize(10),
    },
    question_text:{
        width: "100%",
        paddingBottom: Layout.UISize(5),
        marginBottom: Layout.UISize(10),
        marginTop: Layout.UISize(10),
        justifyContent:'center',
        alignItems:'flex-start'
    },
    question_date:{
        width: Layout.UISize(335),
        borderRadius: Layout.UISize(4),
        paddingBottom: Layout.UISize(10),
        marginTop: Layout.UISize(10),
        marginBottom: Layout.UISize(20),
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        justifyContent:'center',
        alignItems:'flex-start'
    },
    ////////////////////
    // Image
    layout_image: {
        marginTop: Layout.UISize(25)
    },
    layout_image_title: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(8)
    },
    container_image_list: {
        flexDirection: "row",
        marginRight: Layout.UISize(20),
    },
    layout_add_image_button: {
        alignItems: "center",
        justifyContent: "center",
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        marginTop: Layout.UISize(8),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(8),
        borderRadius: Layout.UISize(8),
        backgroundColor: colors.grayDark,
    },
    layout_add_image: {
        marginLeft: Layout.UISize(8),
    },
    image_add: {
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        marginTop: Layout.UISize(8),
        marginRight: Layout.UISize(8),
        borderRadius: Layout.UISize(8),
    },
    image_close_icon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    image_close: {
        width: Layout.UISize(16),
        height: Layout.UISize(16)
    },
    select_image_box: {
        justifyContent:'center',
        alignItems:'center',
        marginRight: Layout.UISize(15),
    },
    image_box: {
        marginTop: Layout.UISize(10),
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        borderRadius: 8,
        backgroundColor: colors.grayDark
    }
});

export default s;
