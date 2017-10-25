import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

export default class Playback extends Component<{}> {
  handlePlay() {
    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file
    const music = new Sound('test.m4a', RNFS.DocumentDirectoryPath, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      
      // loaded successfully, play      
      music.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          // Release the audio player resource
          music.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.handlePlay}
          title="Play"
          color="#841584"
          accessibilityLabel="Play recording" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
