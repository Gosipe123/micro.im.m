import React from "react";
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  AsyncStorage,
} from 'react-native'
import List from '@ant-design/react-native/lib/list';
import InputItem from '@ant-design/react-native/lib/input-item';
import Button from '@ant-design/react-native/lib/button';
import Toast from '@ant-design/react-native/lib/toast';
import { px2dp } from '~/common/common'
import apis from '~/common/http'
import { UserContext, UPDATE_USER } from '~/components/UserContext'

export default function SignUp({ navigation }) {
  const [userData, setUserData] = React.useState({ account: '', pwd: '', againPwd: '', nike_name: '' })
  const [signinButDisabled, setsigninButDisabled] = React.useState(true)
  const [signInLoad, setSignInLoad] = React.useState(false)
  const { dispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    setsigninButDisabled(userData.account.length < 6 || userData.pwd.length < 6 || userData.nike_name.length < 1 || userData.pwd.length != userData.againPwd.length)
  }, [userData])

  function signUp() {
    if (userData.pwd != userData.againPwd) {
      Toast.fail('两次密码输入不一致', 1)
      return
    }
    setSignInLoad(true)
    setsigninButDisabled(true)
    apis.signUp({ account: userData.account, pwd: userData.pwd, nike_name: userData.nike_name }).then(async res => {
      if (res.status == 200) {
        dispatch({ type: UPDATE_USER, userData: res.data })
        await AsyncStorage.setItem('userData',JSON.stringify(res.data));
        navigation.replace("Home")
      } else {
        Toast.fail(res.error.message, 1)
      }
    }).catch(err => {
      Toast.fail("未知错误", 1)
    }).then(() => {
      setSignInLoad(false)
      setsigninButDisabled(false)
    })
  }

  function goToSigiIn() {
    navigation.replace("SignIn")
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          <List style={styles.container}>
            <InputItem
              clear
              value={userData.nike_name}
              placeholder='昵称'
              onChange={value => {
                setUserData({ ...userData, nike_name: value })
              }}
            >昵称</InputItem>
            <InputItem
              clear
              value={userData.account}
              placeholder="请输入用户名"
              onChange={value => {
                setUserData({ ...userData, account: value })
              }}
            >用户名</InputItem>
            <InputItem
              clear
              value={userData.pwd}
              type="password"
              placeholder="请输入密码"
              onChange={value => {
                setUserData({ ...userData, pwd: value })
              }}
            >密码</InputItem>
            <InputItem
              clear
              value={userData.againPwd}
              type="password"
              placeholder="请再次输入密码"
              onChange={value => {
                setUserData({ ...userData, againPwd: value })
              }}
            >确认密码</InputItem>
          </List>
          <View style={styles.signUp}>
            <Button
              loading={signInLoad}
              type="warning"
              onPress={signUp}
              disabled={signinButDisabled}
            >注册</Button>
          </View>
          <Text style={styles.goToSignUpTxt} onPress={goToSigiIn}>已有账号？去登录>></Text>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView >
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
  },
  container: {
    paddingTop: px2dp(100)
  },
  signUp: {
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(40)
  },
  goToSignUpTxt: {
    textAlign: 'center',
  }
})