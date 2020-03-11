import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, AppState, Text, AsyncStorage } from 'react-native';
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
import SignIn from "~/pages/SignIn"
import SignUp from "~/pages/SignUp"
import { px2dp } from '~/common/common'
import { UserProvider, UserContext } from '~/components/UserContext'
import Toast from '@ant-design/react-native/lib/toast';
import Icon from '@ant-design/react-native/lib/icon';

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        tabBarOptions={{
          activeTintColor: "#00f",
          inactiveTintColor: '#000'
        }}
        tabStyle={{ color: "red" }}
        options={{
          title: "微信",
          tabBarIcon: ({ focused, color }) => {
            return <Icon name={'wechat'} size={px2dp(50)} color={color} />
          }
        }} />
      <Tab.Screen
        name="ContactPerson"
        component={ContactPerson}
        options={{
          title: "联系人",
          tabBarIcon: ({ focused, color }) => {
            return <Icon name={'team'} size={px2dp(50)} color={color} />
          }
        }}
        initialParams={{
          itemId: 42,
        }} />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          title: "我",
          tabBarIcon: ({ focused, color }) => {
            return <Icon name={'user'} size={px2dp(50)} color={color} />
          }
        }} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = React.useState(false)
  const [initialRouteName, setInitialRouteName] = React.useState("Home")
  const [start, setStart] = React.useState(0)
  let userData = {}

  function handlerAppStateChange(e) {
    // console.log(e);
  }

  React.useEffect(() => {
    Font.loadAsync(
      'antoutline',
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    ).then(async () => {
      await Font.loadAsync(
        'antfill',
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
      )
      try {
        const value = await AsyncStorage.getItem('userData');

        if (value == null) {
          setInitialRouteName("SignIn")
          await AsyncStorage.removeItem('userData')
        } else {
          userData = JSON.parse(value)
          setInitialRouteName("Home")

        }
      } catch (error) {
        Toast.fail("APP初始化错误", 1)
        setInitialRouteName("SignIn")
        await AsyncStorage.removeItem('userData')
      }

      setIsReady(true)
      AppState.addEventListener("change", handlerAppStateChange)
    })

  }, [])

  if (!isReady) {
    return null;
  }

  return (
    <UserProvider data={userData}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
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
            name="SignUp"
            component={SignUp}
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
    </UserProvider>
  );
}

const styles = StyleSheet.create({

});
