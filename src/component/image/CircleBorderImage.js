////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
////////////////////
// Local
import s from "./_style/CircleBorderImage.style";
import { colors } from "../../util/Color";
import Layout from "../../util/Layout";
import Icon from "../../util/Icon";
import { getGradeType, GRADE } from "../../util/type/User";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseImage from "../_base/BaseImage";
// Asset
import {
  IMAGE_MEMBER_ARTIST,
  IMAGE_MEMBER_DANITY,
  IMAGE_MEMBER_MANAGER,
  IMAGE_MEMBER_SUPPORTERS,
  SUB_ACCOUNT,
  USER,
} from "../../../assets";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class CircleBorderImage extends BaseComponent {
  ////////////////////
  // FUNCTION
  getCircleStyle = (size, borderWidth = 0) => {
    return {
      position: "absolute",
      top: borderWidth,
      left: borderWidth,
      right: borderWidth,
      bottom: borderWidth,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: size / 2,
    };
  };

  ////////////////////
  // RENDER
  renderImage = (image, borderWidth = 0) => {
    const { source } = this.props;
    let image_size = image;
    if (Common.isEmpty(source)) {
      return (
        <View
          style={[
            this.getCircleStyle(image_size, borderWidth),
            { backgroundColor: colors.grayLight },
          ]}
        >
          <Image source={SUB_ACCOUNT} style={{ height: 18, width: 18 }} />
        </View>
      );
    } else {
      return (
        <View
          style={[
            this.getCircleStyle(image_size, borderWidth),
            { backgroundColor: colors.grayLight },
          ]}
        >
          <Image source={{ uri: USER }} style={{ height: 18, width: 18 }} />
        </View>
      );
    }

    return (
      <BaseImage
        style={[
          this.getCircleStyle(image_size, borderWidth),
          { backgroundColor: colors.grayLight },
        ]}
        source={{ uri: source + "" }}
      />
    );
  };

  renderBorderGradient = (total, back, image, borderWidth) => {
    let setColor = [colors.grayLight, colors.grayLight, colors.grayLight];
    switch (getGradeType(this.props.userGrade)) {
      case GRADE.REGULAR:
        setColor = [colors.yellow, colors.yellow, colors.yellow];
        break;
      case GRADE.HONORS:
        setColor = [colors.mango, colors.orange, colors.pinkyPurple];
        break;
      case GRADE.ARTIST:
        setColor = [colors.purple, colors.purple, colors.purple];
        break;
      case GRADE.OPERATOR:
        setColor = [colors.mint, colors.mint, colors.mint];
        break;
      case GRADE.SUPPORTERS:
        setColor = [colors.skyblue, colors.skyblue, colors.skyblue];
        break;
    }
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient style={this.getCircleStyle(total)} colors={setColor} />
        <View
          style={[
            this.getCircleStyle(back, borderWidth),
            { backgroundColor: colors.background },
          ]}
        />
        {this.renderImage(image, borderWidth * 2)}
      </View>
    );
    // return (
    //     <LinearGradient style={this.getCircleStyle(total)}
    //                     colors={setColor}>
    //         <View style={[this.getCircleStyle(back), {backgroundColor: colors.background}]}>
    //             {this.renderImage(image)}
    //         </View>
    //     </LinearGradient>)
  };

  renderBorderNormal = (total, back, image, borderWidth) => (
    <View style={{ flex: 1 }}>
      <View
        style={[this.getCircleStyle(total), { backgroundColor: colors.orange }]}
      />
      <View
        style={[
          this.getCircleStyle(back, borderWidth),
          { backgroundColor: colors.background },
        ]}
      />
      {this.renderImage(image, borderWidth * 2)}
    </View>
  );
  // <View style={[this.getCircleStyle(total), {backgroundColor: colors.orange}]}>
  //     <View style={[this.getCircleStyle(back), {backgroundColor: colors.background}]}>
  //         {this.renderImage(image)}
  //     </View>
  // </View>

  renderNormal = (image) => (
    <View style={{ flex: 1 }}>{this.renderImage(image)}</View>
  );

  renderGrade = (_) => {
    const { gradeSize, userGrade, gradeRight } = this.props;
    let image = null;
    switch (getGradeType(userGrade)) {
      case GRADE.HONORS:
        image = IMAGE_MEMBER_DANITY;
        break;
      case GRADE.ARTIST:
        image = IMAGE_MEMBER_ARTIST;
        break;
      case GRADE.OPERATOR:
        image = IMAGE_MEMBER_MANAGER;
        break;
      case GRADE.SUPPORTERS:
        image = IMAGE_MEMBER_SUPPORTERS;
        break;
    }
    return (
      !Common.isEmpty(image) && (
        <View style={[s.layout_grade, { right: gradeRight }]}>
          <BaseImage
            style={[
              s.grade_icon,
              {
                width: Layout.UISize(gradeSize),
                height: Layout.UISize(gradeSize),
              },
            ]}
            source={image}
          />
        </View>
      )
    );
  };

  render() {
    const { size, borderWidth, isUseBorder, isUseGradient, isUseGrade } =
      this.props;
    if (isUseBorder) {
      const back = size + borderWidth;
      const total = back + borderWidth;
      const totalSize = Layout.UISize(total);
      return (
        <View style={{ width: totalSize, height: totalSize }}>
          {isUseGradient
            ? this.renderBorderGradient(
                totalSize,
                Layout.UISize(back),
                Layout.UISize(size),
                Layout.UISize(borderWidth)
              )
            : this.renderBorderNormal(
                totalSize,
                Layout.UISize(back),
                Layout.UISize(size),
                Layout.UISize(borderWidth)
              )}
          {isUseGrade && this.renderGrade()}
        </View>
      );
    } else {
      return (
        <View style={{ width: size, height: size }}>
          {this.renderNormal(size)}
          {isUseGrade && this.renderGrade()}
        </View>
      );
    }
  }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

CircleBorderImage.defaultProps = {
  size: 140,
  gradeSize: 20,
  gradeRight: 0,
  borderWidth: 6,
  isUseBorder: true,
  isUseGradient: true,
  isUseGrade: true,
  userGrade: 1, // 4운영자, 3우등회원, 2정회원, 1준회원
  source: null,
  emptyImage: null,
};

CircleBorderImage.propTypes = {
  size: PropTypes.number,
  gradeSize: PropTypes.number,
  gradeRight: PropTypes.number,
  borderWidth: PropTypes.number,
  isUseBorder: PropTypes.bool,
  isUseGradient: PropTypes.bool,
  isUseGrade: PropTypes.bool,
  userGrade: PropTypes.number,
  source: PropTypes.string,
  emptyImage: PropTypes.string,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default CircleBorderImage;
