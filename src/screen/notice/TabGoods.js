import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import _ from "lodash";

import FontStyle from "../../util/style/Font.style";
import BaseStyle from "../../util/style/Base.style";
import s from '../_style/TabNotice.style';
import Screen from "../../util/type/Screen";
import localize from "../../util/Localize";

import BaseScreen from "../_base/BaseScreen";
import Loader from "../../component/loader/Loader";
import BaseText from "../../component/_base/BaseText";
import Common from "../../util/Common";
import {getGradeType, GRADE} from "../../util/type/User";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import {getGoodsList} from "../../data/redux/action/Goods";
import GoodsList from "../../component/list/goods/GoodsList";
import {get} from "../../data/_base/BaseAxios";
import API from "../../data/_base/API";
import Result from "../../data/redux/_base/Result";
import {GOODS_LIST} from "../../data/redux/_base/ActionType";
import Chips from "../../component/chip/Chips";
////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabGoods extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowLoader: false,
            isShowConfirm: false,
            errorMessage : "",
            callback: null,

            // category
            // Category
            categoryList: [],
            categoryId: -1,
        }

        this.refGoodsList = null;
    }

    componentDidMount() {
        super.componentDidMount();
        this.addBackHandler();
        this.init();
    }

    componentWillUnmount() {
        this.removeBackHandler();
        super.componentWillUnmount();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['isShowConfirm'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['profile'])) this.setProfile(nextProps.profile);
        if (Common.shouldUpdate(this.state, nextState, ['categoryId', 'categoryList', 'isLoading', 'isShowLoader', 'errorMessage', 'callback'])) return true;

        if (Common.shouldUpdate(this.props, nextProps, ['status'])) {this.setStatusRefresh(nextProps.status);  return true;}
        if (Common.shouldUpdate(this.props, nextProps, ['page', 'isRefresh', 'list'])) return true;

        return false;
    }

    onFocus = _ => {
        this.changeFocus();

    }

    ////////////////////
    // FUNCTION


    init = _ => {
        this.setShowLoader(true);
        //this.getCategory();
        this.loadRefreshtList();
    }

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message,
                callback: callback
            });
        }
    }

    getCategory = () => {
        let category = 1; let lastId = ''; let page = 1;
        get(API.GOODS.GOODS_CATEGORY, {lastId, page}, (success, code, message, data) => {
            console.warn('ca data : ', data)
            if (success) {
                this.setCategoryList(data);
            }
            this.setShowLoader(false);
        });
    }

    // Category
    createCategoryItem = (id, name) => {
        return {
            id: id,
            name: name
        }
    }

    setCategoryList = list => {
        let l = [this.createCategoryItem(-1, 'All')];
        this.setState({categoryList: l.concat(list)});
    }

    getCategoryTitleList = list => {
        let l = [];
        list.map(v => l.push(v.name));
        return l;
    }

    setCategoryId = id => {
        if (this.state.categoryId !== id) {
            this.setState({categoryId: id}, _ => this.loadRefreshtList());
        }
    }

    checkGradeUnderAssociate = _ => {
        const {group} = this.props.profile;
        if (Common.isEmpty(group)) return false;
        switch (getGradeType(group.id)) {
            case GRADE.NORMAL:
            case GRADE.ASSOCIATE:
                return false;
            default:
                return true;
        }
    }

    setLoading = isLoad => {
        if (this.state.isLoading !== isLoad) {
            this.setState({isLoading: isLoad});
        }
    }

    setShowLoader = isShow => {
        if (this.state.isShowLoader !== isShow) {
            this.setState({isShowLoader: isShow});
        }
    }

    setStatusRefresh = status => {
        console.warn("setStatusRefresh : ", status)
        this.setShowLoader(false);
        this.setLoading(false);
        if (!Common.isEmpty(this.refGoodsList)) this.refGoodsList.setStatusFooter(status);
    }

    setLanguage = lang => this.setState({language: lang}, this.init);

    setProfile = profile => this.setState({profile: profile}, this.init);

    changeFocus = _ => {
        const {onTabFocus} = this.props.route.params;

    }

    loadRefreshtList = _ => {
        this.setLoading(true);
        this.props.getGoodsList(this.state.categoryId)
    }

    loadMoreList = _ => {
        this.setLoading(true);
        this.props.getGoodsList(this.state.categoryId,this.props.page + 1, false)
    }

    // Event
    onSelectCategory = index => {
        const {categoryList} = this.state;
        this.setCategoryId(categoryList[index].id);
    }

    onSelectItem = (item) => {
        if(!Common.CheckPressBlock()) return;

        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.GOODS_DETAIL, {
            type: Screen.STACK_NOTICE.TAB_GOODS,
            item: item
        });

        // getVRProductDetail(item.id, (success, code, message, data) => {
        //     if (success) {
        //         // permission check - code 가 없네요
        //         if(!data.permission) {
        //             this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.VR_SERIAL_CERTIFICATION, {item:data});
        //         }else{
        //             this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.VR_PRODUCT_DETAIL, {
        //                 type: Screen.STACK_NOTICE.TAB_VR,
        //                 item: item
        //             });
        //         }
        //     } else {
        //         Common.debug(data)
        //     }
        // })
    }

    ////////////////////
    // RENDER
    render() {
        const {
            isLoading, isShowLoader,
            isShowConfirm, errorMessage, callback,
            categoryList
        } = this.state;
        const {list} = this.props;
        console.warn(list)
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Chip */}
                {/*<View style={s.layout_chip}>*/}
                {/*    <Chips isVertical={false}*/}
                {/*           list={this.getCategoryTitleList(categoryList)}*/}
                {/*           onSelect={this.onSelectCategory}/>*/}
                {/*</View>*/}
                {/*list*/}
                <GoodsList
                    ref={ref => this.refGoodsList = ref}
                    isLoading={isLoading}
                    list={list}
                    onLoadRefresh={this.loadRefreshtList}
                    onLoadMore={this.loadMoreList}
                    onSelectItem={this.onSelectItem}/>
                {/* Modal */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={ _ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>
        )
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////
const mapStateToProps = (state) => {
    return {
        language: state.common.get('language'),
        profile: state.user.get('profile'),
        status: state.goods.get('status'),
        list: state.goods.get('list'),
        page: state.goods.get('page'),
        isRefresh: state.goods.get('isRefresh'),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getGoodsList: (categoryId, page=1, isRefresh=true) => {
            return dispatch(getGoodsList(categoryId, "",page, isRefresh));
        },
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(TabGoods);
