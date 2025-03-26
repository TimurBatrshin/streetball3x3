import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './dashboard';
import Profile from './pages/Profile';
import Tournaments from './pages/Tournaments';
import Registration from './pages/Registration';
import Business from './pages/Business';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Tournaments') {
              iconName = focused ? 'basketball' : 'basketball-outline';
            } else if (route.name === 'Registration') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            } else if (route.name === 'Business') {
              iconName = focused ? 'ios-business' : 'ios-business-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Tournaments" component={Tournaments} />
        <Tab.Screen name="Registration" component={Registration} />
        <Tab.Screen name="Business" component={Business} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}