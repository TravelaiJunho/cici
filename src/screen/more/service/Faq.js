////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import {ListItem} from "react-native-elements";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from "../../../util/style/Font.style";
import {colors} from "../../../util/Color";
import Layout from "../../../util/Layout";
import s from "../../_style/Faq.style";
import localize from "../../../util/Localize";
import Icon from "../../../util/Icon";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import BaseText from "../../../component/_base/BaseText";
import TagSelectHorizontalScrollButton from "../../../component/button/TagSelectHorizontalScrollButton";
import RefreshState from "../../../component/_common/refresh/RefreshState";
import RefreshFlatList from "../../../component/_common/refresh/RefreshFlatList";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
// API
import {STATUS} from "../../../data/redux/_base/ActionType";
import {contentFaq, contentFaqCategories} from "../../../data/http/Content";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Faq extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            //
            selectCategoryIndex: 0,
            categories: [],
            //
            faqContents: [],
            // refreshing: false,
            // pageNum: 1,
            //
            selectIndex: -1,
        }
        this.categoriesData = [];
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
        this.getCategoryList();
    }

    ////////////////////
    // FUNCTION
    getErrorMessage = (code = 0) => {
        switch (code) {
            default:
                return localize.error.failed;
        }
    }

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                confirmCallback: callback,
                errorMessage: message
            });
        }
    }

    setList = (list, page = 1) => {
        this.setState({
            faqContents: list,
            // pageNum: page
        });
    }

    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const last = list[list.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    loadRefreshList = _ => {
        this.getContentList();
    }

    loadMoreList = _ => {
        this.getContentList(this.getLastId(this.state.faqContents), 1, false);
    }

    setStatusRefresh = status => {
        switch (status) {
            case STATUS.COMPLETE:
                this.list.endRefreshing(RefreshState.CanLoadMore);
                break;

            case STATUS.FAIL:
                this.list.endRefreshing(RefreshState.NoMoreData);
                break;
        }
    };

    // Event
    onMenu = (item, index) => {
        this.setState({
            selectIndex: this.state.selectIndex === index ? -1 : index,
            // pageNum: 1,
        });
    }

    // API
    getCategoryList = _ => {
        contentFaqCategories((success, code, message, data) => {
            // console.warn(success, code, message, data)
            if (success) {
                this.categoriesData = data;
                const c = this.categoriesData.map(item => {
                    return item.name;
                })
                this.setState({categories: c}, this.getContentList);
            } else {
                this.setShowConfirm(true, Common.isEmpty(message) ? this.getErrorMessage(10) : message);
            }
        });
    }

    getContentList = (lastId = '', page = 1, isRefresh = true) => {
        const category = this.categoriesData[this.state.selectCategoryIndex];
        contentFaq(null, category.id, lastId, page, (success, code, message, data) => {
            if (success && data.results.length > 0) {
                this.setList(isRefresh ? data.results : this.state.faqContents.concat(data.results), page);
                if (Common.isEmpty(data.next)) {
                    this.setStatusRefresh(STATUS.FAIL);
                } else {
                    this.setStatusRefresh(STATUS.COMPLETE);
                }
            } else {
                if (isRefresh) this.setList([], page);
                this.setStatusRefresh(STATUS.FAIL);
            }
        })
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => {
        const viewContent = this.state.selectIndex === index;
        return (
            <ListItem containerStyle={s.listItemContainer}
                      onPress={_ => this.onMenu(item, index)}>
                <View style={[s.listItem, {borderBottomWidth: index === this.state.faqContents.length ? 0 : 1}]}>
                    <View style={[s.listTitle]}>
                        <ListItem.Title style={[FontStyle.CntWhiteLN, {width: "80%"}]}>{item.title}</ListItem.Title>
                        {viewContent
                            ? <Icon.SignUp size={Layout.UISize(14)} color={colors.white}/>
                            : <Icon.SignDown size={Layout.UISize(14)} color={colors.white}/>}
                    </View>
                    {viewContent &&
                    <View style={{marginTop: Layout.UISize(20)}}>
                        <BaseText style={FontStyle.Cnt13WhiteLT}>{item.content}</BaseText>
                    </View>}
                </View>
            </ListItem>);
    }

    render() {
        const {
            isLoading,
            isShowConfirm, errorMessage, callback,
            categories, selectCategoryIndex,
            faqContents
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.service_center.faq}
                            onBackPress={_ => this.props.navigation.pop()}/>
                <View style={s.categoryContainer}>
                    <TagSelectHorizontalScrollButton titles={categories}
                                                     selectIndex={selectCategoryIndex}
                                                     onSelectIndex={index => {
                                                         if (selectCategoryIndex === index) return;
                                                         this.setState({selectCategoryIndex: index}, this.getContentList);
                                                     }}/>
                </View>
                {/* Content */}
                <RefreshFlatList ref={ref => this.list = ref}
                                 data={faqContents}
                                 showsVerticalScrollIndicator={false}
                                 contentContainerStyle={s.menuContainer}
                                 extraData={this.state}
                                 keyExtractor={(item, index) => index.toString()}
                                 scrollEventThrottle={16}
                                 renderItem={this.renderItem}
                                 onHeaderRefresh={this.loadRefreshList}
                                 onFooterRefresh={this.loadMoreList}/>
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

export default Faq;
