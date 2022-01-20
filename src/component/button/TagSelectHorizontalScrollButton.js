////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import Layout from "../../util/Layout";
import BaseComponent from "../_base/BaseComponent";
import BaseTagButton from "./_base/BaseTagButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TagSelectHorizontalScrollButton extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: props.selectIndex,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.selectIndex !== this.state.selectIndex) {
            return true;
        }
        if (nextProps.titles !== this.props.titles) {
            return true;
        }
        return false;
    }

    ////////////////////
    // FUNCTION
    setSelectIndex = index => {
        if (this.state.selectIndex !== index) {
            this.setState({
                selectIndex: index
            }, _ => {
                this.props.onSelectIndex && this.props.onSelectIndex(index);
            });
        }
    }

    getSelectIndex = _ => {
        return this.state.selectIndex;
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => {
        const {selectIndex} = this.state;
        const {buttonHeight, tagMargin} = this.props;
        return <BaseTagButton key={index}
                              onPress={_ => this.setSelectIndex(index)}
                              height={buttonHeight}
                              customStyle={{marginLeft: Layout.UISize(tagMargin)}}
                              customButtonStyle={{
                                  paddingLeft: Layout.UISize(20),
                                  paddingRight: Layout.UISize(20),
                              }}
                              isSelect={index === selectIndex}
                              title={item}/>;
    }

    render() {
        const {titles, margin} = this.props;
        return <FlatList data={titles}
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                         contentContainerStyle={{flexGrow: 1}}
                         keyExtractor={(item, index) => index.toString()}
                         renderItem={this.renderItem}
                         ListFooterComponent={() => {
                             return <View style={{marginLeft: Layout.UISize(margin)}}/>
                         }}/>;
    }

}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

TagSelectHorizontalScrollButton.defaultProps = {
    buttonHeight: 30,
    margin: 20,
    tagMargin: 15,
    ////
    titles: [],
    selectIndex: -1,
    onSelectIndex: index => {
    }
};

TagSelectHorizontalScrollButton.propTypes =
    {
        buttonHeight: PropTypes.number,
        margin: PropTypes.number, ////
        titles: PropTypes.arrayOf(PropTypes.string),
        selectIndex: PropTypes.number,
        onSelectIndex: PropTypes.func,
    };

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default TagSelectHorizontalScrollButton;
