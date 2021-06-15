import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import * as reportActions from '../store/action/report';
import Colors from '../constants/Colors';
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

    useEffect(() => {
        if(selector.image){
            setImage(selector.image);
        }
        if(selector.address){
            setAddress(selector.address);
            console.log("lll",selector.address)
        }
    },[selector]);

    const dispatch = useDispatch();
    const [text, onChangeText] = useState();

    const descriptionHandler = () => {
        // dispatch(reportActions.addDescription(text));
        dispatch(reportActions.addReport(text));
    }

    return(
        <ScrollView>
            <Image style={styles.image} source={{ uri: image }} />
            <Text>{address}</Text>
            <TextInput 
                style={styles.input}
                placeholder="placeholder"
                onChangeText={onChangeText}
                value={text}
            />
            <Button 
                title="Save Report"
                color={Colors.primary}
                onPress={descriptionHandler}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '70%',
        height: '70%'
    },
    input: {
        height: 80,
        margin: 12,
        borderWidth: 1,
    },
});
  

export default DetailsScreen;