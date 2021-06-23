import * as React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Button, Dimensions } from 'react-native';
import MapPreview from '../components/MapPreview';
// import Colors from '../constants/Colors';
// import BottonSheets from '../components/BottomSheets';
// import { BottomDrawer } from 'react-native-bottom-drawer-view';
// import DrawerContentt from "./DrawerContent";
// import Drawer from "react-bottom-drawer";
// import Drawer from 'react-native-drawer';
import { IconButton } from 'react-native-paper';
// import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { Icon } from 'react-native-elements'
import { NavigationEvents } from '@react-navigation/compat';




const ReportDetailScreen = (props) => {
    console.log("route", props.route.params.report)
    const report = props.route.params.report;
    const { width, height } = Dimensions.get("window");


    const [isVisible, setIsVisible] = React.useState(true);
    const openDrawer = React.useCallback(() => setIsVisible(true), []);
    // const closeDrawer = React.useCallback(() => setIsVisible(false), []);


    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <MapPreview
                location={{ lat: report.lat, lng: report.lng }}
                style={styles.locationContainer}
            />
            <View style={styles.button}>
                <IconButton
                    icon="upload"
                    size={20}
                    color="gainsboro"
                    title="drawer"
                    onPress={openDrawer}
                    style={styles.icon}
                />
                <Text style={styles.paragraph}>לחץ לפרטים</Text>
            </View>
            {/* <Button onClick={openDrawer} title="ראה פרטי דוח"/> */}
            {/* <Drawer
                    duration={250}
                    hideScrollbars={true}
                    onClose={closeDrawer}
                    isVisible={isVisible}
                >
                    <DrawerContentt />
                </Drawer> */}
        </ScrollView>
    )

}

const styles = StyleSheet.create({
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
    locationContainer: {
        height: Dimensions.get("window").height * 1.04,
        width: Dimensions.get("window").width,
        // width: '100%',
        // height: '90%',
        // marginVertical: 20,
        // maxWidth: 350,
        // justifyContent: 'center',
        // alignItems: 'center',
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        // backgroundColor: 'white',
        // borderRadius: 10
        // zIndex: -1,
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

export default ReportDetailScreen;