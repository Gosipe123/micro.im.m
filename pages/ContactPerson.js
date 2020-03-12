import React from 'react';
import { Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

function CP({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Home', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="set params"
        onPress={() =>
          navigation.setParams({
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default function ContactPerson({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="联系人"
        component={CP}
        initialParams={route.params}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          gestureDirection: 'horizontal',
          headerTitleAlign: 'center',
        }} />
    </Stack.Navigator>
  );
}