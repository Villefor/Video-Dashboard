import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Video } from '../types';
import { baseURL } from '../constants/BaseUrl';

export const useFetchVideos = (perPage: number) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
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

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        const newDisplayedVideos = videos.slice(0, newPage * perPage);
        setDisplayedVideos(newDisplayedVideos);
        setHasMore(newDisplayedVideos.length < videos.length);
        return newPage;
      });
    }
  }, [hasMore, loading, perPage, videos]);

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, displayedVideos, loading, loadMore, hasMore };
};
