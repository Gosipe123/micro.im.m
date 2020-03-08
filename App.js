import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "~/pages/HomeScreen"
import ContactPerson from "~/pages/ContactPerson"
import Me from "~/pages/Me"
import StartPage from "~/pages/StartPage"
import SignIn from "~/pages/SignIn"
import { px2dp } from '~/common/common'

function Tabs(s) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "微信" }} />
      <Tab.Screen name="ContactPerson" component={ContactPerson} options={{ title: "联系人" }} initialParams={{ itemId: 42 }} />
      <Tab.Screen name="Me" component={Me} options={{ title: "我" }} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [start, setStart] = React.useState(0)
  const [startPageShow, setStartPageShow] = React.useState(false)

  function handlerAppStateChange(e) {
    console.log(e);

  }

  React.useEffect(() => {
    AppState.addEventListener("change", handlerAppStateChange)
  })

  return (
    <>
      {
        <SignIn/>
        // startPageShow ? <StartPage /> : (
        //   <NavigationContainer>
        //     <Stack.Navigator>
        //       <Stack.Screen
        //         name="Home"
        //         component={Tabs}
        //         options={{
        //           cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //           headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        //           gestureDirection: 'horizontal',
        //           headerShown: false,
        //         }} />
        //       {/* <Stack.Screen
        //     name="Details"
        //     component={ContactPerson}
        //     initialParams={{ itemId: 42 }} options={{
        //       cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //       headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        //       gestureDirection: "horizontal",
        //       // headerShown: false,
        //     }} /> */}
        //     </Stack.Navigator>
        //   </NavigationContainer>
        // )
      }
    </>
  );
}

const styles = StyleSheet.create({

});
