import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/action/auth';

import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MyReportsScreen from '../screens/MyReportsScreen';
import FullMap from '../screens/FullMapScreen';
import Colors from '../constants/Colors';
import MapScreen from '../screens/MapScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator>
    <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
  </AuthStackNavigator.Navigator>
);

const ReportStackNavigatior = createStackNavigator();

export const ReportStackNavigation = () => (
  <ReportStackNavigatior.Navigator>
    <ReportStackNavigatior.Screen name="Reports" component={MyReportsScreen} />
  </ReportStackNavigatior.Navigator>
);

export const ParkAssNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Map" component={MapScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="FullMap" component={FullMap} />
    <Stack.Screen name="Reports" component={MyReportsScreen} />
    <Stack.Screen name="ReportDetails" component={ReportDetailScreen} />
  </Stack.Navigator>
);
