import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ReportItem = (props) => (
  <TouchableOpacity onPress={props.onSelect} style={styles.reportItem}>
    <Image style={styles.image} source={{ uri: props.image }} />
    <View style={styles.infoContainer}>
      <Text style={styles.address}>{props.address}</Text>
      <Text style={styles.desc}>{props.desc}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  reportItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  address: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  desc: {
    color: '#666',
    fontSize: 16,
  },
});

export default ReportItem;
