// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reportActions from '../store/action/report';
// import Colors from '../constants/Colors';
// import ReportItem from '../components/ReportItem';
// import { Card } from 'react-native-paper';
// import PropTypes from 'prop-types';
// const MyReportsScreen = (props) => {
// const dispatch = useDispatch();
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState();
// const reports = useSelector((state) => state.report.reportsArr);
// const loadReports = useCallback(async () => {
//   setError(null);
//   setIsLoading(true);
//   try {
//     await dispatch(reportActions.fetchReports());
//   } catch (err) {
//     setError(err.message);
//   }
//   setIsLoading(false);
// }, [dispatch, setIsLoading, setError]);
// useEffect(() => {
//   loadReports();
// }, [dispatch, loadReports]);
// if (error) {
//   return (
//     <View style={styles.NON}>
//       <Text>An error occured!</Text>
//       <Button title="נסה שנית" onPress={loadReports} color={Colors.primary} />
//     </View>
//   );
// }
// if (isLoading) {
//   return (
//     <View style={styles.NON}>
//       <ActivityIndicator size="large" color={Colors.primary} />
//     </View>
//   );
// }
// if (!isLoading && reports?.length === 0) {
//   return (
//     <View style={styles.NON}>
//       <Text>אין דיווחים קודמים!</Text>
//     </View>
//   );
// }
//   return (
//     <View style={styles.all}>
//       <View style={styles.view}>
//         <Text style={styles.text}>דיווחים קודמים</Text>
//       </View>
//       <Card style={styles.card}>
//         <FlatList
//           data={reports}
//           keyExtractor={(item) => item.id}
//           renderItem={(itemData) => (
//             <ReportItem
//               image={itemData.item.imageUrl}
//               address={itemData.item.address}
//               desc={itemData.item.desc}
//               onSelect={() => {
//                 props.navigation.navigate('ReportDetails', {
//                   report: itemData.item,
//                 });
//               }}
//             />
//           )}
//         />
//       </Card>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 40,
//     color: 'white',
//   },
//   view: {
//     backgroundColor: 'lightskyblue',
//     width: '100%',
//     height: 100,
//   },
//   all: {
//     alignItems: 'center',
//   },
//   NON: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: 'white',
//     height: '85%',
//     width: '95%',
//     borderRadius: 30,
//     marginTop: 20,
//   },
// });
// MyReportsScreen.propTypes = {
//   navigation: PropTypes.object,
// };

// export default MyReportsScreen;

// Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import React in our code
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reportActions from '../store/action/report';
// import all the components we are going to use
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Colors from '../constants/Colors';
import Background from '../components/Background';
import MapPreview from '../components/MapPreview';

const MyReportsScreen = () => {
  const [activeSections, setActiveSections] = useState([]);
  const multipleSelect = true;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const reports = useSelector((state) => state.report.reportsArr);
  const loadReports = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(reportActions.fetchReports());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);
  useEffect(() => {
    loadReports();
  }, [dispatch, loadReports]);

  if (error) {
    return (
      <View style={styles.NON}>
        <Text>An error occured!</Text>
        <Button title="נסה שנית" onPress={loadReports} color={Colors.primary} />
      </View>
    );
  }

  if (reports === null) {
    return (
      <View style={styles.NON}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && reports?.length === 0) {
    return (
      <View style={styles.NON}>
        <Text>אין דיווחים קודמים!</Text>
      </View>
    );
  }
  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const renderHeader = (section, _, isActive) => (
    //Accordion Header view
    <Animatable.View
      duration={400}
      style={[styles.header, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor"
    >
      <View style={styles.infoContainer}>
        <Text style={styles.headerText}>{section.address}</Text>
        <View>
          <Text>{section.desc}</Text>
          <Text>{section.date}</Text>
        </View>
        <Image style={styles.image} source={{ uri: section.imageUrl }} />
      </View>
      <View style={styles.border}></View>
    </Animatable.View>
  );
  console.log('reports', reports);
  const renderContent = (section, _, isActive) => (
    <Animatable.View
      duration={400}
      style={[styles.content, isActive ? styles.active : styles.inactive]}
      // transition="backgroundColor"
    >
      <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentcon}>
        <MapPreview
          location={{ lat: section.lat, lng: section.lng }}
          style={styles.locationContainer}
        />
      </Animatable.Text>
    </Animatable.View>
  );
  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView>
            <Accordion
              activeSections={activeSections}
              sections={reports}
              touchableComponent={TouchableOpacity}
              expandMultiple={multipleSelect}
              renderHeader={renderHeader}
              renderContent={renderContent}
              duration={400}
              onChange={setSections}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default MyReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  safeArea: {
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  infoContainer: {
    margin: 10,
    alignItems: 'flex-start',
    position: 'relative',
  },
  border: {
    borderBottomColor: '#E6E9F5',
    borderBottomLeftRadius: 100,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 13,
    right: 5,
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    height: 250,
  },
  contentcon: {
    padding: 10,
  },
  locationContainer: {
    height: 250,
    width: 355,
  },
});
