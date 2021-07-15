import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MyReportsScreen from '../screens/MyReportsScreen';
import FullMap from '../screens/FullMapScreen';
import MapScreen from '../screens/MapScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import * as authActions from '../store/action/auth';
import { useDispatch } from 'react-redux';

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
          borderTopWidth: 0,
        },
      }}
    />
  </AuthStackNavigator.Navigator>
);

export const ParkAssNavigation = (props) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E6E9F5',
          borderTopWidth: 0,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              dispatch(authActions.logout());
            }}
          >
            <Avatar.Image
              size={35}
              source={{ uri: props.image }}
              title="Info"
              color="#fff"
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Home" options={{ headerTitle: false }} component={HomeScreen} />
      <Stack.Screen name="Map" options={{ headerShown: false }} component={MapScreen} />
      <Stack.Screen name="Details" options={{ title: 'פרטי הדוח' }} component={DetailsScreen} />
      <Stack.Screen name="FullMap" options={{ headerTitle: false }} component={FullMap} />
      <Stack.Screen
        name="Reports"
        options={{ title: 'דיווחים אחרונים' }}
        component={MyReportsScreen}
      />
      <Stack.Screen name="ReportDetails" component={ReportDetailScreen} />
    </Stack.Navigator>
  );
};
