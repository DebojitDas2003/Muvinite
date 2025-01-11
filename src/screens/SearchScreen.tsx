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
import Icon from 'react-native-vector-icons/Ionicons';
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
        <Icon name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie or TV show"
          value={searchTerm}
          onChange={e => setSearchTerm(e.nativeEvent.text)}
          onSubmitEditing={handleSearch}
        />
        {searchTerm && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchTerm('');
              setSearchResults([]);
            }}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {!searchResults.length && (
        <View style={styles.topSearchesContainer}>
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
        </View>
      )}

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ff0000" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderMovieItem}
          keyExtractor={item => item.show.id.toString()}
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
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchIcon: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  topSearchesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  topSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topSearchButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
  },
  topSearchText: {
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  listContainer: {
    flexGrow: 1,
    marginBottom: 40,
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
