// import React, { useState, useEffect } from 'react';
// import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';
// import Colors from '../constants/Colors';
// import MapPreview from '../components/MapPreview';

// const MapScreen = props => {
//   console.log("Map screen", props.route.params);

//   const [isFetching, setIsFetching] = useState(false);
//   const [pickedLocation, setPickedLocation] = useState();

//   const mapPickedLocation = props.route.params?.savePickedLocationHandler;

//   useEffect(() => {
//     if(mapPickedLocation){
//       setPickedLocation(mapPickedLocation);
//     }
//   },[mapPickedLocation]);

//   const verifyPermissions = async () => {
//     const result = await Location.requestForegroundPermissionsAsync();
//     if (result.status !== 'granted') {
//       Alert.alert(
//         'Insufficient permissions!',
//         'You need to grant location permissions to use this app.',
//         [{ text: 'Okay' }]
//       );
//       return false;
//     }
//     return true;
//   };

//   const getLocationHandler = async () => {
//     const hasPermission = await verifyPermissions();
//     if (!hasPermission) {
//       return;
//     }
//     try {
//       setIsFetching(true);
//       const location = await Location.getCurrentPositionAsync({
//         timeout: 5000
//       });
//       setPickedLocation({
//         lat: location.coords.latitude,
//         lng: location.coords.longitude
//       });
//     } catch (err) {
//       Alert.alert(
//         'Could not fetch location!',
//         'Please try again later or pick a location on the map.',
//         [{ text: 'Okay' }]
//       );
//     }
//     setIsFetching(false);
//   };

//   const pickOnMapHandler = () =>{
//     props.navigation.navigate('FullMap');
//   };

//   return (
//     <View style={styles.locationPicker}>
//       <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
//         {isFetching ? (
//           <ActivityIndicator size="large" color={Colors.primary} />
//         ) : (
//           <Text>No location chosen yet!</Text>
//         )}
//       </MapPreview>
//       <View style={styles.actions}>
//         <Button
//           title="Get User Location"
//           color={Colors.primary}
//           onPress={getLocationHandler}
//         />
//         <Button 
//           title="Pick on map"
//           color={Colors.primary}
//           onPress={pickOnMapHandler}
//         />
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   locationPicker: {
//     marginBottom: 15
//   },
//   mapPreview: {
//     marginBottom: 10,
//     width: '100%',
//     height: 150,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   actions:{
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width:'100%'
//   }
// });

// export default MapScreen;

import { Card, Avatar, IconButton } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import { useDispatch } from 'react-redux';
import * as reportActions from '../store/action/report';
import { useSelector } from 'react-redux';
// import { red100 } from 'react-native-paper/lib/typescript/styles/colors';
// import '../components/UI/Card.js';


const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const mapPickedLocation = props.route.params?.pickedLocation;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      console.log("pickedLocation - ", mapPickedLocation)
      // onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  // const locationPickedHandler = useCallback(location => {
  //   setSelectedLocation(location);
  // }, []);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();;
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      // props.onLocationPicked({
      //   lat: location.coords.latitude,
      //   lng: location.coords.longitude
      // });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('FullMap');
  };

  const dispatch = useDispatch();


  const saveLocationHandler = () => {
    dispatch(reportActions.addLocation(pickedLocation));

    props.navigation.navigate('Details');
  }

  return (
    <View style={styles.locationPicker}>
      <Text style={styles.h1}>בחר את מיקום האירוע</Text>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>עדיין לא נבחר מיקום!</Text>
        )}
      </MapPreview>

      <View style={styles.SingleCard}>
        <View style={{ backgroundColor: 'darkseagreen', borderRadius: 70 }}>
          <IconButton
            icon="map-marker"
            size={50}
            color="white"
            title="Get User Location"
            onPress={getLocationHandler}
          />
        </View>
        <Text style={styles.paragraph}>מצא מיקום</Text>
      </View>
      <View style={styles.SingleCard}>
        <View style={{ backgroundColor: 'lightcoral', borderRadius: 70 }}>
          <IconButton
            icon="fullscreen"
            size={50}
            color="white"
            title="Pick on Map"
            onPress={pickOnMapHandler}
          />
        </View>
        <Text style={styles.paragraph}>הגדל מפה</Text>
      </View>
      <View style={styles.SingleCard}>
        <View style={{ backgroundColor: 'lightblue', borderRadius: 70 }}>
          <IconButton
            // icon="check"
            icon="pin"
            size={50}
            color="white"
            title="Save Location"
            onPress={saveLocationHandler}
          />
        </View>
        <Text style={styles.paragraph}>שמור מיקום</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  mapPreview: {
    marginBottom: 10,
    width: '98%',
    height: '40%',
    borderColor: '#ccc',
    borderWidth: 2,
    marginTop: 30,
  },
  SingleCard: {
    height: Dimensions.get("window").height * 0.13,
    width: Dimensions.get("window").width * 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  paragraph: {
    fontSize: 18,
    color: 'black',
  },
  h1: {
    fontSize: 25,
    color: 'black',
    marginTop: 15,
  }
});

export default LocationPicker;
