import React from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  ScrollView,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Toast from '@ant-design/react-native/lib/toast';
import Icon from '@ant-design/react-native/lib/icon';
import { px2dp } from '~/common/common'

const Stack = createStackNavigator();

function Home({ navigation }) {
  // navigation.setOptions({
  //   title: '订单',

  // })

  return (
    <View style={{ backgroundColor: '#fff', flex: 1, }}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}>
        <View style={{height:'100%',backgroundColor:'#eee'}}>
          <Text>Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              // navigation.navigate('Details', {
              //   itemId: 86,
              //   otherParam: 'anything you want here',
              // });
              Toast.success("ssss", 1)
            }}
          />
        </View>
      </ScrollView>
      <View style={{backgroundColor:'#eee',minHeight:"100%"}}></View>
    </View>
  )
}

export default function HomeScreen({ navigation }) {
  const [rightOptionsShow, setRightOptionsShow] = React.useState(false)

  function rightOptionsHandlerShow() {
    setRightOptionsShow(!rightOptionsShow)
  }

  function HeaderRight() {
    return (
      <View style={styles.rightBox}>
        <TouchableOpacity
          style={styles.rightBut}
          onPress={rightOptionsHandlerShow}>
          <Icon name={'plus-circle'} size={px2dp(50)} color={'#565656'} />
        </TouchableOpacity>
        <View style={[styles.rightOptionsBox, { display: rightOptionsShow ? "flex" : "none" }]} >
          <View style={styles.rightOptionsArrow}></View>
          <TouchableOpacity style={styles.optionsItemBox} activeOpacity={0.5}>
            <View style={styles.optionsItemIcon} ><Icon name={"user-add"} size={px2dp(50)} color={'#fff'} /></View>
            <View style={[styles.optionsItemTxtBox, styles.optionsItemLast]}><Text style={styles.optionsItemTxt}>添加好友</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsItemBox} activeOpacity={0.5}>
            <View style={styles.optionsItemIcon} ><Icon name={"scan"} size={px2dp(50)} color={'#fff'} /></View>
            <View style={[styles.optionsItemTxtBox, styles.optionsItemLast]}><Text style={styles.optionsItemTxt}>扫一扫</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsItemBox} activeOpacity={0.5}>
            <View style={styles.optionsItemIcon} ><Icon name={"pay-circle"} size={px2dp(50)} color={'#fff'} /></View>
            <View style={[styles.optionsItemTxtBox]}><Text style={styles.optionsItemTxt}>收付款</Text></View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="微信"
        component={Home}

        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          gestureDirection: 'horizontal',
          headerTitleAlign: 'center',
          headerRight: HeaderRight,
          headerStyle: {
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  rightBox: {

  },
  rightBut: {
    width: px2dp(80),
    height: px2dp(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px2dp(20),
  },
  rightOptionsBox: {
    position: 'absolute',
    top: px2dp(80),
    backgroundColor: '#000',
    opacity: 0.8,
    width: px2dp(300),
    right: px2dp(19),
    borderRadius: px2dp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightOptionsArrow: {
    backgroundColor: '#000',
    width: px2dp(30),
    height: px2dp(30),
    borderRadius: px2dp(4),
    transform: [{ rotateZ: 40 }],
    position: 'absolute',
    right: px2dp(26),
    top: px2dp(-10)
  },
  optionsItemBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionsItemTxtBox: {
    height: px2dp(80),
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: px2dp(60),
    flex: 1,
    marginLeft: px2dp(10),
  },
  optionsItemTxt: {
    color: "#fff",
    fontSize: px2dp(30),
  },
  optionsItemIcon: {
    marginLeft: px2dp(30),
  },
  optionsItemLast: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(238, 238, 238,0.2)',
  },
  rightOptions: {

  },
  contentContainer:{
    position:'absolute',
    top:1,
    flex:1,
    borderWidth:1,
    // backgroundColor: '#eee',
  }
})