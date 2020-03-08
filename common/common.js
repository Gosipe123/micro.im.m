import {Dimensions} from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;
const uiWidthPx = 750;

export function px2dp(uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthPx;
}