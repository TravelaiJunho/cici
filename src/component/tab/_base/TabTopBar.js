////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import PropTypes from "prop-types";
////////////////////
// Local
import BaseComponent from "../../_base/BaseComponent";
import BaseText from "../../_base/BaseText";
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from '../../../util/style/Font.style';
import s from '../_style/TabTopBar.style';
import {colors} from '../../../util/Color';
import Common from '../../../util/Common';
import Layout from "../../../util/Layout";
import {MemberShipTabNavigator} from "../../../navigation/Navigator";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabTopBar extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.scrollIndex = []
    }

    ////////////////////
    // FUNCTION
    getLabel = (route, options) => {
        if (Common.isEmpty(options.tabBarLabel)) {
            if (Common.isEmpty(options.title)) {
                // return route.name
                return getFocusedRouteNameFromRoute(route)
            } else {
                return options.title
            }
        } else {
            return options.tabBarLabel
        }
    }

    // Scroll
    setScrollIndex = (x, index) => {
        this.scrollIndex[index] = {x:x};
    }

    scrollTo = index => {
        if( !Common.isEmpty(this.scroll)) {
            this.scroll.scrollTo( this.scrollIndex[index] )
        }
    }

    // Badge
    getBadgeState = name => {
        return this.props.getBadgeState && this.props.getBadgeState(name);
    }

    // Event
    onPress = (route, navigation, isFocused) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    }

    onLongPress = (route, navigation) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    }

    ////////////////////
    // RENDER
    renderTab = (index, route, navigation, options, isFocused, isFix = true, padding = 0) => {
        if (!isFix && isFocused) this.scrollTo(index);
        return (
            <TouchableOpacity key={route.key}
                              style={isFix ? s.tab_area : {}}
                              onLayout={(e) => this.setScrollIndex(e.nativeEvent.layout.x, index)}
                              onPress={_ => this.onPress(route, navigation, isFocused)}
                              onLongPress={_ => this.onLongPress(route, navigation)}
                              testID={options.tabBarTestID}
                              accessibilityRole={"button"}
                              accessibilityState={isFocused ? {selected: true} : {}}
                              accessibilityLabel={options.tabBarAccessibilityLabel}
            >
                <View style={s.tab_layout}>
                    <View style={{flexDirection: "row"}}>
                        {/* Left */}
                        <View style={isFix ? s.tab_area : {width: Layout.UISize(padding)}}/>
                        {/* Title */}
                        <BaseText style={isFocused ? FontStyle.CatOrangeCH : FontStyle.CatGrayDkCH}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={1}>{this.getLabel(route, options)}</BaseText>
                        {/* Right */}
                        <View style={isFix ? s.tab_area : {width: Layout.UISize(padding)}}>
                            {/* Badge */}
                            {this.getBadgeState(route.name) &&
                            <View style={BaseStyle.badge_dot}/>}
                        </View>
                    </View>
                </View>
                {/* Indicator */}
                <View style={{
                    height: Layout.UISize(3),
                    backgroundColor: isFocused ? colors.orange : colors.gray
                }}/>
            </TouchableOpacity>)
    }

    renderScrollTabs = (state, descriptors, navigation, height, padding, header) =>
        <View style={{marginTop: header, height: Layout.UISize(height)}}>
            <ScrollView ref={ref => this.scroll = ref}
                        horizontal={true}
                        pagingEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        style={{width: Layout.DEVICE_WIDTH}}
            >
                {state.routes.map((route, index) =>
                    this.renderTab(
                        index,
                        route,
                        navigation,
                        descriptors[route.key].options,
                        state.index === index,
                        false,
                        padding))}
            </ScrollView>
        </View>

    renderFixTabs = (state, descriptors, navigation, height, header) =>
        <View style={[s.tab_fix_container, {marginTop: header, height: Layout.UISize(height)}]}>
            {state.routes.map((route, index) =>
                this.renderTab(
                    index,
                    route,
                    navigation,
                    descriptors[route.key].options,
                    state.index === index))}
        </View>

    render() {
        const {
            state, descriptors, navigation,
            isFix, height, padding, useHeader
        } = this.props;
        let header = useHeader ? Layout.getStatusBarHeight(false,true) : 0;
        header = 0;
        return isFix
            ? this.renderFixTabs(state, descriptors, navigation, height, header)
            : this.renderScrollTabs(state, descriptors, navigation, height, padding, header);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

TabTopBar.defaultProps = {
    isFix: false,
    height: 40,
    padding: 20,
    useHeader: false,
    ////
    getBadgeState: name => {
        return false;
    },
};

TabTopBar.propTypes = {
    isFix: PropTypes.bool,
    height: PropTypes.number,
    padding: PropTypes.number,
    ////
    getBadgeState: PropTypes.func,
    useHeader: PropTypes.bool,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default TabTopBar;
