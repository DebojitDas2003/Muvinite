import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Show {
  show: {
    id: number;
    name: string;
    image: {medium: string} | null;
    summary: string;
  };
}

interface SearchResultsProps {
  results: Show[];
  navigation: any;
}

const {width} = Dimensions.get('window');

const SearchResults: React.FC<SearchResultsProps> = ({results, navigation}) => {
  const renderMovieItem = ({item}: {item: Show}) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('DetailsScreen', {movie: item.show})}>
      <Image
        source={{
          uri: item.show.image?.medium || 'https://via.placeholder.com/150',
        }}
        style={styles.thumbnail}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '') ||
            'No summary available.'}
        </Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#b0b0b0"
          />
          <Ionicons
            name="play-circle-outline"
            size={24}
            color="#b0b0b0"
            style={styles.playIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={item => item.show.id.toString()}
      renderItem={renderMovieItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#2f2f2f',
  },
  thumbnail: {
    width: width * 0.3,
    height: width * 0.4,
  },
  movieInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    color: '#b0b0b0',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  playIcon: {
    marginLeft: 15,
  },
});

export default SearchResults;
