import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

/* Routes */
// put in const file?
import Record from './Record';
import Playback from './Playback';

const Navigation = TabNavigator({
  Record: {
    screen: Record,
    navigationOptions: {
      showLabel: false,
      tabBarIcon: ({ tintColor, focused }) => (
        <MCI
          name="record-rec"
          size={40}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Playback: {
    screen: Playback,
    navigationOptions: {
      showLabel: false,
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name="md-list-box"
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },
},
{
  tabBarOptions: {
    showLabel: false
  },
  tabBarComponent: props => (
    <TabBarBottom
      {...props}
      style={{ backgroundColor: '#313844' }}
    />
  )
});

export default Navigation;
