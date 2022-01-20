////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
////////////////////
// Local
import {TEMPLATE_TYPE} from '../../_type/MediaTemplateType';
// Component
import BaseComponent from '../../../_base/BaseComponent';
import Template_1 from './Template_1';
import Template_2 from './Template_2';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaTemplate extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
    }

    ////////////////////
    // FUNCTION

    // Event
    onSelectItem = item => this.props.onSelectItem && this.props.onSelectItem(item);

    ////////////////////
    // RENDER
    renderByType = (type, list) => {
        switch (type) {
            case TEMPLATE_TYPE.TYPE_1:
                return <Template_1 onSelectItem={this.onSelectItem}
                                   list={list}/>;
            default: // TEMPLATE_TYPE.TYPE_2
                return <Template_2 onSelectItem={this.onSelectItem}
                                   list={list}/>;
        }
    };

    render() {
        const {type, list} = this.props;
        return this.renderByType(type, list);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

MediaTemplate.defaultProps = {
    onSelectItem: item => {
    },
    type: TEMPLATE_TYPE.TYPE_2,
    list: [],
};

MediaTemplate.propTypes = {
    onSelectItem: PropTypes.func,
    type: PropTypes.string,
    list: PropTypes.array,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default React.memo(MediaTemplate);