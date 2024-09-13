import React, { useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { StyleSheet, View } from 'react-native';

const VideoPlayer = ({ videoUri, thumbnailUri }: { videoUri: string, thumbnailUri: string }) => {
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
        posterSource={ require('../assets/images/netshowme-logo.png')}
        usePoster
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  video: {
    width: '90%',
    height: 300,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default VideoPlayer;
