import { View, Text, Button, StyleSheet, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/action/auth';
// import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

const LeftContent = props => <Avatar.Icon {...props} icon="home" backgroundColor="lightskyblue" />


const HomeScreen = (props) => {
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: 'red' }}>
    <ImageBackground source={{ uri: 'https://i.postimg.cc/J7P1jYZk/image.jpg' }} style={{ width: '100%', height: '100%', alignItems: 'center' }}>
      <Card style={styles.card}>
        <Card.Title title="מסך הבית" subtitle="בחר את הפעולה המתאימה" left={LeftContent} />
        {/* <Text style={styles.paragraph}>Home Screen</Text> */}
        <View style={styles.all}>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: 'darkseagreen', borderRadius: 70 }}>
              <IconButton
                icon="camera"
                size={50}
                color="white"
                title="Camera"
                onPress={() => { props.navigation.navigate('Camera'); }
                } />
            </View>
            <Text style={styles.paragraph}>מצלמה</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: 'lightcoral', borderRadius: 70 }}>
              <IconButton
                icon="file"
                size={50}
                color="white"
                title="My Reports"
                onPress={() => { props.navigation.navigate('Reports'); }
                } />
            </View>
            <Text style={styles.paragraph}>דיווחים קודמים</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: 'lightblue', borderRadius: 70 }}>
              <IconButton
                icon="logout"
                size={50}
                color="white"
                title="Logout"
                onPress={() => { dispatch(authActions.logout()); }
                } />
            </View>
            <Text style={styles.paragraph}>יציאה</Text>
          </View>
          <View style={styles.SingleCard}>
            <View style={{ backgroundColor: 'thistle', borderRadius: 70 }}>
              <IconButton
                icon="phone"
                size={50}
                color="white"
                title="Call the police"
                onPress={() => { }
                } />
            </View>
            <Text style={styles.paragraph}>חיוג למשטרה</Text>
          </View>
        </View>
      </Card>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    height: '70%',
    marginTop: 100,
    borderRadius: 30,
    width: '80%',
  },
  all: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SingleCard: {
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width * 0.4,
    alignItems: 'center',
    marginTop: 30,
  },
  paragraph: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});

export default HomeScreen;
