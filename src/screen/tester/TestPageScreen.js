////////////////////////////////////////
// CLASS
////////////////////////////////////////
import React,{Component} from "react";
import {ScrollView, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import DeviceInfo from "react-native-device-info";
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";
import BaseText from "../../component/_base/BaseText";
import FontStyle from "../../util/style/Font.style";
import Common from "../../util/Common";
import NetInfo from "@react-native-community/netinfo";

import {connect} from "react-redux";
import BaseImage from "../../component/_base/BaseImage";
import SubjectiveText from "../../component/question/SubjectiveText";
import SubjectiveDate from "../../component/question/SubjectiveDate";
import SelectImage from "../../component/question/SelectImage";
import s from "../../component/question/_style/base.style";
import MultipleChoice from "../../component/question/MultipleChoice";
import Screen from "../../util/type/Screen";

class TestPageScreen extends Component {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            diskPercent:1,
            // network
            connectType: '',
            isConnected: '',
        }
        this.freeDisk = 0;
        this.totalDisk = 0;
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        this.getDiskInfo();
        this.initNetworkState();
    }

    componentWillUnmount() {
        if(this.unsubscribeNetInfo) {
            this.unsubscribeNetInfo();
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    ////////////////////
    // FUNCTION
    initNetworkState = () => {
        this.unsubscribeNetInfo = NetInfo.addEventListener(networkState => {
            console.log("Connection type - ", networkState.type);
            console.log("Is connected? - ", networkState.isConnected);
            this.setState({
                connectType: networkState.type,
                isConnected: networkState.isConnected
            })
        });
    }
    getDiskInfo = async () => {
        this.freeDisk = await DeviceInfo.getFreeDiskStorage();
        this.totalDisk = await DeviceInfo.getTotalDiskCapacity();
        let useDisk = this.totalDisk - this.freeDisk;
        //console.warn(this.freeDisk, this.totalDisk)
        this.setState({
            diskPercent: useDisk/this.totalDisk,
        })
    }

    ////////////////////
    // RENDER
    renderDisk = () => {
        let allWidth = Layout.DEVICE_WIDTH - Layout.UISize(40);
        let freeWidth = allWidth * this.state.diskPercent;
        return (
            <View type={"diskstate"} style={styles.section}>
                <View style={{width:allWidth, height:20, backgroundColor:colors.gray}}>
                    <View style={{width:freeWidth, height:20, backgroundColor:colors.mint}} />
                </View>
                <BaseText style={FontStyle.CaptionWhiteCH}>{`${ Common.formatBytes(this.freeDisk)} / ${Common.formatBytes(this.totalDisk)}`}</BaseText>
            </View>

        )
    }

    renderNetworkState = () => {
        const {connectType, isConnected} = this.state;
        return (
            <View type={"networkstate"} style={styles.section_sidebyside}>
                <Text style={[styles.font_17, {fontWeight:"bold", color:colors.orange}]}>{connectType}</Text>
                <Text style={styles.font_17}>{isConnected?"Connected":"DisConnected"}</Text>
            </View>
        )
    }

    onDone = () => {
        this.getDiskInfo();
    }

    renderDownloadList = () => {
        console.warn('Download Opt :', this.props.downloadOption)
        return null
    }


    renderQuestion = () => {
        return(
            <View style={{padding:Layout.UISize(20)}}>
                <SubjectiveText
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                />
                <SubjectiveDate
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                />
                <SelectImage
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                />
                <MultipleChoice
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                    type={"S"}
                />
                <MultipleChoice
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                    type={"M"}
                />
                <MultipleChoice
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                    type={"SI"}
                />
                <MultipleChoice
                    title={"[필수]관리자에서 입력된 질문."}
                    frontTitle={"Q1."}
                    type={"MI"}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center'}}>
                {/* Disk */}
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.goBack();
                    }}
                >
                    <Text style={styles.font_30}>TEST PAGE</Text>
                </TouchableOpacity>

                <ScrollView>
                    <TouchableOpacity
                        style={styles.section}
                        onPress={()=>{
                            this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.POST_VOTE)
                        }}
                    >
                        <BaseText style={styles.font_17}>GO POST_VOTE</BaseText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.section}
                        onPress={()=>{
                            this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.POST_PUBLIC_BROADCAST)
                        }}
                    >
                        <BaseText style={styles.font_17}>GO POST_PUBLIC_BROADCAST</BaseText>
                    </TouchableOpacity>
                    {this.renderDisk()}
                    {/*{this.renderNetworkState()}*/}
                    {this.renderDownloadList()}
                    {/*this.renderVRProductList()*/}
                    {
                        this.renderQuestion()
                    }

                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    section: {
        padding:Layout.UISize(15),
        width: Layout.DEVICE_WIDTH,
        borderBottomColor: colors.mint,
        borderBottomWidth: 1,
    },
    section_sidebyside: {
        padding:Layout.UISize(15),
        width: Layout.DEVICE_WIDTH,
        borderBottomColor: colors.mint,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    section_side: {
        padding:Layout.UISize(15),
        width: Layout.DEVICE_WIDTH,
        borderBottomColor: colors.mint,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        padding:Layout.UISize(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:Layout.UISize(5),
        marginRight:Layout.UISize(5),
        backgroundColor: colors.mango
    },
    font_30: {
        fontSize: Layout.UISize(30),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    font_17: {
        fontSize: Layout.UISize(17),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.white
    },
    font_12: {
        fontSize: Layout.UISize(12),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
})

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TestPageScreen);
