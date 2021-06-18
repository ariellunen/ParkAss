import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as reportActions from '../store/action/report';
// import Colors from '../constants/Colors';
import { IconButton } from 'react-native-paper';

import {
    View,
    Image,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native';

const DetailsScreen = (props) => {
    const selector = useSelector(state => state.report);
    const [image, setImage] = useState();
    const [address, setAddress] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

    useEffect(() => {
        if (selector.image) {
            setImage(selector.image);
        }
        if (selector.address) {
            setAddress(selector.address);
            setLat(selector.lat);
            setLng(selector.lng)
            console.log("image", image)
            console.log("lll", selector.address)
        }
    }, [selector]);

    const dispatch = useDispatch();
    const [text, onChangeText] = useState();

    const descriptionHandler = () => {
        // dispatch(reportActions.addReport(text));
        dispatch(reportActions.createReport(text, image, address, lat, lng));
        // props.navigation.navigate('Reports');

        // Details
        // console.log("amen")
    }

    return (
        <View style={styles.body}>
            <Image style={styles.image} source={{ uri: image }} />
            <Text>{address}</Text>
            <TextInput
                style={styles.input}
                // placeholder="placeholder"
                onChangeText={onChangeText}
                value={text}
            />
            {/* <Button 
                title="Save Report"
                color={Colors.primary}
                onPress={descriptionHandler}
            /> */}
            <View style={styles.SingleCard}>
                <View style={{ backgroundColor: 'lightblue', borderRadius: 70 }}>
                    <IconButton
                        icon="check"
                        size={50}
                        color="white"
                        title="Save Report"
                        onPress={descriptionHandler}
                    />
                </View>
                <Text style={styles.paragraph}>שמור דיווח</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '90%',
        height: '50%',
        marginTop: 10,
    },
    input: {
        height: 150,
        width: '90%',
        margin: 12,
        borderWidth: 1,
    },
    body: {
        height: '100%',
        alignItems: 'center',
    },
    SingleCard: {
        alignItems: 'center',
        marginTop: 30,
    }
});


export default DetailsScreen;