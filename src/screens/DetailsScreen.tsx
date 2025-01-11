import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const DetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'DetailsScreen'>>();
  const navigation = useNavigation();
  const {movie} = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Movie Image with Gradient Overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: movie.image?.original || 'https://via.placeholder.com/300',
          }}
          style={styles.image}
        />
        <View style={styles.gradient} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Movie Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.name}</Text>

        {/* Movie Info */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            {movie.premiered?.split('-')[0] || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            {movie.rating.average || 'N/A'} Rating
          </Text>
          <Text style={styles.infoText}>{movie.status || 'N/A'}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play" size={24} color="#000" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myListButton}>
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.myListButtonText}>My List</Text>
          </TouchableOpacity>
        </View>

        {/* Movie Summary */}
        <Text style={styles.summary}>
          {movie.summary?.replace(/<\/?[^>]+(>|$)/g, '') ||
            'No summary available.'}
        </Text>

        {/* Additional Info */}
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Genres: </Text>
            {movie.genres?.join(', ') || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Language: </Text>
            {movie.language || 'N/A'}
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
    backgroundColor: '#000',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#999',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  playButtonText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  myListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  myListButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  summary: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  additionalInfoContainer: {
    marginTop: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#999',
  },
});
