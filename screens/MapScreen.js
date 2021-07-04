import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import FullMapScreen from './FullMapScreen';
import PlaceInput from '../components/PlaceInput';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as reportActions from '../store/action/report';
import PropTypes from 'prop-types';

const MapScreen = (props) => {
  const dispatch = useDispatch();
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const defultRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  useEffect(() => {
    async function fetchData() {
      const result = await Location.requestForegroundPermissionsAsync();
      if (result.status !== 'granted') {
        setPickedLocation(defultRegion);
      }
      getLocationHandler();
    }
    fetchData();
  }, []);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    } catch (err) {
      console.log(err);
      setPickedLocation(defultRegion);
      Alert.alert('Could not fetch location!', 'Please try again later or search your location', [
        { text: 'Okay' },
      ]);
    }
  };
  if (!isFetching && pickedLocation !== undefined) {
    return <ActivityIndicator size="large" color={Colors.primary} style={styles.view} />;
  }
  const handleSearchResult = (search_results) => {
    setPickedLocation({
      latitude: search_results.result.geometry.location.lat,
      longitude: search_results.result.geometry.location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };
  const handleSaveLocation = () => {
    if (pickedLocation === undefined) {
      Alert.alert('לא נבחר מיקום', [{ text: 'Okay' }]);
    } else {
      const location = {
        lat: pickedLocation.latitude,
        lng: pickedLocation.longitude,
      };
      dispatch(reportActions.addLocation(location));
      props.navigation.navigate('Details');
    }
  };
  return (
    <View style={styles.view}>
      <FullMapScreen pickedLocation={pickedLocation} />
      <PlaceInput handleSearchResult={handleSearchResult} pickedLocation={pickedLocation} />
      <IconButton
        icon="plus"
        size={40}
        color="white"
        title="Add"
        onPress={handleSaveLocation}
        style={styles.add}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  add: {
    backgroundColor: 'lightskyblue',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
  },
});
MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default MapScreen;
