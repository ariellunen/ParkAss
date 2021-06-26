import {
  View,
  Text,
  Button,
  Linking,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Card, Avatar, IconButton } from "react-native-paper";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../store/action/auth";
import * as ImagePicker from "expo-image-picker";
import * as reportActions from "../store/action/report";
import firebase from "firebase/app";
require("firebase/database");
require("firebase/auth");
require("firebase/storage");
const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="home" backgroundColor="lightskyblue" />
);
const HomeScreen = (props) => {
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
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
    setPickedImage(image.uri);
    uploadmultimedia(image.uri);
  };

  const uploadmultimedia = async (image) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", image, true);
    xhr.send(null);

    var timestamp = new Date().getTime();
    var imageRef = firebase.storage().ref(`users/Dp/` + timestamp + "/");
    console.log(imageRef)
    imageFunc(imageRef, xhr)
  };

  const imageFunc = (imageRef, xhr) => {
    imageRef.put(xhr).then(() =>{
      console.log("dwnldurl")

      return imageRef.getDownloadURL();
    }).then((dwnldurl) => {
      console.log(dwnldurl)
      dispatch(reportActions.addImage(dwnldurl));
      props.navigation.navigate('Map');
    })
  }

  return (
    <ImageBackground
      source={{ uri: "https://i.postimg.cc/J7P1jYZk/image.jpg" }}
      style={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <Card style={styles.card} dir="rtl">
        <Card.Title
          title="מסך הבית"
          subtitle="בחר את הפעולה המתאימה"
          left={LeftContent}
        />
        <View style={styles.all}>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: "darkseagreen", borderRadius: 70 }}>
              <IconButton
                icon="camera"
                size={50}
                color="white"
                title="Camera"
                onPress={takeImageHandler}
              />
            </View>
            <Text style={styles.paragraph}>מצלמה</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: "lightcoral", borderRadius: 70 }}>
              <IconButton
                icon="file"
                size={50}
                color="white"
                title="My Reports"
                onPress={() => {
                  props.navigation.navigate("Reports");
                }}
              />
            </View>
            <Text style={styles.paragraph}>דיווחים קודמים</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: "lightblue", borderRadius: 70 }}>
              <IconButton
                icon="logout"
                size={50}
                color="white"
                title="Logout"
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </View>
            <Text style={styles.paragraph}>יציאה</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: "thistle", borderRadius: 70 }}>
              <IconButton
                icon="phone"
                size={50}
                color="white"
                title="Call the police"
                onPress={() => { }}
              />
            </View>
            <Text style={styles.paragraph}>חיוג למשטרה</Text>
          </View>
        </View>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: "60%",
    borderRadius: 30,
    width: "80%",
    marginTop: "auto",
    marginBottom: "auto",
  },
  all: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  SingleCard: {
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width * 0.4,
    alignItems: "center",
    marginTop: 30,
  },
  paragraph: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
});

export default HomeScreen;
