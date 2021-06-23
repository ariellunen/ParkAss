import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput,
} from 'react-native';
import ENV from '../env';
import Colors from '../constants/Colors';

const PlaceInput = (props) => {
  const [destinationInput, setDestentionInput] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [predictions, setPredictions] = useState([]);

    const handleSearch = async (placeId) => {
        console.log(placeId);
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&radius=10000&key=${ENV.googleApiKey}`;
        try {
          const result = await fetch(apiUrl);
          console.log("result", result)
          const search_results = await result.json();
          console.log('search_results', search_results);
          setPickedLocation({
            latitude: search_results.result.geometry.location.lat,
            longitude: search_results.result.geometry.location.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          });
          props.handleSearchResult(search_results)
        } catch (err) {
          console.log("error")
        }
    }

    useEffect(() => {
    },[props])

    const onChangeTextInput = async (input) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ENV.googleApiKey}&input=${input}&location=${props.pickedLocation.latitude},${props.pickedLocation.latitude}&radius=2000`;
        try {
          const result = await fetch(apiUrl);
          const json = await result.json();
          console.log('json', json);
          setPredictions(json.predictions)
        } catch (err) {
          console.log("error")
        }
    }


    return (
        <View>
            <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Search"
                style={styles.desInput}
                value={destinationInput}
                onChangeText={input => {
                    setDestentionInput(input)
                    onChangeTextInput(input)
                }}
            />
            {predictions?.map(prediction => (
                <TouchableOpacity
                    key={prediction.id}
                    onPress={() => {
                        setDestentionInput(prediction.structured_formatting.main_text)
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
    )

}

const styles = StyleSheet.create({
    second: {
        color: '#777'
    },
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    },
    desInput: {
        height: 40,
        borderWidth: 0.5,
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white'
    },
    suggestions: {
        backgroundColor: 'white',
        padding: 15,
        borderTopWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
    },
    main: {
        color: 'black',
    }
});

export default PlaceInput;