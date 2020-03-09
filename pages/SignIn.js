import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import Button from '@ant-design/react-native/lib/button';
import { px2dp } from '~/common/common'
import apis from '~/common/http'

export default function SignIn() {
  const [account, setAccount] = React.useState("")
  const [pwd, setPwd] = React.useState("")
  const [signInLoad, setSignInLoad] = React.useState(false)

  function signIn(params) {
    // setSignInLoad(true)
    apis.signIn({account:'123456',pwd:"123456"}).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      console.log(err);
      
    })
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          <List style={styles.container}>
            <InputItem
              clear
              value={account}
              placeholder="请输入用户名"
              onChange={value => {
                setAccount(value)
              }}
            >用户名</InputItem>
            <InputItem
              clear
              value={pwd}
              // type="password"
              placeholder="请输入密码"
              onChange={value => {
                setPwd(value)
              }}
            >密码</InputItem>
          </List>
          <View style={styles.signUp}>
            <Button 
            loading={signInLoad} 
            type="warning"
            onPress={signIn}
            >登录</Button>
          </View>
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
})