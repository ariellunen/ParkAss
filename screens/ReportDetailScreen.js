import * as React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Button, Dimensions, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import MapPreview from '../components/MapPreview';
import { IconButton } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { NavigationEvents } from '@react-navigation/compat';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useTheme } from 'react-native-paper';


const ReportDetailScreen = (props) => {
    const { colors } = useTheme();

    console.log("route", props.route.params.report)
    const report = props.route.params.report;
    const { width, height } = Dimensions.get("window");

    let bs = React.createRef();
    const fall = new Animated.Value(1);
    const [isVisible, setIsVisible] = React.useState(true);

    const back = () => {
        props.navigation.navigate('Home');
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center', backgroundColor: 'aliceblue' }}>
                <Text style={styles.panelTitle}>פרטי הדיווח</Text>
                <Text style={styles.panelSubtitle}>{report.address}</Text>
            </View>
            <View style={styles.Details}>
                <Text style={styles.Description}> {report.desc} </Text>
                <Image source={{ uri: report.imageUrl }} style={styles.image} />
            </View>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'lightblue', borderRadius: 70, position: 'absolute', left: 0, marginTop: 40, zIndex: 1 }}>
                <IconButton
                    icon="home"
                    size={30}
                    color="white"
                    title="back home"
                    onPress={back}
                />
            </View>
            <MapPreview
                location={{ lat: report.lat, lng: report.lng }}
                style={styles.locationContainer}
            onPress={() => bs.current.snapTo(1)}
            />
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}>
                <View style={{ alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={styles.button}>
                        <View>
                            <Text style={styles.paragraph}>פרטי הדיווח</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#0000005b',
    },
    header: {
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'aliceblue',
    },
    panelHeader: {
        alignItems: 'center',
        backgroundColor: 'aliceblue',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panel: {
        backgroundColor: '#FFFFFF',
        bottom: 0,
    },
    paragraph: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    panelTitle: {
        fontSize: 27,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#00000042',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: 50,
    },
    Description: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        width: '60%',
    },
    buttonStyle: {
        width: '100%',
        height: 40,
        padding: 10,
        backgroundColor: '#f5821f',
        marginTop: 30,
    },
    buttonTextStyle: {
        color: 'white',
        textAlign: 'center',
    },
    p: {
        width: '100%',
    },

    locationContainer: {
        height: Dimensions.get("window").height * 1.04,
        width: Dimensions.get("window").width,
        position: 'absolute'
    },
    Details: {
        alignItems: 'center',
    },

    image: {
        height: '60%',
        width: '80%',
        borderRadius: 30,
        marginTop: 20,
    },
});

export default ReportDetailScreen;