////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import localize from "../../util/Localize";
import {showDetail, showDetail_MyPost} from "../../util/Detail";
import Common from "../../util/Common";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import Loader from "../../component/loader/Loader";
import BackHeader from "../../component/header/BackHeader";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import BaseText from "../../component/_base/BaseText";
import PostList from "../../component/list/post/PostList";
import EmptyView from "../../component/list/EmptyView";
// API
import {getList} from "../../data/redux/action/MyPost";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MyPost extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowLoader: false,
            // Language
            language: props.language,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['status'])) this.setStatusRefresh(nextProps.status);
        if (Common.shouldUpdate(this.props, nextProps, ['page', 'isRefresh', 'list'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['isLoading', 'isShowLoader'])) return true;
        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
        this.init();
    }

    onFocus = () => {
        this.loadRefreshList();
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        this.setShowLoader(true);
        this.loadRefreshList();
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

    setLanguage = lang => this.setState({language: lang}, this.init);

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

    // List
    loadRefreshList = _ => {
        this.setLoading(true);
        this.props.refreshList();
    }

    loadMoreList = _ => {
        this.setLoading(true);
        this.props.loadMoreList(this.props.page + 1)
    }

    setStatusRefresh = status => {
        this.setShowLoader(false);
        this.setLoading(false);
        this.list.setStatusFooter(status);
    };

    // Event
    onSelectItem = item => {
        if (Common.isEmpty(item)) return;
        // Detail
        this.setShowLoader(true);
        showDetail_MyPost(this.props.navigation, item.board_type, item, _ => {
            this.setShowLoader(false);
        });
    }

    ////////////////////
    // RENDER
    render() {
        const {
            isLoading, isShowLoader,
            isShowConfirm, errorMessage, callback,
        } = this.state;
        const {list} = this.props;

        console.warn(list);
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isShowLoader}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.my_writing}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <View style={{flex: 1}}>
                    {/* List */}
                    <PostList ref={ref => this.list = ref}
                              list={list}
                              onLoadRefresh={this.loadRefreshList}
                              onLoadMore={this.loadMoreList}
                              onSelectItem={this.onSelectItem}/>
                    {/* Empty */}
                    {!isLoading && !Common.checkListSize(list) && <EmptyView/>}
                </View>

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
            </View>
        );
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        // Common
        language: state.common.get('language'),
        // Tab Media
        status: state.my_post.get('status'),
        list: state.my_post.get('list'),
        page: state.my_post.get('page'),
        isRefresh: state.my_post.get('isRefresh'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshList: _ => {
            return dispatch(getList(1, true));
        },
        loadMoreList: page => {
            return dispatch(getList(page, false));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(MyPost);
