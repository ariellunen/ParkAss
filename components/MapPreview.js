import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ENV from '../constants/env';
import PropTypes from 'prop-types';

const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=15&size=400x850&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mapPreview: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});
MapPreview.propTypes = {
  location: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};
export default MapPreview;
