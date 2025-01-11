import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Video
        source={require('./src/assets/images/video.webm')}
        style={styles.backgroundVideo}
        resizeMode="contain"
        playInBackground={false}
        playWhenInactive={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(150,150,150)'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});