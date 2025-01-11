import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
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
    movie: Show['show'];
  };
  SearchScreen: undefined;
};

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetailsScreen'
>;

const topSearches = [
  'All That',
  'All Souls',
  'All Rise',
  'All Night',
  'All Saints',
];

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

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
        <Text style={styles.summary} numberOfLines={3}>
          {item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '') ||
            'No summary available.'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie..."
          placeholderTextColor="#b0b0b0"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.topSearchesContainer}>
        <Text style={styles.sectionTitle}>Top Searches</Text>
        <View style={styles.topSearches}>
          {topSearches.map((term, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topSearchButton}
              onPress={() => {
                setSearchTerm(term);
                handleSearch();
              }}>
              <Text style={styles.topSearchText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.show.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#1c1c1c',
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
  },
  topSearchesContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  topSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 40,
  },
  topSearchButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  topSearchText: {
    color: '#fff',
  },
  loader: {
    marginTop: 20,
  },
  listContainer: {
    padding: 10,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    color: '#b0b0b0',
  },
});
