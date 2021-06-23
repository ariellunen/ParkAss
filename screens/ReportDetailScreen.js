import * as React from 'react';
import { View, Text, ScrollView, Image, StyleSheet  } from 'react-native';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
// import BottonSheets from '../components/BottomSheets';

const ReportDetailScreen = (props) => {
    console.log("route",props.route.params.report)
    const report = props.route.params.report;

    return(
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image source={{uri: report.imageUrl}} style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>
                        {report.address}
                    </Text>
                </View>
                <MapPreview 
                    location={{lat: report.lat, lng: report.lng}} 
                    style={styles.mapPreview}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
      },
      locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
      },
      addressContainer: {
        padding: 20
      },
      address: {
        color: Colors.primary,
        textAlign: 'center'
      },
      mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      }
})

export default ReportDetailScreen;