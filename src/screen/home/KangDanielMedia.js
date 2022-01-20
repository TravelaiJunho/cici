////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, View} from "react-native";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import BaseStyle from "../../util/style/Base.style";
import s from "./../_style/KangDanielMedia.style"
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseText from "../../component/_base/BaseText";
import BackHeader from "../../component/header/BackHeader";
import FullWidthImage from "../../component/image/FullWidthImage";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {IndexDanielDiscography, IndexDanielList, IndexWeAreDanity} from "../../data/http/Index";

////////////////////////////////////////

const TYPE_DANIEL = 'daniel';
const TYPE_WE_ARE_DANITY = 'we_are_danity';
const TYPE_DANIEL_DISCOGRAPHY = 'discography';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class KangDanielMedia extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            // List
            list: [],
            refreshing: false,
            pageNum: 1,
            // updateDate: 0,
        }
        this.type = this.props.route.params.type;
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
        this.init();
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        switch (this.type) {
            case TYPE_DANIEL:
                this.getIndexDanielList();
                break;

            case TYPE_DANIEL_DISCOGRAPHY:
                this.getIndexDanielDiscographyList();
                break;

            case TYPE_WE_ARE_DANITY:
                this.getIndexWeAreDanity();
                break;
        }
    }

    // getRealImageSize = _ => {
    //     this.state.list.map((item, index) => {
    //         Image.getSize(item.image_url, (width, height) => {
    //             item.ratio = width / height;
    //             // this.setState({
    //             //     updateDate: Date.now()
    //             // })
    //         })
    //     })
    // }

    // List
    loadRefreshList = () => {
        if (this.type !== TYPE_DANIEL_DISCOGRAPHY) return;
        this.setState({
            refreshing: true,
            pageNum: 1,
        }, this.getIndexDanielDiscographyList);
    }

    loadMoreList = () => {
        if (this.type !== TYPE_DANIEL_DISCOGRAPHY) return;
        let nextPage = this.state.pageNum + 1;
        this.getIndexDanielDiscographyList(nextPage)
    }

    // API
    getIndexDanielList = _ => {
        IndexDanielList((success, code, message, data) => {
            if (success) {
                this.setState({list: [data]});
                // this.setState({
                //     list: [data]
                // }, () => {
                //     this.getRealImageSize()
                // })
            }
        });
    }

    getIndexWeAreDanity = _ => {
        IndexWeAreDanity((success, code, message, data) => {
            if (success) {
                this.setState({list: [data]});
                // this.setState({
                //     list: [data]
                // }, () => {
                //     this.getRealImageSize()
                // })
            }
        });
    }

    getIndexDanielDiscographyList = (nextPage = 1) => {
        IndexDanielDiscography(nextPage, (success, code, message, data) => {
            if (success) {
                let list = this.state.list;
                if (nextPage === 1) {
                    list = data.results;
                } else {
                    list = list.concat(data.results)
                }
                this.setState({
                    list: list,
                    pageNum: nextPage,
                    refreshing: false,
                });
            }
        })
    }

    ////////////////////
    // RENDER
    renderImage = ({item, index}) => {
        return <FullWidthImage url={item.image_url}/>;
        // let ratio = 1;
        // if (!Common.isEmpty(item.ratio)) ratio = item.ratio;
        // return (
        //     <BaseImage style={[s.image, {aspectRatio: ratio}]}
        //                resizeMode={'contain'}
        //                source={{uri: item.image_url}}/>);
    }

    render() {
        const {
            // isLoading,
            isShowConfirm, errorMessage, callback,
            refreshing, list
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                {/*<Loader isLoading={isLoading}/>*/}
                {/* List */}
                {this.type === TYPE_DANIEL_DISCOGRAPHY
                    ? <FlatList style={{flex: 1}}
                                contentContainerStyle={{flexGrow: 1}}
                                data={list}
                                threshold={2}
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderImage}
                                refreshing={refreshing}
                                onRefresh={this.loadRefreshList}
                                onEndReached={this.loadMoreList}/>
                    : <FlatList style={{flex: 1}}
                                contentContainerStyle={{flexGrow: 1}}
                                data={list}
                                threshold={2}
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderImage}/>}
                {/* Header */}
                <BackHeader style={s.header}
                            skipAndroidStatusBar={false}
                            onBackPress={_ => this.props.navigation.pop()}
                            useBorder={false}/>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default KangDanielMedia;
