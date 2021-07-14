import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as reportActions from '../store/action/report';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';
import Background from '../components/Background';
require('firebase/database');
require('firebase/auth');
require('firebase/storage');
const HomeScreen = (props) => {
  const [fetch, setFetch] = useState(false);
  const selector = useSelector((state) => state.auth);
  console.log('selector', selector);
  const dispatch = useDispatch();
  const verifyPermissions = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }],
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });
    setFetch(true);
    dispatch(reportActions.addImage(image.uri));
    props.navigation.navigate('Map');
  };

  if (fetch) {
    return <ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image source={require('../assets/logo11.png')} style={styles.logo} />
        <Image source={require('../assets/camera1.png')} style={styles.circles} />
        <Image source={require('../assets/location1.png')} style={styles.circles} />
        <Image source={require('../assets/report1.png')} style={styles.circles} />
        <TouchableOpacity onPress={takeImageHandler} style={styles.firstBut}>
          <View style={styles.button}>
            <Text style={styles.textButton}>התחל דיווח</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Reports');
          }}
        >
          <View style={styles.button}>
            <Text style={styles.textButton}>דיווחים אחרונים</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  firstBut: {
    marginTop: 65,
  },
  button: {
    bottom: 30,
    backgroundColor: '#000',
    opacity: 0.3,
    width: '85%',
    borderRadius: 15,
    height: 50,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textButton: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 55,
  },
  container: {
    flex: 1,
    alignContent: 'center',
  },
  circles: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
HomeScreen.propTypes = {
  navigation: PropTypes.object,
};
export default HomeScreen;
