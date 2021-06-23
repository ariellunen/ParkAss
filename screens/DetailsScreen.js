import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as reportActions from '../store/action/report';
import { Card, IconButton, Avatar } from 'react-native-paper';

import {
    View,
    Image,
    Text,
    StyleSheet,
    TextInput,

} from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="parking" backgroundColor="lightskyblue" />

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
        dispatch(reportActions.createReport(text, image, address, lat, lng));
        props.navigation.navigate('Home');
    }

    const deleteHandler = () => {
        props.navigation.navigate('Home');
    }

    return (
        <View style={styles.body}>
            <View style={{ backgroundColor: 'lightskyblue', width: '100%', height: 190 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30, color: 'white' }}>פרטי האירוע</Text>
            </View>
            <Card style={styles.card}>
                <Card.Title title="טופס תלונה" subtitle="הוסף תיאור לאירוע" left={LeftContent} style={{ backgroundColor: 'aliceblue', width: '100%', height: 100, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                <View style={styles.SingleCard}>
                    <Image style={styles.image} source={{ uri: image }} />
                    <Text style={styles.location}>{address}</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                    />
                    <View style={styles.SingleButton}>
                        <View style={styles.Button}>
                            <View style={{ backgroundColor: 'lightblue', borderRadius: 70 }}>
                                <IconButton
                                    icon="check"
                                    size={30}
                                    color="white"
                                    title="Save Report"
                                    onPress={descriptionHandler}
                                />
                            </View>
                            <Text style={styles.paragraph}>שמור דיווח</Text>
                        </View>
                        <View style={styles.Button}>
                            <View style={{ backgroundColor: 'salmon', borderRadius: 70 }}>
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
    )
}

const styles = StyleSheet.create({
    SingleCard: {
        alignItems: 'center',
        height: '90%',
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
    }
});


export default DetailsScreen;