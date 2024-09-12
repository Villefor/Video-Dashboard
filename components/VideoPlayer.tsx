import React, { useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { StyleSheet, Image, View, StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';

const VideoPlayer = ({ videoUri }: { videoUri: string }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <Video
      ref={videoRef}
      source={{ uri: videoUri }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      style={styles.video}
      onPlaybackStatusUpdate={status => setStatus(() => status)}
      isLooping
      PosterComponent={React.forwardRef<Image, { style: StyleProp<ImageStyle>; source: ImageSourcePropType | undefined; }>((props, ref) => (
        <Image ref={ref} {...props} />
      ))}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '90%',
    height: 300,
  },
});

export default VideoPlayer;
