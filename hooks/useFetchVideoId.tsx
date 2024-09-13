import { useEffect, useState } from 'react';
import { baseURL } from '../constants/BaseUrl';

export const useFetchVideoId = (videoId: string) => {
  const [video, setVideo] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<number>(0);
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/videos/${videoId}`);
        const data = await response.json();
        setVideo(data);
        setLikes(data.likes);
        setViews(data.views);

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

  return { video, loading, likes, setLikes, views, setViews };
};
