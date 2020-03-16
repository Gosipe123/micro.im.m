import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  FlatList,
  Animated,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Toast from '@ant-design/react-native/lib/toast';
import Icon from '@ant-design/react-native/lib/icon';
import List from '@ant-design/react-native/lib/list';
import { px2dp } from '~/common/common'
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Home({ navigation }) {
  const searchInput = React.createRef();
  const [scrollView, setScrollView] = React.useState();
  const [controlOpen, setControlOpen] = React.useState(false);
  const [rowShowSingleChoiceStutas, setRowShowSingleChoiceStutas] = React.useState(false);
  const [leftSwipeRowMap, setLeftSwipeRowMap] = React.useState({ index: -1, rowMap: null });

  const [chatData, setChatData] = React.useState([]);

  const [viewHeight] = React.useState(new Animated.Value(0))
  const [search] = React.useState(new Animated.Value(52))
  const [cancelBut] = React.useState(new Animated.Value(px2dp(710)))

  const [headContentTop] = React.useState(new Animated.Value(0))
  const [headContentOpacity] = React.useState(new Animated.Value(1))
  const [headContentHeight] = React.useState(new Animated.Value(px2dp(90)))
  const [rightOptionsShow, setRightOptionsShow] = React.useState(false)

  const [leftSwipeRow] = React.useState({})
  //行编辑点击显示单选框动画
  const [rowShowSingleChoice] = React.useState(new Animated.Value(px2dp(-64)))
  //行选中 动画
  // const [rowCheckd] = React.useState({})

  React.useEffect(() => {
    let chatDataA = [
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
      { row_type: 0, name: '资讯讨论', sound: true, last_msg_time: 0, logo: '', unread_msg_count: 0, last_msg_user: "", last_msg_content: "", },
    ]
    setChatData(chatDataA)
    for (const key in chatDataA) {
      leftSwipeRow[`${key}`] = new Animated.Value(0);
    }
  }, [])

  const rowShowSingleChoiceOpacity = rowShowSingleChoice.interpolate({
    inputRange: [-1, 1],
    outputRange: [0, 1]
  })

  const rowShowSingleChoiceStart = Animated.timing(rowShowSingleChoice, {
    toValue: 0,
    duration: 350,
  })

  const rowShowSingleChoiceEnd = Animated.timing(rowShowSingleChoice, {
    toValue: px2dp(-64),
    duration: 350,
  })

  //搜索框动画插值计算
  const searchBoxWidth = search.interpolate({
    inputRange: [0, 52, 100],
    outputRange: ["0%", "52%", "100%"]
  })

  //页头入场
  const headContentTopStart = Animated.parallel([
    // 页头向上移动动画
    Animated.timing(headContentTop, {
      toValue: -50,
      duration: 350,
    }),
    //页头改变高度动画
    Animated.timing(headContentHeight, {
      toValue: 0,
      duration: 350,
    }),
    //页头透明动画
    Animated.timing(headContentOpacity, {
      toValue: 0,
      duration: 200,
    }),
    //搜索取消按钮入场
    Animated.timing(cancelBut, {
      toValue: px2dp(588),
      duration: 350,
      // useNativeDriver: true, // 启动原生动画
    }),
    //搜索框居左
    Animated.timing(search, {
      toValue: 100,
      duration: 350,
    }),
  ], { useNativeDriver: true })

  //页头出场
  const headContentTopEnd = Animated.parallel([
    Animated.timing(headContentTop, {
      toValue: 0,
      duration: 350,
    }),
    Animated.timing(headContentOpacity, {
      toValue: 1,
      duration: 700,
    }),
    Animated.timing(headContentHeight, {
      toValue: px2dp(90),
      duration: 350,
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

  //控制加号点击弹窗的显示
  function rightOptionsHandlerShow() {
    setRightOptionsShow(!rightOptionsShow)
  }

  //渲染搜索用户
  function renderListSearch() {
    return (
      <View style={[styles.searchFlex]} >
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
                  headContentTopStart.start()
                  scrollView.setNativeProps({ scrollEnabled: false });
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
              scrollView.setNativeProps({ scrollEnabled: true });
            })
          }}
        >
          <Text style={styles.cancelText}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }

  //渲染行分割线
  function renderItemDividingLine() {
    return (
      <View style={{ alignItems: "flex-end" }}>
        <View style={{ borderWidth: 1 / PixelRatio.get(), borderColor: '#c7c7cc', width: "84%" }}></View>
      </View>
    )
  }

  function closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  //渲染聊天列表子项
  function ChatRow({ item, index }, rowMap) {
    return (
      <SwipeRow
        leftOpenValue={px2dp(280)}
        rightOpenValue={px2dp(-280)}
        swipeKey={index.toString()}
        friction={10}
        directionalDistanceChangeThreshold={10}
        tension={50}
        swipeToOpenVelocityContribution={10}
        disableLeftSwipe={rowShowSingleChoiceStutas}
        disableRightSwipe={rowShowSingleChoiceStutas}
        onSwipeValueChange={
          Animated.event([
            {
              value: leftSwipeRow[`${index}`]
            },
          ])
        }
      >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
          <Animated.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: leftSwipeRow[`${index}`].interpolate({
              inputRange: [-1, 0, 50],
              outputRange: [0, 0, 50]
            }),
          }}>
            <View style={{ alignItems: 'center', justifyContent: "center", backgroundColor: '#208dff', height: "100%", flex: 1, overflow: "hidden" }}>
              <TouchableOpacity activeOpacity={1} style={{ alignItems: "center", minWidth: px2dp(280) }}>
                <Icon name="pushpin" size={px2dp(50)} color={"#fff"} />
                <Text style={{ color: '#fff', fontWeight: "500", marginTop: px2dp(10) }} ellipsizeMode="clip" numberOfLines={1}>设为未读</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center', justifyContent: "center", backgroundColor: '#14b94f', height: "100%", flex: 1, overflow: "hidden" }}>
              <View style={{ alignItems: "center", minWidth: px2dp(280) }}>
                <Icon name="pushpin" size={px2dp(50)} color={"#fff"} />
                <Text style={{ color: '#fff', fontWeight: "500", marginTop: px2dp(10) }} ellipsizeMode="clip" numberOfLines={1}>置顶</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: leftSwipeRow[`${index}`].interpolate({
              inputRange: [-50, 0],
              outputRange: [50, 0]
            })
          }}>
            <View style={{ alignItems: 'center', justifyContent: "center", backgroundColor: '#be8723', height: "100%", flex: 1, overflow: "hidden" }}>
              <TouchableOpacity activeOpacity={1} style={{ alignItems: "center", minWidth: px2dp(280) }}>
                <Icon name="pushpin" size={px2dp(50)} color={"#fff"} />
                <Text style={{ color: '#fff' }}>设为未读</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: "center", backgroundColor: '#f30000', height: "100%", flex: 1, overflow: "hidden" }}>
              <TouchableOpacity activeOpacity={1} style={{ alignItems: "center", minWidth: px2dp(280) }}>
                <Icon name="pushpin" size={px2dp(50)} color={"#fff"} />
                <Text style={{ color: '#fff' }}>置顶</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <TouchableHighlight
          underlayColor={"#ddd"}
          activeOpacity={1}
          onPress={() => {
            if (controlOpen) return
            navigation.navigate("Chat")
          }}
        >
          <View style={{ flexDirection: 'row', paddingVertical: px2dp(14), paddingRight: px2dp(10) }}>
            <Animated.View style={{ width: px2dp(64), justifyContent: 'center', alignItems: 'center', marginLeft: rowShowSingleChoice, opacity: rowShowSingleChoiceOpacity }}>
              <View style={{ width: px2dp(50), marginLeft: px2dp(14), }}>
                <View>
                  <View style={{ width: px2dp(40), height: px2dp(40), borderColor: "#565656", borderWidth: 1 / PixelRatio.get(), borderRadius: '50%' }}></View>
                  {/* <View style={{ position: "absolute", top: px2dp(-5), left: px2dp(-5) }}>
                    <View style={{ width: px2dp(50), height: px2dp(50) }}>
                      <Icone
                        name="check-circle"
                        size={px2dp(50)}
                        color="#247ad6"
                      />
                    </View>
                  </View> */}

                </View>
              </View>
            </Animated.View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ backgroundColor: "#2d8bf0", width: px2dp(110), height: px2dp(110), marginHorizontal: px2dp(14), borderRadius: "50%", }}>

              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: "center", flex: 1, }}>
                  <Text style={{ fontSize: px2dp(32), fontWeight: "500", flexBasis: "auto", maxWidth: '92%' }} numberOfLines={1} >{item.name}这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回</Text>
                  <View><Icon name={"bell"} /></View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                  <Icon name={"bell"} />
                  <Text style={{ color: '#a0a0a0' }}>4:57 AM</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <View>
                    <Text style={{ fontSize: px2dp(30), paddingVertical: px2dp(6) }} numberOfLines={1}>这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: px2dp(28), color: '#a0a0a0' }} numberOfLines={1}>这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回这回</Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center", paddingHorizontal: px2dp(18) }}>
                  <View style={{ borderRadius: px2dp(20), backgroundColor: "#a0a0a0", paddingHorizontal: px2dp(12), paddingVertical: px2dp(2) }}>
                    <Text style={{ color: "#fff", fontSize: px2dp(26) }}>123</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        {/* 首页加号点击弹出层 */}
        <Modal
          transparent={true}
          visible={rightOptionsShow}
          animationType="fade">
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={rightOptionsHandlerShow}>
              <View style={[styles.rightOptionsBox,]} >
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
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
        <View style={styles.homeBox}>
          {/* 页头 */}
          <Animated.View style={[styles.header, { height: headContentHeight }]}>
            <Animated.View style={[styles.headerBox, { top: headContentTop, opacity: headContentOpacity }]}>
              <View style={{ flex: 1, height: "100%", justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => {
                  if (!rowShowSingleChoiceStutas) {
                    if(leftSwipeRowMap.index != -1){
                      leftSwipeRowMap.rowMap[leftSwipeRowMap.index].closeRow()
                    }
                    rowShowSingleChoiceEnd.stop()
                    rowShowSingleChoiceStart.start()
                    setRowShowSingleChoiceStutas(true)
                  } else {
                    rowShowSingleChoiceStart.stop()
                    rowShowSingleChoiceEnd.start()
                    setRowShowSingleChoiceStutas(false)
                  }

                }}>
                  <Text style={{ fontSize: px2dp(30), marginLeft: px2dp(20), color: '#0086f1', display: rowShowSingleChoiceStutas ? "none" : "flex" }}>编辑</Text>
                  <Text style={{ fontSize: px2dp(30), marginLeft: px2dp(20), color: '#0086f1', display: rowShowSingleChoiceStutas ? "flex" : "none" }}>完成</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, alignItems: 'center' }}><Text style={{ fontSize: px2dp(34) }}>微信</Text></View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={styles.rightBut}
                  onPress={rightOptionsHandlerShow}>
                  <Icon name={'plus-circle'} size={px2dp(50)} color={'#565656'} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
          {/* 页头尾 */}
          {/* 列表主体 */}
          <View style={{ flex: 1 }}>
            {/* 页头滚动填充 */}
            <Animated.View style={[styles.fillinghaed, { height: height }]}></Animated.View>
            {/* 滚动主体 */}
            <SwipeListView
              data={chatData}
              // snapToOffsets={1}
              // snapToStart={false}
              friction={10}
              directionalDistanceChangeThreshold={10}
              tension={50}
              swipeToOpenVelocityContribution={10}
              contentContainerStyle={[styles.contentContainer]}
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
              onScroll={animatedEvent}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
              keyExtractor={(item, index) => index.toString()}
              listViewRef={(ref) => {
                setScrollView(ref)
              }}
              onRowOpen={(rowKey, rowMap) => {
                setControlOpen(true)
                setLeftSwipeRowMap({ index: rowKey, rowMap: rowMap })
              }}
              onRowClose={() => {
                setControlOpen(false)
                setLeftSwipeRowMap({ index: -1, rowMap: null })
              }}
              removeClippedSubviews={true}
              snapToInterval={px2dp(106)}
              ListHeaderComponent={renderListSearch}
              ItemSeparatorComponent={renderItemDividingLine}
              renderItem={ChatRow}
            />
          </View>
          {/* 列表主题尾 */}
        </View>
      </View>
    </SafeAreaView>
  )
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
    top: px2dp(100),
    backgroundColor: '#000',
    opacity: 0.8,
    width: px2dp(300),
    right: px2dp(19),
    borderRadius: px2dp(6),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
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
    borderColor: '#c7c7cc',
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
  },
  header: {
    height: px2dp(90),
    backgroundColor: '#fff'
  },
  headerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  }
})