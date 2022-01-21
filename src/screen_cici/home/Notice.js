import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import common from "../../util/Common";
import Common from "../../util/Common";
import BaseImage from "../../component/_base/BaseImage";

function Notice({ item }) {
  const [errorImage, setErrorImage] = useState(
    common.isEmpty(item.user.imageUrl)
  );

  useEffect(() => {
    setErrorImage(Common.isEmpty(item.user.imageUrl));
  });
  return (
    <View style={styles.wireFeedNews}>
      <View style={styles.wireFeedNickAdmin}>
        <View style={styles.ovalCopy6}>
          <Text>sdfkljksl</Text>
        </View>
      </View>
      <Image style={styles.rectangle} />
      <Image style={styles.rectangleCloser} />
      <Text style={styles.invalidNameTitle}>
        뉴스 제목이예요, 공지사항, 이벤트 게시물이 피드형식으로 표시됩니다.
      </Text>
      <View style={styles.wireFeedTxt}>
        <View style={styles.invalidName}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            찰떡 쿠션 정말 찰떡같아요~~ 아침에 화장하고 나가서 점심때 봐도, 퇴근
            전에
            ㅏㅣㅇㄴ머ㅏㅣㄹㅁㄴ얼ㅇㄴ미ㅁㅓ아ㅣㄴ머ㅏㅣㄹㄴㅁ어ㅣㄹㅇㄴ머ㅣㅏ렁ㄴ미ㅏㄹㄴㅇㅁㄴㄹ이ㅏㅜㄴ모ㅓ라ㅣㄴ머ㅏㅣㄹ너ㅏㅣㄴ어ㅢㅐ
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wireFeedNews: {
    width: "100%",
    height: 662,
  },
  wireFeedNickAdmin: {
    width: 375,
    height: 68,
  },
  ovalCopy6: {
    width: 43,
    height: 43,
    borderStyle: "solid",
    borderWidth: 1.6,
    borderColor: "rgb(13, 219, 209)",
  },
  rectangle: {
    height: 375,
    backgroundColor: "rgb(221, 221, 221)",
  },
  rectangleCloser: {
    height: 35,
    backgroundColor: "rgb(34, 34, 34)",
  },
  invalidNameTitle: {
    height: 50,
    fontFamily: "NanumSquareOTFEB",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: "rgb(34, 34, 34)",
    margin: 20,
  },
  wireFeedTxt: {
    height: 93,
  },
  invalidName: {
    height: 36,
    // fontFamily: "NanumSquareOTFR",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    color: "rgb(34, 34, 34)",
    marginLeft: 20,
    marginRight: 74,
  },
});

export default Notice;
