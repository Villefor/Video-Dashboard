// components/LikeButton.tsx
import React, { useState, useRef } from 'react';
import { TouchableOpacity, Animated, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { baseURL } from '../constants/BaseUrl';

type LikeButtonProps = {
  videoId: string;
  likes: number;
  setLikes: (newLikes: number) => void;
};

export function LikeButton({ videoId, likes, setLikes }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
        await fetch(`${baseURL}/videos/${videoId}`, {
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

  return (
    <View style={styles.likeContainer}>
      <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <AntDesign name="heart" size={32} color={isLiked ? 'red' : 'gray'} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.likeText}>{likes} Likes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    marginRight: 10,
  },
  likeText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
