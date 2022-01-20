import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    menuContainer: {
        flexGrow: 1,
        width: Layout.DEVICE_WIDTH,
    },
    listItemContainer: {
        width: Layout.DEVICE_WIDTH,
        minHeight: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.background,
    },
    listItem: {width: "100%", borderBottomWidth:1, borderBottomColor:colors.grayDark, paddingBottom:20,},
    categoryContainer:{
        marginTop:Layout.UISize(20),
        marginBottom:Layout.UISize(10),
    },
    listTitle:{
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {width: '100%', height: 1, backgroundColor: colors.grayDark },
});

export default s;
