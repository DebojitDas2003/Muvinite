import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Show {
  show: {
    id: number;
    name: string;
    image: {medium: string} | null;
    summary: string;
  };
}

type RootStackParamList = {
  DetailsScreen: {
    movie: {
      id: number;
      name: string;
      image: {medium: string} | null;
      summary: string;
    };
  };
  SearchScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetailsScreen'
>;

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<FlatList<Show>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % movies.length;
          carouselRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  const shuffleMovies = (movies: Show[]) => {
    return [...movies].sort(() => Math.random() - 0.5);
  };

  const renderFeaturedItem = ({item}: {item: Show}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailsScreen', {
          movie: item.show,
        })
      }
      style={styles.featuredContent}>
      <Image
        source={{
          uri: item.show.image?.medium || 'https://via.placeholder.com/600x300',
        }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredTitle}>{item.show.name}</Text>
        <Text style={styles.featuredSummary} numberOfLines={3}>
          {item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '') ||
            'No summary available.'}
        </Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() =>
            navigation.navigate('DetailsScreen', {
              movie: item.show,
            })
          }>
          <Text style={styles.playButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderMovieItem = ({item}: {item: Show}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailsScreen', {
          movie: item.show,
        })
      }
      style={styles.card}>
      <Image
        source={{
          uri: item.show.image?.medium || 'https://via.placeholder.com/150',
        }}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.show.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MUVINITE</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.searchButton}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={movies}
            keyExtractor={item => item.show.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderFeaturedItem}
            ref={carouselRef}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              setCurrentIndex(index);
            }}
          />
        )}
      </View>

      <View style={styles.rowsContainer}>
        <Text style={styles.rowTitle}>Trending Now</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={movies}
            keyExtractor={item => item.show.id.toString()}
            horizontal
            renderItem={renderMovieItem}
            contentContainerStyle={styles.rowList}
            showsHorizontalScrollIndicator={false}
          />
        )}

        <Text style={styles.rowTitle}>Must Watch</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={shuffleMovies(movies)}
            keyExtractor={item => item.show.id.toString()}
            horizontal
            renderItem={renderMovieItem}
            contentContainerStyle={styles.rowList}
            showsHorizontalScrollIndicator={false}
          />
        )}

        <Text style={styles.rowTitle}>Movies You May Have Heard Of</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={shuffleMovies(movies)}
            keyExtractor={item => item.show.id.toString()}
            horizontal
            renderItem={renderMovieItem}
            contentContainerStyle={styles.rowList}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 60,
    backgroundColor: '#141414',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  searchText: {
    color: '#fff',
    fontSize: 14,
  },
  featuredContent: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuredSummary: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 8,
  },
  playButton: {
    padding: 12,
    backgroundColor: '#E50914',
    borderRadius: 5,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  rowTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rowList: {
    paddingHorizontal: 8,
  },
  card: {
    width: 120,
    marginRight: 8,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  loader: {
    marginVertical: 20,
  },
});

export default HomeScreen;
