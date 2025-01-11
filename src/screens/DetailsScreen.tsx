import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

interface Show {
  id: number;
  name: string;
  image: {original: string} | null;
  summary: string;
  genres: string[];
  language: string;
  rating: {average: number | null};
  premiered: string;
  status: string;
}

type RouteParams = {
  DetailsScreen: {
    movie: Show;
  };
};

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

const DetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'DetailsScreen'>>();
  const {movie} = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Movie Image */}
      <Image
        source={{
          uri: movie.image?.original || 'https://via.placeholder.co',
        }}
        style={styles.image}
      />

      {/* Movie Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.name}</Text>

        {/* Movie Summary */}
        <Text style={styles.summary}>
          {movie.summary?.replace(/<\/?[^>]+(>|$)/g, '') ||
            'No summary available.'}
        </Text>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Genres: </Text>
            {movie.genres.join(', ') || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Language: </Text>
            {movie.language || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Rating: </Text>
            {movie.rating.average || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Premiered: </Text>
            {movie.premiered || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Status: </Text>
            {movie.status || 'N/A'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});
