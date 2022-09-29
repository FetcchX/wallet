import React, { useCallback } from "react";
import { Safe } from "./src/componet/shared/safe";
import { Asset } from "./src/componet/Assets/Asset";
import { Assets } from "./src/componet/Assets";
import { SpacialRequest } from "./src/componet/Assets/specialRequest";
import { CreateAccount } from "./src/screens/createAccount";
import { PyaonRequest } from "./src/screens/payonRequest";
import { Header } from "./src/componet/shared/header";
import { Succesfull } from "./src/screens/success";
import { Requests } from "./src/screens/requests";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./src/screens/Home";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { ImageBackground } from "react-native";
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    k: require("./assets/k.ttf"),
  });

  if (!loaded) return null;

  return (
    <>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"createAccount"}
          >
            <Stack.Screen name="createAccount" component={CreateAccount} />
            <Stack.Screen name="home" component={Main} />
            <Stack.Screen name="requests" component={Requests} />
            <Stack.Screen name="success" component={Succesfull} />
            <Stack.Screen name="payOnRequest" component={PyaonRequest} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}
