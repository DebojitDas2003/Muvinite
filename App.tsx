import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from './SplashScreenView';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SearchScreen from './src/screens/SearchScreen';

const App: React.FC = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 4850);
    return () => clearTimeout(timer);
  }, []);

  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  const SearchStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  const NetflixDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#E50914',
      background: '#000000',
      card: '#141414',
      text: '#FFFFFF',
      border: '#141414',
    },
  };

  const MainApp = () => (
    <NavigationContainer theme={NetflixDarkTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#141414',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#E50914',
          tabBarInactiveTintColor: '#FFFFFF',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="magnify" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  return <>{isShowSplash ? <SplashScreen /> : <MainApp />}</>;
};

export default App;
