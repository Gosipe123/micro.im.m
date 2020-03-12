import React from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  ScrollView,
  Animated,
  TextInput,
  SafeAreaView,
  StatusBar,
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
  let searchInput = React.createRef();

  const [viewHeight] = React.useState(new Animated.Value(0))
  const [search] = React.useState(new Animated.Value(52))
  const [cancelBut] = React.useState(new Animated.Value(px2dp(710)))
  const [scrollEnabled, setScrollEnabled] = React.useState(true)

  const [headContentTop] = React.useState(new Animated.Value(88))
  const [headContentOpacity] = React.useState(new Animated.Value(1))

  //搜索框动画插值计算
  const searchBoxWidth = search.interpolate({
    inputRange: [0, 52, 100],
    outputRange: ["0%", "52%", "100%"]
  })

  //页头入场
  const headContentTopStart = Animated.parallel([
    Animated.timing(headContentTop, {
      toValue: 50,
      duration: 350,
    }),
    Animated.timing(headContentOpacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }),
    Animated.timing(cancelBut, {
      toValue: px2dp(588),
      duration: 350,
      // useNativeDriver: true, // 启动原生动画
    }),
    Animated.timing(search, {
      toValue: 100,
      duration: 350,
    }),
  ], { useNativeDriver: true })

  //页头出场
  const headContentTopEnd = Animated.parallel([
    Animated.timing(headContentTop, {
      toValue: 88,
      duration: 350,
    }),
    Animated.timing(headContentOpacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }),
    Animated.timing(cancelBut, {
      toValue: px2dp(710),
      duration: 350,
    }),
    Animated.timing(search, {
      toValue: 52,
      duration: 350,
    }),
  ], { useNativeDriver: true })

  //设置页头
  // navigation.setOptions({
  //   headerStyle: {
  //     height: headContentTop,
  //     shadowOpacity: 0,
  //   },
  //   headerTitleContainerStyle: {
  //     opacity: headContentOpacity,
  //   },
  //   headerRightContainerStyle: {
  //     opacity: headContentOpacity,
  //   }
  // })

  const height = viewHeight.interpolate({
    inputRange: [-270, 0, 270],
    outputRange: [270, 0, 0]
  })

  //滚动动画事件
  const animatedEvent = Animated.event([
    {
      nativeEvent: {
        contentOffset: { y: viewHeight }
      }
    },
  ])

  return (
    <View style={styles.homeBox}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor:'#fff'}}>
        <View style={{borderWidth:1,borderColor:'red',height:50,flexDirection:'row',justifyContent:"space-between",alignItems:'center',}}>
          <View><Text>123</Text></View>
          <View><Text>123</Text></View>
          <View><Text>123</Text></View>
        </View>
      </SafeAreaView>
      <View>
        <Animated.View style={[styles.fillinghaed, { height: height }]}></Animated.View>
        <Animated.ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={1}
          onScroll={animatedEvent}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          scrollEnabled={scrollEnabled}
        >
          <View style={[styles.searchFlex]}>
            <Animated.View style={{ width: cancelBut }}>
              <TouchableOpacity
                style={styles.searchTouchable}
                activeOpacity={1}
                onPress={() => {
                  searchInput.current.focus()
                }}
              >
                <Animated.View style={{
                  flexDirection: 'row',
                  width: searchBoxWidth
                }}>
                  <View style={styles.searchIconBox}><Icon name="search" sizi={px2dp(20)} color={"#aaa"} /></View>
                  <TextInput
                    clearTextOnFocus={true}
                    style={styles.searchInput}
                    onFocus={() => {
                      headContentTopEnd.stop()
                      //开始搜索框动画
                      setScrollEnabled(false)
                      headContentTopStart.start()
                    }}
                    autoCapitalize="none"
                    placeholder="搜索记录或用户"
                    ref={searchInput}

                  ></TextInput>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.cancelBox}
              onPress={() => {
                searchInput.current.blur()
                headContentTopStart.stop()
                headContentTopEnd.start(() => {
                  setScrollEnabled(true)
                })
              }}
            >
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
          </View>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
        </Animated.ScrollView>
      </View>
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
      <View>
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
    <Home/>
  );
}

const styles = StyleSheet.create({
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
  contentContainer: {
    backgroundColor: '#f1f1f1',
  },
  homeBox: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  fillinghaed: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: "100%"
  },
  searchFlex: {
    backgroundColor: '#fff',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: px2dp(20),
    flexDirection: "row",
    paddingLeft: px2dp(20),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#c7c7cc'
  },
  searchTouchable: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: px2dp(10),
    justifyContent: 'center',
  },
  searchIconBox: {
    width: px2dp(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: px2dp(34),
    height: px2dp(66),
    textAlignVertical: "center",
    alignItems: 'center',
    justifyContent: "center",
    flex: 1,
  },
  cancelBox: {
    paddingHorizontal: px2dp(40),
    height: px2dp(66),
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: px2dp(30),
    color: '#0086f1',
  }
})