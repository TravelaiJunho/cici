import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    bottomcontainer: {
        //position: 'absolute',
        bottom:0,
        width: Layout.DEVICE_WIDTH,
        height: Layout.UISize(120) + Layout.UISize(20), // + Layout.getBottomSpace(),

        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: colors.background,
    },
    textcontainer:{
        height: Layout.UISize(60),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        justifyContent:'center',
        alignItems:'flex-start',
        flexDirection:'row',
        paddingTop: Layout.UISize(15),
    },
    btnContainer: {
        width: Layout.DEVICE_WIDTH,
        height: Layout.UISize(80), // + Layout.getBottomSpace(),
        backgroundColor: colors.navy,
    },
    btnBottomContainer: {
        width: Layout.DEVICE_WIDTH,
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
    btnBottomOne: {
        width: Layout.UISize(335),
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.gray
    },
    btnBottomSpace: {
        width: Layout.DEVICE_WIDTH,
        // height: Layout.getBottomSpace(),
        backgroundColor: colors.navy,
    },
    checkbox: {
        width:'100%',
        height: Layout.UISize(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
    },
    question_text:{
        width: Layout.UISize(335),
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
    question_image:{
        marginTop: Layout.UISize(10),
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        borderRadius: Layout.UISize(8),
        backgroundColor: colors.grayDark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question_image_container:{
        width: Layout.UISize(90),
        height: Layout.UISize(90),

    },
    question_image_box:{
        width: Layout.UISize(90),
        height: Layout.UISize(90),
        borderRadius: Layout.UISize(8),
    },
    question_image_cancel:{
        position: 'absolute',
        top: -Layout.UISize(8),
        right: -Layout.UISize(8),
        width: Layout.UISize(16),
        height: Layout.UISize(16),
        borderRadius: Layout.UISize(8),
        backgroundColor: colors.black94
    },
    image_close: {
        width: Layout.UISize(16),
        height: Layout.UISize(16)
    },
    top_request:{
        marginTop: Layout.UISize(20),
        paddingBottom: Layout.UISize(20),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    top_reject_container: {
        width: Layout.DEVICE_WIDTH,
        borderBottomColor: colors.grayDark,
        borderBottomWidth: 1,
        marginBottom: Layout.UISize(10),
    },
    top_reject_inner:{
        marginTop: Layout.UISize(20),
        paddingBottom: Layout.UISize(20),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    top_applying_container: {
        width: Layout.DEVICE_WIDTH,
        borderBottomColor: colors.grayDark,
        borderBottomWidth: 1,
        marginBottom: Layout.UISize(10),
    },
    top_applying_inner:{
        marginTop: Layout.UISize(20),
        paddingBottom: Layout.UISize(20),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    trans_range: {
        width: Layout.DEVICE_WIDTH,
        alignItems: "flex-end",
        paddingRight: Layout.UISize(20),
        marginBottom: Layout.UISize(20),
    }
});

export default s;
