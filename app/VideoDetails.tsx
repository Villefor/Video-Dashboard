import React, { useEffect, useState, useRef } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator, Image, StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { baseURL } from '../constants/BaseUrl';
import { useLocalSearchParams } from 'expo-router';

const VideoDetailScreen = () => {
  const { videoId } = useLocalSearchParams(); 
  const [video, setVideo] = useState<any>(null); // Use 'any' since the structure may vary
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    // Fetch video details by videoId
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/videos/${videoId}`);
        const data = await response.json();
        setVideo(data);
        setLikes(data.likes);
        setViews(data.views);
        console.log('Video data:', data.hls_path);

        // Increment views when video data is loaded
        await fetch(`${baseURL}/videos/${videoId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ views: data.views + 1 }),
        });
        setViews(data.views + 1);
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  const handleLike = async () => {
    if (!video) return;

    try {
      await fetch(`${baseURL}/videos/${video.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: likes + 1 }),
      });
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

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
    <>
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: video.hls_path }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        isLooping
        PosterComponent={React.forwardRef<Image, { style: StyleProp<ImageStyle>; source: ImageSourcePropType | undefined; }>((props, ref) => (
          <Image ref={ref} {...props} />
        ))}
      />
      <Text style={styles.title}>{video.title}</Text>
      <Text>{video.description}</Text>
      <Text>Views: {views}</Text>
      <Text>Likes: {likes}</Text>
      <Button title="Like" onPress={handleLike} />
    </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
  },
  video: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
});

export default VideoDetailScreen;
