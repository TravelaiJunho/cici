import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import common from "../../util/Common";
import Common from "../../util/Common";
import { SUB_ACCOUNT, SUB_ICON_DOTS, SUB_ICON_SINGLE_R } from "../../../assets";
import CircleBorderImage from "../../component/image/CircleBorderImage";
import Community from "../../screen/community/Community";

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
        {errorImage ? (
          <View style={{ flexDirection: "row" }}>
            <View style={styles.ovalCopy6}>
              <Image source={item.user.url} style={{ width: 10, height: 10 }} />
              {/*<CircleBorderImage*/}
              {/*  userGrade={item.user.garde}*/}
              {/*  source={item.user.url}*/}
              {/*/>*/}
            </View>
            <View
              style={{
                flexDirection: "column",
                marginTop: 3.6,
                marginLeft: 10,
              }}
            >
              <Text>{item.media[0].name}</Text>
              <Text style={styles.date}>10분 전</Text>
            </View>
          </View>
        ) : (
          <View style={styles.ovalCopy6}>
            <Image
              style={{ width: 18, height: 18, marginLeft: 10, marginTop: 5 }}
              source={SUB_ACCOUNT}
            />
          </View>
        )}
        {/*<View*/}
        {/*  style={{ flexDirection: "column", marginLeft: 10, marginTop: 3.6 }}*/}
        {/*>*/}
        {/*  <Text>{item.media[0].name}</Text>*/}
        {/*  <Text style={styles.date}>10분 전</Text>*/}
        {/*</View>*/}
        <Image source={SUB_ICON_DOTS} />
      </View>
      <View style={styles.rectangle}>
        <Image source={SUB_ACCOUNT} />
      </View>
      <View style={styles.rectangleCloser}>
        <Text
          style={{
            fontSize: 14,
            color: "rgb(255, 255, 255)",
            marginLeft: 20,
            marginTop: 7,
          }}
        >
          자세히 보기
        </Text>
        <TouchableOpacity>
          <Image
            source={SUB_ICON_SINGLE_R}
            style={{ marginRight: 16, marginTop: 8 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.invalidNameTitle}>
        뉴스 제목이예요, 공지사항, 이벤트 게시물이 피드형식으로 표시됩니다.
      </Text>
      <View style={styles.wireFeedTxt}>
        <View style={styles.invalidName}>
          <Text numberOfLines={2} ellipsizeMode="tail">
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ovalCopy5: {
    marginTop: 16,
    marginLeft: 14,
    width: 43,
    height: 43,
    borderStyle: "solid",
    borderWidth: 1.6,
    borderRadius: 50,
    borderColor: "rgb(13, 219, 209)",
  },
  ovalCopy6: {
    marginLeft: 14,
    width: 43,
    height: 43,
    borderStyle: "solid",
    borderWidth: 1.6,
    backgroundColor: "grey",
    borderRadius: 50,
    borderColor: "rgb(13, 219, 209)",
  },
  rectangle: {
    height: 375,
    backgroundColor: "rgb(221, 221, 221)",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleCloser: {
    height: 35,
    backgroundColor: "rgb(34, 34, 34)",
    flexDirection: "row",
    justifyContent: "space-between",
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
  date: {
    width: 40,
    height: 13,
    fontFamily: "NanumSquareOTFR",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(85, 85, 85)",
  },
  iconMoreDotsVOn: {
    width: 20,
    height: 20,
  },
});

export default Notice;
