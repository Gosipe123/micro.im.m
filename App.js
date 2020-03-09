import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, AppState, View, Text } from 'react-native';
import * as Font from 'expo-font';
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
import { UserProvider, UserContext } from '~/components/UserContext'

function Tabs() {
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
  const [isReady, setIsReady] = React.useState(false)
  const [start, setStart] = React.useState(0)
  const [startPageShow, setStartPageShow] = React.useState(false)
  
  function handlerAppStateChange(e) {
    console.log(e);

  }

  React.useEffect(() => {
    Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    ).then(() => {
      Font.loadAsync(
        'antfill',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
      ).then(() => {
        setIsReady(true)
        AppState.addEventListener("change", handlerAppStateChange)
      })
    })
  }, [])

  if (!isReady) {
    return <Text>123</Text>;
  }

  return (
    <UserProvider value={{s:1}}>
      {
        startPageShow ? <StartPage /> : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                  gestureDirection: 'horizontal',
                  headerShown: false,
                }} />
              <Stack.Screen
                name="Home"
                component={Tabs}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                  gestureDirection: 'horizontal',
                  headerShown: false,
                }} />
              {/* <Stack.Screen
            name="Details"
            component={ContactPerson}
            initialParams={{ itemId: 42 }} options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
              gestureDirection: "horizontal",
              // headerShown: false,
            }} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
    </UserProvider>
  );
}

const styles = StyleSheet.create({

});
