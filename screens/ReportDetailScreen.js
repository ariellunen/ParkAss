import * as React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapPreview from '../components/MapPreview';
import { IconButton } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
const ReportDetailScreen = (props) => {
  console.log('route', props.route.params.report);
  const report = props.route.params.report;
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const back = () => {
    props.navigation.navigate('Home');
  };
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.rendInder}>
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
    <View style={styles.viewCon}>
      <View style={styles.view}>
        <IconButton icon="home" size={30} color="white" title="back home" onPress={back} />
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
        enabledGestureInteraction
      />
      <Animated.View style={styles.animatedcont}>
        <View style={styles.animated}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={styles.button}>
            <View>
              <Text style={styles.paragraph}>פרטי הדיווח</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  animatedcont: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  rendInder: {
    alignItems: 'center',
    backgroundColor: 'aliceblue',
  },
  animated: {
    alignItems: 'center',
  },
  view: {
    backgroundColor: 'lightblue',
    borderRadius: 70,
    position: 'absolute',
    left: 0,
    marginTop: 40,
    zIndex: 1,
  },
  viewCon: {
    flex: 1,
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
  locationContainer: {
    height: Dimensions.get('window').height * 1.04,
    width: Dimensions.get('window').width,
    position: 'absolute',
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
