import { View, StyleSheet, Image } from 'react-native';
import Icon from './src/assets/images/icon.png'
import Video from 'react-native-video'

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Video
        source={require('./src/assets/images/video.webm')} // Replace with your video file path
        style={styles.video}
        resizeMode="cover" // Adjust how the video scales
        repeat // Loop the video
        muted // Mute the video
        fullscreen={false} // Disable fullscreen (optional)
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
  image: { width: 100, height: 100, resizeMode: 'cover' }
});
