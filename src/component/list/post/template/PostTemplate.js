////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
////////////////////
// Local
import BaseComponent from '../../../_base/BaseComponent';
import Template_1 from './Template_1';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostTemplate extends BaseComponent {

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
    render() {
        return <Template_1 onSelectItem={this.onSelectItem}
                           list={this.props.list}/>;
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

PostTemplate.defaultProps = {
    onSelectItem: item => {
    },
    list: [],
};

PostTemplate.propTypes = {
    onSelectItem: PropTypes.func,
    list: PropTypes.array,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default React.memo(PostTemplate);