////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
// Local
import {TEMPLATE_TYPE} from '../../_type/HomeTemplateType';
import Common from '../../../../util/Common';
// Component
import BaseComponent from "../../../_base/BaseComponent";
import Template_1 from './Template_1';
import Template_R from './Template_R';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class HomeTemplate extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION
    getItemByAgentFile = list => {
        return _.find(list, v => {
            return v.media_type !== 'text' && v.media_type !== 'audio';
        });
    };

    getListByRemoveItem = (list, id) => {
        return _.filter(list, v => {
            return v.id !== id;
        });
    };

    parseList = list => {
        const f = this.getItemByAgentFile(list);
        if (Common.isEmpty(f)) {
            return {
                type: 'img',
                video: null,
                list: list,
            };
        } else {
            const l = this.getListByRemoveItem(list, f.id);
            l.unshift(f);
            return {
                type: 'img',
                video: null,
                list: l,
            };
        }
    };

    // Event
    onSelectItem = item => this.props.onSelectItem && this.props.onSelectItem(item);

    ////////////////////
    // RENDER
    renderByType = (type, list) => {
        const l = this.parseList(list);
        switch (type) {
            case TEMPLATE_TYPE.TYPE_1:
                return <Template_1 onSelectItem={this.onSelectItem}
                                   type={l.type}
                                   video={l.video}
                                   list={l.list}/>;
        }
    };

    render() {
        const {type, list} = this.props;
        if (type === TEMPLATE_TYPE.TYPE_R) {
            return <Template_R onSelectItem={this.onSelectItem}
                               list={list}/>;
        }
        return this.renderByType(type, list);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

HomeTemplate.defaultProps = {
    onSelectItem: item => {
    },
    type: TEMPLATE_TYPE.TYPE_R,
    list: [],
};

HomeTemplate.propTypes = {
    onSelectItem: PropTypes.func,
    type: PropTypes.string,
    list: PropTypes.array,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default React.memo(HomeTemplate);
