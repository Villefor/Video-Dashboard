import React, { useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { Link } from 'expo-router';
import { Video } from '../types';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5625;

type VideoItemProps = {
  video: Video;
  index: number; 
};

export const VideoItem = ({ video, index }: VideoItemProps) => {
  const translateY = useRef(new Animated.Value(300)).current; 

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0, 
      duration: 500,
      delay: index * 150, 
      useNativeDriver: true, 
    }).start();
  }, [translateY, index]);

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity: translateY.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0]
    })}}>
      <Link
        href={{
          pathname: '/VideoDetails',
          params: { videoId: video.id },
        }}
        asChild
      >
        <TouchableOpacity>
          <View style={styles.itemContainer}>
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.views}>Visualizações - {video.views}</Text>
              <Text style={styles.title}>{video.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: '10%',
    alignItems: 'center',
    width: ITEM_WIDTH,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  textContainer: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  views: {
    fontSize: 14,
    color: '#666',
  },
});
