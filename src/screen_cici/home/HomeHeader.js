import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import BaseHeader from "../../component/header/_base/BaseHeader";
import { SUB_LOGO, SUB_ACCOUNT } from "../../../assets";
import BaseImage from "../../component/_base/BaseImage";
import Common from "../../util/Common";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "./MyPage";
function HomeHeader({
  accountImage,
  onAcountPress,
  onLogoPress,
  alram = true,
  navigation,
}) {
  // state
  const [errorImage, setErrorImage] = useState(Common.isEmpty(accountImage));
  const Stack = createStackNavigator();

  useEffect(() => {
    setErrorImage(Common.isEmpty(accountImage));
  }, [accountImage]);

  return (
    <BaseHeader skipAndroidStatusBar={true} useBorder={true}>
      <View style={[styles.container]}>
        <Pressable onPress={onLogoPress}>
          <Image source={SUB_LOGO} />
        </Pressable>
        {/*<Pressable onPress={onAcountPress}>*/}

        <TouchableOpacity onPress={() => navigation.navigate("MyPage")}>
          {errorImage ? (
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 50,
                backgroundColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BaseImage
                source={SUB_ACCOUNT}
                style={{
                  width: 11,
                  height: 11,
                }}
              />
            </View>
          ) : (
            <Image
              style={{
                width: 28,
                height: 28,
                borderRadius: 50,
                backgroundColor: "gray",
              }}
              source={{ uri: accountImage }}
              onError={(e) => {
                setErrorImage(true);
              }}
            />
          )}
          {alram && (
            <View
              style={[
                {
                  top: 0,
                  right: 0,
                  position: "absolute",
                  backgroundColor: "red",
                  borderRadius: 5,
                  width: 6,
                  height: 6,
                },
              ]}
            />
          )}
        </TouchableOpacity>
      </View>
    </BaseHeader>
  );
}

const styles = StyleSheet.create({
  ////////////////////
  // Contents
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomeHeader;
