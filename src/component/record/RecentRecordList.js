////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from './_style/RecentRecordList.style';
import Common from '../../util/Common';
import Storage from '../../util/Storage';
import localize from "../../util/Localize";
// Component
import BaseComponent from '../_base/BaseComponent';
import BaseText from "../_base/BaseText";
import {OptimizedFlatList} from "../_common/optimized";
import RecentRecordItem from './RecentRecordItem';
import ConfirmCancelAlert from "../alert/_base/ConfirmCancelAlert";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class RecentRecordList extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isShowEmpty: true,
            recordList: [],
            //
            isShowConfirmCancel: false,
            confirmCallback: null,
        };
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.init();
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        const {addItem} = this.props;
        if (Common.isEmpty(addItem)) {
            this.refreshList();
        } else {
            this.setStorageValue(addItem);
        }
    };

    setVisible = isShow => {
        if (this.state.isVisible !== isShow) {
            this.setState({isVisible: isShow});
        }
    };

    setShowEmpty = isShow => {
        if (this.state.isShowEmpty !== isShow) {
            this.setState({isShowEmpty: isShow});
        }
    };

    setShowConfirmCancel = (isShow, confirmCallback = null) => {
        if (this.state.isShowConfirmCancel !== isShow) {
            this.setState({
                isShowConfirmCancel: isShow,
                confirmCallback: confirmCallback
            });
        }
    };

    setRecordList = list => {
        this.setState({
            recordList: list,
        }, _ => {
            this.setShowEmpty(!Common.checkListSize(list));
            this.setVisible(true);
        });
    };

    setStorageValue = value => {
        Storage.setSearchRecordByValue(value).then(r => {
            if (r) this.refreshList();
        });
    };

    setStorageList = list => {
        Storage.setSearchRecordByList(list).then(r => {
            if (r) this.refreshList();
        });
    };

    refreshList = _ => {
        Storage.getSearchRecord().then(r => this.setRecordList(r));
    };

    // Recent Record Event
    onSelectRecentRecordItem = index => this.props.onSelectItem && this.props.onSelectItem(this.state.recordList[index]);

    onRemoveRecentRecordItem = index => {
        const list = [...this.state.recordList];
        list.splice(index, 1);
        this.setStorageList(list);
    };

    onClearRecentRecordItem = _ => this.setShowConfirmCancel(true, _ => this.setStorageList([]));

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => (<RecentRecordItem key={index}
                                                       word={item}
                                                       index={index}
                                                       onTouch={this.onSelectRecentRecordItem}
                                                       onRemove={this.onRemoveRecentRecordItem}/>);

    renderList = _ => (<OptimizedFlatList style={s.list}
                                          keyExtractor={(item, index) => index.toString()}
                                          data={this.state.recordList}
                                          renderItem={this.renderItem}/>);

    renderEmpty = _ => (
        <View style={s.empty}>
            {/*<Icon.Search size={72}*/}
            {/*             color={colors.gray}/>*/}
            {/*<BaseText style={s.empty_title}>{util.Localize.recent_record_empty}</Text>*/}
        </View>);

    render() {
        const {isVisible, isShowEmpty, isShowConfirmCancel, confirmCallback} = this.state;
        return (
            <View style={s.container}>
                {isVisible &&
                <View style={s.title_layout}>
                    <BaseText style={FontStyle.CntTitleWhiteLH}>{localize.keyword.recent_search}</BaseText>
                    {!isShowEmpty &&
                    <TouchableOpacity onPress={this.onClearRecentRecordItem}>
                        <BaseText style={FontStyle.BtnMintRN}>{localize.keyword.all_clear}</BaseText>
                    </TouchableOpacity>}
                </View>}
                {isVisible && (isShowEmpty ? this.renderEmpty() : this.renderList())}

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                    onConfirm={_ => {
                                        confirmCallback && confirmCallback();
                                        this.setShowConfirmCancel(false);
                                    }}
                                    onCancel={_ => this.setShowConfirmCancel(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{localize.keyword.text.all_clear}</BaseText>
                </ConfirmCancelAlert>
            </View>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

RecentRecordList.defaultProps = {
    onSelectItem: value => {
    },
    addItem: '',
}

RecentRecordList.propTypes = {
    onSelectItem: PropTypes.func,
    addItem: PropTypes.string,
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default RecentRecordList;
