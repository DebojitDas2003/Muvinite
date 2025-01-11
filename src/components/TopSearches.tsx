import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface TopSearchesProps {
  onSelectSearch: (term: string) => void;
}

const topSearches = [
  'Stranger Things',
  'The Crown',
  'Bridgerton',
  'Money Heist',
  'The Witcher',
  'Ozark',
  'Narcos',
  'Black Mirror',
];

const TopSearches: React.FC<TopSearchesProps> = ({onSelectSearch}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Popular Searches</Text>
      {topSearches.map((term, index) => (
        <TouchableOpacity
          key={index}
          style={styles.searchItem}
          onPress={() => onSelectSearch(term)}>
          <Ionicons
            name="trending-up"
            size={24}
            color="#b0b0b0"
            style={styles.trendingIcon}
          />
          <Text style={styles.searchText}>{term}</Text>
          <Ionicons
            name="play"
            size={24}
            color="#b0b0b0"
            style={styles.playIcon}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2f2f2f',
  },
  trendingIcon: {
    marginRight: 15,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  playIcon: {
    marginLeft: 15,
  },
});

export default TopSearches;
