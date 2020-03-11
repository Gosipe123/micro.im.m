import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  AsyncStorage,
} from "react-native"
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import Toast from '@ant-design/react-native/lib/toast';
import Button from '@ant-design/react-native/lib/button';
import { px2dp, errorHandler } from '~/common/common'
import apis from '~/common/http'
import md5 from "react-native-md5";
import { UserContext, UPDATE_USER } from '~/components/UserContext'

export default function SignIn({ navigation }) {
  const [userData, setUserData] = React.useState({ account: 'a123123', pwd: '123123' })
  const [signinButDisabled, setsigninButDisabled] = React.useState(true)
  const [signInLoad, setSignInLoad] = React.useState(false)
  const { dispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    setsigninButDisabled(userData.account.length < 6 || userData.pwd.length < 6)
  }, [userData])

  //登录
  function signIn() {
    setSignInLoad(true)
    setsigninButDisabled(true)
    let pwd_md5v = md5.hex_md5(userData.pwd);
    apis.signIn({ account: userData.account, pwd: pwd_md5v }).then(async res => {
      if (res.status == 200) {
        dispatch({ type: UPDATE_USER, userData: res.data})
        await AsyncStorage.setItem('userData',JSON.stringify(res.data));
        navigation.replace("Home")
        
      } else {
        Toast.fail(res.error.message, 1)
      }
      
    }).catch(err => {
      console.log(err);
      
      Toast.fail("未知错误", 1)
    }).then(() => {
      setSignInLoad(false)
      setsigninButDisabled(false)
    })
  }

  function goToSigiUp() {
    navigation.replace("SignUp")
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
          </List>
          <View style={styles.signUp}>
            <Button
              loading={signInLoad}
              type="warning"
              onPress={signIn}
              disabled={signinButDisabled}
            >登录</Button>
          </View>
          <Text style={styles.goToSignUpTxt} onPress={goToSigiUp}>没有账号？去注册>></Text>
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