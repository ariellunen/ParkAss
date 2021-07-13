import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MyReportsScreen from '../screens/MyReportsScreen';
import FullMap from '../screens/FullMapScreen';
import MapScreen from '../screens/MapScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
const Stack = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator>
    <AuthStackNavigator.Screen
      name="Auth"
      component={AuthScreen}
      options={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
          // position: 'absolute',
          borderTopWidth: 0,
        },
      }}
    />
  </AuthStackNavigator.Navigator>
);
// const ReportStackNavigatior = createStackNavigator();
// export const ReportStackNavigation = () => (
//   <ReportStackNavigatior.Navigator>
//     <ReportStackNavigatior.Screen name="Reports" component={MyReportsScreen} />
//   </ReportStackNavigatior.Navigator>
// );
export const ParkAssNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        borderTopWidth: 0,
      },
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
