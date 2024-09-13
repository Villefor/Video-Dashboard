// screens/VideoDetailScreen.tsx
import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { useFetchVideoId } from '../hooks/useFetchVideoId';
import { LikeButton } from '../components/LikeButton';
import { Description } from '../components/VideoDescription';

const VideoDetailScreen = () => {
  const { videoId } = useLocalSearchParams(); 
  const { video, loading, likes, setLikes, views } = useFetchVideoId(videoId as string);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!video) {
    return (
      <View style={styles.container}>
        <Text>Video not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: video.hls_path }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{video.title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer} >
          <Text style={styles.viewsText}>Visualizações: {views}</Text>
          <LikeButton videoId={video.id} likes={likes} setLikes={setLikes} />
        </View>
        <View style={styles.descriptionContainer}>
          <Description description={video.description} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  titleContainer: {
    marginBottom: '5%',
  },
  infoContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  video: {
    width: '90%',
    height: 300,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  viewsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionToggle: {
    fontSize: 16,
    color: '#1E90FF',
    // marginVertical: 10,
  },
  descriptionContainer: {
    flexDirection: 'column',
    marginTop: '5%',

  },
  descriptionText: {
    fontSize: 18,
  },
});

export default VideoDetailScreen;
