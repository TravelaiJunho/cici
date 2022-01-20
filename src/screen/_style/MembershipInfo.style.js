import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    top_container:{
        width: "100%",
        marginTop:Layout.UISize(20),
        marginBottom:Layout.UISize(20),
        flexDirection:'row',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        justifyContent:'flex-start',
        alignItems:'center',
    },
    img_container:{
    },
    topInfo:{
        paddingLeft: Layout.UISize(17),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    group:{
        width: Layout.UISize(106),
        height: Layout.UISize(25),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Layout.UISize(20),
        marginBottom: Layout.UISize(15),
    },
    group_inner:{
        position: 'absolute',
        top: Layout.UISize(1),
        left: Layout.UISize(1),
        right: Layout.UISize(1),
        bottom: Layout.UISize(1),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Layout.UISize(20),
        backgroundColor: colors.navy,
    },
    group_apply:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line:{width: '100%', height: 1, backgroundColor: colors.grayDark},
    menu_container: {
        width: "100%",
        height: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.navy
    },
    group_apply_list:{
        width: "100%",
        height: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.navy
    }
});

export default s;
