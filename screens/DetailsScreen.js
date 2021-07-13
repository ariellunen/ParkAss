import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as reportActions from '../store/action/report';
import { Card, IconButton, Avatar } from 'react-native-paper';
import { View, Image, Text, StyleSheet, TextInput, Linking } from 'react-native';
import cityHallNum from '../models/cityHallNum';
import firebase from 'firebase/app';

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="parking" backgroundColor="lightskyblue" />
);

const DetailsScreen = (props) => {
  const selector = useSelector((state) => state.report);
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  useEffect(() => {
    if (selector.image) {
      setImage(selector.image);
    }
    if (selector.address) {
      setAddress(selector.address);
      setLat(selector.lat);
      setLng(selector.lng);
    }
    if (selector.city) {
      setCity(selector.city);
    }
  }, [selector]);

  const dispatch = useDispatch();
  const [text, onChangeText] = useState();

  const uploadmultimedia = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const timestamp = new Date().getTime();
    const imageRef = firebase.storage().ref(`users/Dp/` + timestamp + '/');
    console.log('imageRef', imageRef);
    return imageRef
      .put(blob)
      .then(() => {
        blob.close();
        return imageRef.getDownloadURL();
      })
      .then((dwnldurl) => {
        console.log(dwnldurl);
        saveReportHandler(dwnldurl);
      });
  };

  const saveReportHandler = (dwnldurl) => {
    dispatch(reportActions.createReport(text, image, address, lat, lng));
    console.log(dwnldurl);
    Linking.openURL(`http://api.whatsapp.com/send?phone=972
        ${cityHallNum[city]}
        &text=${dwnldurl}\n`);
    // תיאור - ${text}\n
    // כתובת - ${address}`)
    props.navigation.navigate('Home');
  };

  const deleteHandler = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.body}>
      <View style={styles.viewDet}>
        <Text style={styles.textdet}>פרטי האירוע</Text>
      </View>
      <Card style={styles.card}>
        <Card.Title
          title="טופס תלונה"
          subtitle="הוסף תיאור לאירוע"
          left={LeftContent}
          style={styles.cardTi}
        />
        <View style={styles.SingleCard}>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.location}>{address}</Text>

          <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
          <View style={styles.SingleButton}>
            <View style={styles.Button}>
              <View style={styles.buttonFirst}>
                <IconButton
                  icon="check"
                  size={30}
                  color="white"
                  title="Save Report"
                  onPress={uploadmultimedia}
                />
              </View>
              <Text style={styles.paragraph}>שמור דיווח</Text>
            </View>
            <View style={styles.Button}>
              <View style={styles.button}>
                <IconButton
                  icon="delete"
                  size={30}
                  color="white"
                  title="Save Report"
                  onPress={deleteHandler}
                />
              </View>
              <Text style={styles.paragraph}>מחק דיווח</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  SingleCard: {
    alignItems: 'center',
    height: '90%',
  },
  viewDet: {
    backgroundColor: 'lightskyblue',
    width: '100%',
    height: 190,
  },
  button: {
    backgroundColor: 'salmon',
    borderRadius: 70,
  },
  textdet: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
  },
  buttonFirst: {
    backgroundColor: 'lightblue',
    borderRadius: 70,
  },
  cardTi: {
    backgroundColor: 'aliceblue',
    width: '100%',
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  image: {
    width: '90%',
    height: '30%',
    marginTop: 20,
    borderRadius: 50,
  },
  input: {
    height: '20%',
    width: '90%',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 50,
    textAlign: 'center',
    backgroundColor: 'ghostwhite',
    borderColor: 'ghostwhite',
  },
  location: {
    backgroundColor: 'ghostwhite',
    borderRadius: 50,
    width: '90%',
    height: '5%',
    textAlign: 'center',
    marginTop: 20,
  },
  body: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
  },
  card: {
    backgroundColor: 'white',
    height: '80%',
    marginTop: -100,
    borderRadius: 30,
    width: '80%',
    justifyContent: 'center',
  },
  SingleButton: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '80%',
  },
  Button: {
    alignItems: 'center',
  },
});
DetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default DetailsScreen;
