// import React, { useState } from 'react';
// import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useDispatch } from 'react-redux';
// import * as Permissions from 'expo-permissions';
// import * as reportActions from '../store/action/report';
// import {useSelector} from 'react-redux';
// import Colors from '../constants/Colors';

// const ImgPicker = props => {
//   const [pickedImage, setPickedImage] = useState();
//   const dispatch = useDispatch();

//   const verifyPermissions = async () => {
//     const result = await ImagePicker.requestCameraPermissionsAsync();
//     if (result.status !== 'granted') {
//       Alert.alert(
//         'Insufficient permissions!',
//         'You need to grant camera permissions to use this app.',
//         [{ text: 'Okay' }]
//       );
//       return false;
//     }
//     return true;
//   };

//   const takeImageHandler = async () => {
//     const hasPermission = await verifyPermissions();
//     if (!hasPermission) {
//       return;
//     }
//     const image = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       aspect: [16, 9],
//       quality: 0.5
//     });

//     setPickedImage(image.uri);
//     dispatch(reportActions.addImage(image.uri));
//     props.navigation.navigate('Map');
//   };

//   return (
//     // <View style={styles.imagePicker}>
//     //   <View style={styles.imagePreview}>
//     //     {!pickedImage ? (
//     //       <Text>No image picked yet.</Text>
//     //     ) : (
//     //       <Image style={styles.image} source={{ uri: pickedImage }} />
//     //     )}
//     //   </View>
//     //   <Button
//     //     title="Take Image"
//     //     color={Colors.primary}
//     //     onPress={takeImageHandler}
//     //   />
      
//     // </View>
//     <View>
//        <Button
//         title="Take Image"
//         color={Colors.primary}
//         onPress={takeImageHandler}
//       />   
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   imagePicker: {
//     alignItems: 'center',
//     marginBottom: 15
//   },
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     marginBottom: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#ccc',
//     borderWidth: 1
//   },
//   image: {
//     width: '100%',
//     height: '100%'
//   }
// });

// export default ImgPicker;




// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           {/* <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity> */}
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 20,
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//   },
// });




