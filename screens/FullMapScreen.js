import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';
const FullMapScreen = (props) => {
  const [markerCoordinates, setMarkerCoordinates] = useState();
  useEffect(() => {
    if (props.pickedLocation !== undefined) {
      setMarkerCoordinates({
        latitude: props.pickedLocation.latitude,
        longitude: props.pickedLocation.longitude,
      });
    }
  }, [props.pickedLocation]);
  return (
    <MapView style={styles.map} region={props.pickedLocation}>
      {markerCoordinates !== undefined && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};
const styles = StyleSheet.create({
  second: {
    color: '#777',
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
  desInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  suggestions: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  main: {
    color: 'black',
  },
});

export default FullMapScreen;
