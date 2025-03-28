import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';  // изменено
import { enableScreens } from 'react-native-screens';
enableScreens();


import Dashboard from './dashboard';
import Profile from './pages/Profile';
import Tournaments from './pages/Tournaments';
import Registration from './pages/Registration';
import Business from './pages/Business';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>  
      <NavigationContainer>
      <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === 'Dashboard') {
                          iconName = focused ? 'home' : 'home-outline';
                      } else if (route.name === 'Profile') {
                          iconName = focused ? 'person' : 'person-outline';
                      } else if (route.name === 'Tournaments') {
                          iconName = focused ? 'basketball' : 'basketball-outline';
                      } else if (route.name === 'Registration') {
                          iconName = focused ? 'add-circle' : 'add-circle-outline';
                      } else if (route.name === 'Business') {
                          iconName = focused ? 'briefcase' : 'briefcase-outline';
                      }
                      return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: { 
                      height: 70,  // Увеличиваем высоту панели
                      paddingBottom: 10,  // Отступ снизу
                  }
              })}
          >
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Tournaments" component={Tournaments} />
          <Tab.Screen name="Registration" component={Registration} />
          <Tab.Screen name="Business" component={Business} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
