import React, { useEffect, useState, useCallback } from 'react';
import {
  Platform,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Link } from 'expo-router';
import { Video } from '../types';
import { baseURL } from '../constants/BaseUrl';

const { width: screenWidth } = Dimensions.get('window');


const ITEM_WIDTH = screenWidth * 0.8; 
const ITEM_HEIGHT = ITEM_WIDTH * 1.5625; 

const HomeScreen = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${baseURL}/videos`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Video[] = await response.json();
      setVideos(data);
      setHasMore(data.length > 0);
      setDisplayedVideos(data.slice(0, perPage));
    } catch (error) {
      console.error('Error fetching videos:', error);
      Alert.alert('Error', 'Unable to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        const newDisplayedVideos = videos.slice(0, newPage * perPage);
        setDisplayedVideos(newDisplayedVideos);
        setHasMore(newDisplayedVideos.length < videos.length);
        return newPage;
      });
    }
  }, [hasMore, loading, perPage, videos]);

  const renderItem = ({ item }: { item: Video }) => (
    <Link
      href={{
        pathname: '/VideoDetails', 
        params: { videoId: item.id },
      }}
      asChild 
    >
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
          />
          <View style={styles.textContainer}>
            <Text style={styles.views}>Visualizações - {item.views}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      {loading && !videos.length ? (
        <ContentLoader
          speed={2}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT + 80}
          viewBox={`0 0 ${ITEM_WIDTH} ${ITEM_HEIGHT + 80}`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={styles.loader}
        >
          <Rect x="0" y="0" rx="10" ry="10" width={ITEM_WIDTH} height={ITEM_HEIGHT} />
          <Rect x="0" y={ITEM_HEIGHT + 10} rx="4" ry="4" width="80%" height="20" />
          <Rect x="0" y={ITEM_HEIGHT + 40} rx="4" ry="4" width="60%" height="20" />
        </ContentLoader>
      ) : (
        <FlatList
          data={displayedVideos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          contentContainerStyle={styles.listContent} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
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
    alignItems: 'center', 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  views: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    marginVertical: 10,
  },
  listContent: {
    alignItems: 'center', 
  },
});

export default HomeScreen;
