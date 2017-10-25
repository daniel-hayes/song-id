import React, { Component } from 'react';
import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';

const { RNRecordAudio } = NativeModules;

class Record extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      recording: false
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.audioErrorCallback = this.audioErrorCallback.bind(this);
    this.audioSuccessCallback = this.audioSuccessCallback.bind(this);
  }

  audioErrorCallback(results) {
    console.warn('Error', results.errMsg);
  }

  audioSuccessCallback(results) {
    const { successMsg } = results;
    const recordingState = successMsg.includes('started');

    this.setState({ recording: recordingState });
  }

  handlePlay() {
    // @TODO put file name in constant
    RNRecordAudio.startRecord('test.m4a', this.audioErrorCallback, this.audioSuccessCallback);
  }

  handleStop() {
    // @TODO put file name in constant
    RNRecordAudio.stopRecord('test.m4a', this.audioErrorCallback, this.audioSuccessCallback);
  }

  render() {
    const { recording } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.recordingText}>{!recording ? 'Start Recording' : 'Stop Recording'}</Text>
        <TouchableHighlight onPress={!recording ? this.handlePlay : this.handleStop}>
          <View style={styles.circle}>
            <View style={styles.innerCircle}>
              <MaterialIcons
                name={!recording ? 'mic-none' : 'mic'}
                style={styles.icon}
                size={40} />
            </View>
          </View>
        </TouchableHighlight>         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38414e'
  },
  recordingText: {
    color: '#f0f0f0',
    fontSize: 18,
    marginBottom: 100
  },
  circle: {
    borderRadius: 100,
    height: 175,
    width: 175,
    backgroundColor: '#6f819a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    borderRadius: 100,
    height: 95,
    width: 95,
    backgroundColor: 'rgba(218, 60, 48, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 2
  },
  icon: {
    color: '#f0f0f0'
  }
});

export default Record;
