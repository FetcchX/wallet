import { Text, View, Image, Clipboard, Alert } from "react-native";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../styles/styles";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ChainAsset } from "../componet/profile/Chain";
import { useAppContext } from "../context";
import { useChain } from "../hooks/useChain";
import { ChainAssets } from "../componet/profile/ChainAssets.";
import { useFocusEffect } from "@react-navigation/native";

export const Profile = () => {
  const [changed, setChanged] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { getChains } = useChain();
  const { id, evmWallets } = useAppContext();
  const [activeAdressonBottomSheet, setActiveAddressOnBottomSheet] =
    useState<any>();
  const [chains, setChains] = useState<any[]>([]);

  useEffect(() => {
    console.log(chains, "DSA");
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const totalChains = await getChains();
        console.log(totalChains);
        setChains(totalChains);
      })();
    }, [])
  )

  console.log(evmWallets, "DSafdfj")

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleTokenOpenPress = () => {
    if (!bottomSheetRef) return;
    (bottomSheetRef as React.MutableRefObject<BottomSheet>).current.expand();
  };

  return (
    <>
      <Safe>
        <Header />
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: -30,
              fontSize: 25,
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Profile
          </Text>
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.primary,
              height: 100,
              width: 100,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              {id?.id[0]}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              padding: 4,
              alignItems: "center",
              backgroundColor: "#E0FFD0",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                marginHorizontal: 12,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              {id?.id}
            </Text>
            <TouchableOpacity onPress={() => {
              Alert.alert("Copied to clipboard")
              Clipboard.setString(id?.id as string)
            }}>
              <MaterialIcons name="content-copy" color={"#000"} size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "KronaOne_400Regular",
                marginBottom: 12,
              }}
            >
              Default Address
            </Text>
            {id && id.default && id.default.address && 
              <TouchableOpacity
                onPress={() => {
                  setActiveAddressOnBottomSheet({
                    address: id.default.address,
                    chain: [id.default.chain]
                  })
                  setTimeout(() => {
                    console.log(activeAdressonBottomSheet, "dsa")
                    handleTokenOpenPress();
                  }, 5000)
                }}
              >
                <View
                  style={{
                    padding: 15,
                    borderRadius: 12,
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: "#E0FFD0",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "KronaOne_400Regular",
                    }}
                  >
                    {id?.default.address.slice(0, 18) + "..."}
                  </Text>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 100,
                      backgroundColor: "white",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      source={{
                        uri: id?.default.chain.icon,
                      }}
                      style={{
                        width: 17,
                        height: 30
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            }
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "KronaOne_400Regular",
                fontSize: 18,
                marginVertical: 12,
              }}
            >
              Other Addresses
            </Text>
            {id?.others.map((otheradd) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setActiveAddressOnBottomSheet(otheradd);
                    handleTokenOpenPress();
                  }}
                >
                  <View
                    style={{
                      padding: 15,
                      borderRadius: 12,
                      justifyContent: "space-between",
                      width: "100%",
                      backgroundColor: "#E0FFD0",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{
                      fontFamily: "KronaOne_400Regular",
                    }}>{otheradd.address.slice(0, 15) + "..."}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      {otheradd.chain.map(chain => (
                        <View
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                            backgroundColor: "white",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Image
                            source={{
                              uri: chain.icon,
                            }}
                            style={{
                              width: 30,
                              height: 30
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {changed &&
        <View style={{
          position: 'absolute',
          bottom: 80,
          width: "110%",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              width: '100%',
              borderRadius: 10,
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 12,
              fontFamily: "KronaOne_400Regular",
              textAlign: 'center'
            }}>Save</Text>
          </TouchableOpacity>
          </View>
        }
        <BottomSheet
          style={{
            zIndex: 100,
            backgroundColor: COLORS.primary,
          }}
          handleStyle={{
            backgroundColor: COLORS.primary,
          }}
          handleIndicatorStyle={{
            backgroundColor: "white",
          }}
          enablePanDownToClose={true}
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View
            style={{
              position: "relative",
              padding: 10,
              backgroundColor: COLORS.primary,
              height: "100%",
            }}
          >
            <View
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "white",
                  fontFamily: "KronaOne_400Regular",
                }}
              >
                {activeAdressonBottomSheet?.address.slice(0, 14) + "..."}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EAFDE0",
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}
                onPress={() => {
                  setChanged(true)
                  bottomSheetRef.current?.close()
                }}
              >
                <Text style={{
                  fontSize: 12,
                  fontFamily: "KronaOne_400Regular",
                }}>Remove</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{
                marginBottom: 60,
                position: "relative",
              }}
            >
              <ChainAssets chainData={chains} active={activeAdressonBottomSheet} />
            </ScrollView>
          </View>
        </BottomSheet>
      </Safe>
    </>
  );
};
