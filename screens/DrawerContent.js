import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="map-marker" backgroundColor="lightskyblue" />
);

const DrawerContent = (props) => {
  console.log('route', props.route.params.report);
  const report = props.route.params.report;

  return (
    <Card style={styles.card}>
      <Card.Title
        title="דוח חניה"
        subtitle={report.address}
        left={LeftContent}
        style={{
          alignSelf: 'center',
          backgroundColor: 'aliceblue',
          width: '100%',
          height: 60,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      />
      <View style={styles.addressContainer}>
        <Text style={styles.desc}>{report.desc}</Text>
        <Image source={{ uri: report.imageUrl }} style={styles.image} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 400,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addressContainer: {
    alignItems: 'center',
  },
  desc: {
    color: 'black',
    // textAlign: 'center',
    // marginTop: 20,
    width: '100%',
    backgroundColor: 'yellow',
  },
  image: {
    height: '60%',
    width: '80%',
    borderRadius: 30,
    marginTop: 20,
  },
});
export default DrawerContent;
