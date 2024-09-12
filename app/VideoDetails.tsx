import React, { useEffect, useState, useRef } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator, Image, StyleProp, ImageStyle, ImageSourcePropType, Animated, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { baseURL } from '../constants/BaseUrl';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const VideoDetailScreen = () => {
  const { videoId } = useLocalSearchParams(); 
  const [video, setVideo] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/videos/${videoId}`);
        const data = await response.json();
        setVideo(data);
        setLikes(data.likes);
        setViews(data.views);
        console.log('Video data:', data.hls_path);

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
    if (!isLiked) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      try {
        await fetch(`${baseURL}/videos/${video.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ likes: likes + 1 }),
        });
        setLikes(likes + 1);
        setIsLiked(true);
      } catch (error) {
        console.error('Error updating likes:', error);
      }
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{video.title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.likeContainer}>
          <Text style={styles.viewsText} >Visualizações: {views}</Text>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <AntDesign name="heart" size={32} color={isLiked ? 'red' : 'gray'} />
              </Animated.View>
            </TouchableOpacity>
            <Text style={styles.likeText}>{likes} Likes</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{video.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff', // Background color for the container

    // Box shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Box shadow for Android
    elevation: 5,
  },
  titleContainer: {
    marginBottom: '5%',
  },
  infoContainer: {
    width: '90%',
    padding: 20, // Add some padding for the content inside the container
    backgroundColor: '#fff', // Make the background white
    borderRadius: 10, // Rounded corners
    alignItems: 'flex-start',

    // Box shadow for iOS (optional, if needed)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Box shadow for Android
    elevation: 5,
  },
  likeContainer: {
    width: '100%',
    backgroundColor: '#fff', // Make the background white
    borderRadius: 10, // Rounded corners
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row', 
  },
  descriptionContainer: {
    marginTop: '5%',
  },
  video: {
    width: '90%',
    height: 300,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
  likeButton: {
    flexDirection: 'row',
  },
  likeText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  viewsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
  },
});


export default VideoDetailScreen;
