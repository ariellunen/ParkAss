import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/action/auth';

import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MyReportsScreen from '../screens/MyReportsScreen';
import UserReports from '../screens/UserReportScreen';
import FullMap, {fullMapOption as fullMapOption} from '../screens/FullMapScreen';
import Colors from '../constants/Colors';
import MapScreen from '../screens/MapScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ImagePicker from '../components/ImagePicker';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ReportStackNavigatior = createStackNavigator();

export const ReportStackNavigation = () => {
  return (
    <ReportStackNavigatior.Navigator>
      <ReportStackNavigatior.Screen 
        name="Reports"
        component={UserReports}
      />
    </ReportStackNavigatior.Navigator>
  )
}

export const ParkAssDrawer = () => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <Drawer.Screen name="Home" component={ParkAssNavigation} />
      <Drawer.Screen name="Reports" component={ReportStackNavigation} />
    </Drawer.Navigator>
  )
}

export const ParkAssNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ParkAss', headerLeft: null }}/>
        <Stack.Screen name="Camera" component={ImagePicker} options={{ title: 'Camera', headerLeft: null }}/>
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map', headerLeft: null }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details', headerLeft: null }}/>
        <Stack.Screen name="FullMap" component={FullMap} options={fullMapOption} />
        <Stack.Screen name="Reports" component={MyReportsScreen} options={{ title: 'My Report', headerLeft: null }} />
      </Stack.Navigator>
  );
}
