import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { VideoItem } from '../components/VideoCard';
import { useFetchVideos } from '../hooks/useFetchVideos';

const ITEM_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5625;

const HomeScreen = () => {
  const { displayedVideos, loading, loadMore, hasMore } = useFetchVideos(10);

  return (
    <View style={styles.container}>
      {loading && !displayedVideos.length ? (
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
          renderItem={({ item, index }) => <VideoItem video={item} index={index} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={hasMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
  loader: {
    marginVertical: 10,
  },
  listContent: {
    alignItems: 'center',
  },
});

export default HomeScreen;
