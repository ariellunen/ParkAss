import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import ENV from '../constants/env';
import PropTypes from 'prop-types';
const PlaceInput = (props) => {
  const [destinationInput, setDestentionInput] = useState('');
  const [predictions, setPredictions] = useState([]);
  const handleSearch = async (placeId) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&radius=10000&key=${ENV.googleApiKey}`;
    try {
      const result = await fetch(apiUrl);
      const search_results = await result.json();
      props.handleSearchResult(search_results);
    } catch (err) {
      console.log('error');
    }
  };
  const onChangeTextInput = async (input) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ENV.googleApiKey}&input=${input}&location=${props.pickedLocation.latitude},${props.pickedLocation.latitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      setPredictions(json.predictions);
    } catch (err) {
      console.log('error');
    }
  };
  return (
    <View>
      <View style={styles.search}>
        <Icon style={styles.searchIcon} name="search" size={30} color="white" />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Search"
          style={styles.desInput}
          value={destinationInput}
          onChangeText={(input) => {
            setDestentionInput(input);
            onChangeTextInput(input);
          }}
        />
      </View>
      {predictions?.map((prediction) => (
        <TouchableOpacity
          key={prediction.id}
          onPress={() => {
            setDestentionInput(prediction.structured_formatting.main_text);
            setPredictions([]);
            handleSearch(prediction.place_id);
          }}
        >
          <View style={styles.suggestions}>
            <Text style={styles.main}>{prediction.structured_formatting.main_text}</Text>
            <Text style={styles.second}>{prediction.structured_formatting.secondary_text}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {predictions.length === 0 && <View></View>}
    </View>
  );
};
const styles = StyleSheet.create({
  searchIcon: {
    marginTop: 50,
    backgroundColor: 'lightskyblue',
    height: 40,
    width: 50,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    marginLeft: 15,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  second: {
    color: '#777',
  },
  desInput: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    height: 40,
    width: '80%',
    marginTop: 50,
    marginRight: 15,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  suggestions: {
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 0.5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0.5,
    borderRadius: 15,
    width: '90%',
  },
  main: {
    color: 'black',
  },
});
PlaceInput.propTypes = {
  handleSearchResult: PropTypes.object.isRequired,
  pickedLocation: PropTypes.object.isRequired,
};
export default PlaceInput;
