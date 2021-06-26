import * as React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Button, Dimensions, TouchableOpacity,ImageBackground, TextInput } from 'react-native';
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
    const openDrawer = React.useCallback(() => setIsVisible(true), []);
    // const closeDrawer = React.useCallback(() => setIsVisible(false), []);

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} >
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} >
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
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
            <MapPreview
                location={{ lat: report.lat, lng: report.lng }}
                style={styles.locationContainer}
            />
            <Button title="פרטים נוספים" onPress={() => bs.current.snapTo(0)} style={{ marginTop: 10 }} />
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
                margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{
                                    uri: report.imageUrl,
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {/* <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  /> */}
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        John Doe
                    </Text>
                </View>
            </Animated.View>
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    paragraph: {
        // fontSize: 10,
        color: 'gainsboro',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#00000042',
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 25,
        right: 0,
    },
    icon: {
        backgroundColor: '#0000005b',
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
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    locationContainer: {
        height: Dimensions.get("window").height * 1.04,
        width: Dimensions.get("window").width,
        position:'absolute'
    },
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

export default ReportDetailScreen;