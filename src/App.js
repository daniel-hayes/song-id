import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import RedditLogin from './RedditLogin';

const App = (props) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    {props.authenticated
      ? <Navigation />
      : <RedditLogin />
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38414e',
  }
});

export default connect(state => state)(App);
