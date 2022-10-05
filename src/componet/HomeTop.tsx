import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../styles/styles";
import { Assets } from "./Assets";
import { SpacialRequest } from "./Assets/specialRequest";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBalance } from "../hooks/useBalance";
import { useCallback, useEffect, useId, useState } from "react";
import { useAppContext } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import { NFTs } from "./NFTs";

interface Props {
  navigation: any;
}

export const HomeTop = ({ navigation }: Props) => {
  const { id, account } = useAppContext();
  const { getNativeBalance, getERC20Balance } = useBalance();
  const [balance, setBalance] = useState(0);
  const [erc20, setERC20] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState("assets");

  useFocusEffect(
    useCallback(() => {
      console.log(id, "Dsadasdrwhroughddhbfbcbikbj");
      id &&
        getNativeBalance(id?.default.chain.chainId as string).then(
          (balance) => {
            console.log(balance);
            setBalance(balance);
          }
        );

      getERC20Balance(id?.default.chain.chainId as string).then((balance) =>
        setERC20(balance)
      );
    }, [])
  );

  return (
    <View style={style.constainer}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: "40%",
            backgroundColor: COLORS.primary,
            marginBottom: 10,
            position: "relative",
          }}
        ></View>
        <View
          style={{
            height: 15,
            width: "70%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: COLORS.primary,
            marginBottom: 10,
            position: "relative",
            bottom: 8,
          }}
        ></View>
        <View
          style={{
            ...style.dash,
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/card.png")}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 27,
                  fontFamily: "KronaOne_400Regular",
                }}
              >
                M$ {balance.toFixed(3)}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="md-arrow-up-outline"
                  style={{
                    transform: [{ rotate: "30deg" }],
                    color: "white",
                  }}
                  size={24}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: SIZES.small,
                    fontFamily: "KronaOne_400Regular",
                  }}
                >
                  0.00% (+$0)
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("send")}>
                <Ionicons
                  name="md-arrow-up"
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  size={30}
                  style={{
                    color: "white",
                  }}
                  name="md-arrow-down"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
      <SpacialRequest navigation={navigation} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#E8FDDE",
          padding: 4,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("assets");
          }}
          style={{
            width: "50%",
            backgroundColor: "white",
            padding: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Assets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("nfts");
          }}
          style={{
            padding: 12,
            width: "50%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
          >
            NFTS
          </Text>
        </TouchableOpacity>
      </View>
      {currentTab == "assets" ? <Assets assets={erc20} /> : <NFTs />}
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {
    width: "100%",
    alignItems: "center",
  },
  dash: {
    width: "100%",
    height: 150,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    position: "relative",
    bottom: 15,
  },
});
