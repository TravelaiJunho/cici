////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import s from "../_style/TabMedia.style";
import {MEDIA_REQUEST} from "../../util/type/Media";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import Loader from "../../component/loader/Loader";
import Chips from "../../component/chip/Chips";
import MediaList from "../../component/list/media/MediaList";
import EmptyView from "../../component/list/EmptyView";
// API
import {getList} from "../../data/redux/action/TabMediaForNotice";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabMedia extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowLoader: false,
            // Language
            language: props.language,
            // Category
            categoryList: ['All', 'Photo', 'Video'],
            categoryCode: null,
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
        this.init();
    }

    onFocus = _ => {
        const {onTabFocus} = this.props.route.params;
        onTabFocus && onTabFocus(Screen.STACK_NOTICE.TAB_MEDIA);
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

    setCategoryCode = code => {
        if (this.state.categoryCode !== code) {
            this.setState({categoryCode: code}, this.loadRefreshList);
        }
    }

    // List
    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const ll = list[list.length - 1].data;
        if (!Common.checkListSize(ll)) return '';
        const last = ll[ll.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    loadRefreshList = _ => {
        this.setLoading(true);
        const {categoryCode} = this.state;
        this.props.refreshList(categoryCode);
    }

    loadMoreList = _ => {
        this.setLoading(true);
        const {categoryCode} = this.state;
        //this.props.loadMoreList(categoryCode, this.getLastId(this.props.list));
        this.props.loadMoreList(categoryCode, this.props.page + 1);
    }

    setStatusRefresh = status => {
        this.setShowLoader(false);
        this.setLoading(false);
        this.list.setStatusFooter(status);
    };

    // Event
    onSelectCategory = index => {
        switch (index) {
            case 0: // All
                this.setCategoryCode(null);
                break;

            case 1: // Photo
                this.setCategoryCode(MEDIA_REQUEST.IMAGE);
                break;

            case 2: // Video
                this.setCategoryCode(MEDIA_REQUEST.VIDEO);
                break;
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {isLoading, isShowLoader, categoryList} = this.state;
        const {list} = this.props;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                {/*<Loader isLoading={isShowLoader}/>*/}
                {/* Chip */}
                <View style={s.layout_chip}>
                    <Chips isVertical={false}
                           list={categoryList}
                           onSelect={this.onSelectCategory}/>
                </View>
                <View style={{flex: 1}}>
                    {/* List */}
                    <MediaList ref={ref => this.list = ref}
                               list={list}
                               onLoadRefresh={this.loadRefreshList}
                               onLoadMore={this.loadMoreList}/>
                    {/* Empty */}
                    {!isLoading && !Common.checkListSize(list) && <EmptyView/>}
                </View>
            </View>);
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
        status: state.tab_media_for_notice.get('status'),
        list: state.tab_media_for_notice.get('list'),
        page: state.tab_media_for_notice.get('page'),
        isRefresh: state.tab_media_for_notice.get('isRefresh'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshList: (type = null) => {
            return dispatch(getList(type, '', 1, true));
        },
        loadMoreList: (type = null, page) => {
            return dispatch(getList(type, "", page));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabMedia);
