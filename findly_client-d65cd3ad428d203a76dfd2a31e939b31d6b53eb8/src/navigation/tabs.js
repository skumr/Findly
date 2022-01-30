import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { SwipeScreen } from '../screens/SwipeScreen';
import LandingTest from '../screens/LandingTest';
import { useNavigation } from '@react-navigation/native';
import { GroupsScreen } from '../screens/GroupsScreen';

const Tab = createBottomTabNavigator();

/*
main bottom tab navigation
add a screen/stack navigator to the Tab.Navigator to add it to
the bottom tab
----specify the navigation id with name prop and the actual screen with component
can specify the icon used with the icon prop
 */

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={LandingTest} />
      <Tab.Screen name="Match" component={SwipeScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
