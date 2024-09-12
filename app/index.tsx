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
  Alert
} from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Video } from '../types';

const HomeScreen = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const baseURL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000';

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
    <TouchableOpacity onPress={() => console.log('Implement navigation passing id for VideoDetails')}>
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
  );

  return (
    <View style={styles.container}>
      {loading && !videos.length ? (
        <ContentLoader
          speed={2}
          width={400}
          height={150}
          viewBox="0 0 400 150"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={styles.loader}
        >
          <Rect x="0" y="0" rx="10" ry="10" width="380" height="120" />
          <Rect x="0" y="130" rx="4" ry="4" width="180" height="20" />
          <Rect x="0" y="160" rx="4" ry="4" width="140" height="20" />
          <Rect x="0" y="190" rx="4" ry="4" width="100" height="20" />
        </ContentLoader>
      ) : (
        <FlatList
          data={displayedVideos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 10,
    elevation: 2 
  },
  thumbnail: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  textContainer: {
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  views: {
    fontSize: 14,
    color: '#666'
  },
  loader: {
    marginVertical: 10
  }
});

export default HomeScreen;
