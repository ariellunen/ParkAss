import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
  Dimensions,
  Image,
} from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as reportActions from '../store/action/report';
import * as authActions from '../store/action/auth';
import Colors from '../constants/Colors';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import Background from '../components/Background';
import { TouchableOpacity } from 'react-native';
require('firebase/database');
require('firebase/auth');
require('firebase/storage');
const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="home" backgroundColor="lightskyblue" />
);
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
      base64: true,
    });
    setFetch(true);
    // uploadmultimedia(image.uri);
    dispatch(reportActions.addImage(image.uri));
    props.navigation.navigate('Map');
  };

  if (fetch) {
    return <ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />;
  }

  return (
    <Background>
      {/* <Card style={styles.card} dir="rtl">
        <Card.Title title="מסך הבית" subtitle="בחר את הפעולה המתאימה" left={LeftContent} />
        <View style={styles.all}>
          <View style={styles.SingleCard}>
            <View style={styles.camera}>
              <IconButton
                icon="camera"
                size={50}
                color="white"
                title="Camera"
                onPress={takeImageHandler}
              />
            </View>
            <Text style={styles.paragraph}>מצחחחלמה</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={styles.singlecardfirst}>
              <IconButton
                icon="file"
                size={50}
                color="white"
                title="My Reports"
                onPress={() => {
                  props.navigation.navigate('Reports');
                }}
              />
            </View>
            <Text style={styles.paragraph}>דיווחים קודמים</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={styles.singlecardview}>
              <IconButton
                icon="logout"
                size={50}
                color="white"
                title="Logout"
                onPress={() => {
                  firebase.auth().signOut();
                  dispatch(authActions.logout());

                }}
              />
            </View>
            <Text style={styles.paragraph}>יציאה</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={styles.single}>
              <IconButton
                icon="phone"
                size={50}
                color="white"
                title="Call the police"
                onPress={() => {
                  const url = 'tel://100';
                  Linking.openURL(url);
                }}
              />
            </View>
            <Text style={styles.paragraph}>חיוג למשטרה</Text>
          </View>
        </View>
      </Card> */}
      <View style={styles.container}>
        <Image source={require('../assets/logoSmall.png')} style={styles.logo} />

        {/* <Image source={require('../assets/camera1.png')} style={styles.circles} />
        <Image source={require('../assets/location1.png')} style={styles.circles} />
        <Image source={require('../assets/report1.png')} style={styles.circles} /> */}
        <TouchableOpacity style={styles.squareFir}>
          <View style={styles.viewFi}>
            <Text style={styles.text}>התחל\י דיווח</Text>
          </View> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareSec}>
          <View>
            <Text style={styles.text}>דיווחים קודמים</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  viewFi: {
    marginTop: 25,
  },
  squareFir: {
    width: "80%",
    height: "30%",
    backgroundColor: "#EEECE0",
    opacity: 0.5,
    marginTop: 55,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    color: 'black',
  },
  squareSec: {
    width: "80%",
    height: "30%",
    backgroundColor: "#EEECE0",
    // opacity: 0.5,
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    // textAlign: 'center',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    marginBottom: 25,
    width: "50%",
    height: 35,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    // position: 'relative',
  },
  circles: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text:{
    // direction: 'rtl',
    // marginLeft: 25,
    // marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    opacity: 1,
    // flexDirection: 'row',
    // margin: 'auto',
  },

  // card: {
  //   backgroundColor: 'white',
  //   height: '60%',
  //   borderRadius: 30,
  //   width: '80%',
  //   marginTop: 'auto',
  //   marginBottom: 'auto',
  // },
  // singlecardview: {
  //   backgroundColor: 'lightblue',
  //   borderRadius: 70,
  // },
  // singlecardfirst: {
  //   backgroundColor: 'lightcoral',
  //   borderRadius: 70,
  // },
  // all: {
  //   marginTop: 50,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  // },
  // camera: {
  //   backgroundColor: 'darkseagreen',
  //   borderRadius: 70,
  // },
  // SingleCard: {
  //   height: Dimensions.get('window').height * 0.2,
  //   width: Dimensions.get('window').width * 0.4,
  //   alignItems: 'center',
  //   marginTop: 30,
  // },
  // single: {
  //   backgroundColor: 'thistle',
  //   borderRadius: 70,
  // },
  // paragraph: {
  //   fontSize: 15,
  //   color: 'black',
  //   textAlign: 'center',
  // },
  // activity: {
  //   flex: 1,
  // },
});
HomeScreen.propTypes = {
  navigation: PropTypes.object,
};
export default HomeScreen;
