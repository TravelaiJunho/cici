import React, {useEffect, useState} from "react";
import {TouchableOpacity, StyleSheet, View, FlatList, TouchableNativeFeedbackComponent} from "react-native";
import {connect} from "react-redux";
import Loader from "../../component/loader/Loader";
import {colors} from '@util/Color';
import HomeHeader from "./HomeHeader";

import {Dummy_Home} from "@data/dummy"
import NewsCard from "./NewsCard";
import FeedCard from "./FeedCard";

function Home() {

    const [isShowLoader,setIsShowLoader] = useState(false)

    const [data, setData] = useState(null);

    useEffect(()=>{
        setIsShowLoader(true);
        // 데이터를 가져오는 코드
        setTimeout(()=>{
            setData(Dummy_Home);
            setIsShowLoader(false)
        }, 3000)

    }, [])

    const renderItem = ({item, index}) => {
        switch(item.type) {
            case "news": {
                return (<NewsCard item={item} />)
            }
            case "feed": {
                return (<FeedCard item={item} />)
            }
        }
    }

    return(
        <View style={styles.container}>

            <Loader isLoading={isShowLoader}/>
            <HomeHeader accountImage={data?.myAccount.imageUrl} onLogoPress={null} onAcountPress={null} alram={true} ></HomeHeader>
            <FlatList
                data={data?.list}
                renderItem={renderItem}
            >

            </FlatList>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    }
})

export default Home;
