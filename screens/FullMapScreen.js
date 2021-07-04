import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
FullMapScreen.propTypes = {
  pickedLocation: PropTypes.object,
};
export default FullMapScreen;
