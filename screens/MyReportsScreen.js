import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as reportActions from '../store/action/report';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import ReportItem from '../components/ReportItem';
import { Card } from 'react-native-paper';


const MyReportsScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const reports = useSelector(state => state.report.reportsArr);


  const loadReports = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(reportActions.fetchReports());
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    loadReports();
  }, [dispatch, loadReports]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>An error occured!</Text>
        <Button
          title="Try Again"
          onPress={loadReports}
          color={Colors.primary}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && reports?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>אין דיווחים קודמים!</Text>
      </View>
    )
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ backgroundColor: 'lightskyblue', width: '100%', height: 100 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 40, color: 'white' }}>דיווחים קודמים</Text>
      </View>
      <Card style={styles.card}>
      <FlatList
        data={reports}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ReportItem
            image={itemData.item.imageUrl}
            address={itemData.item.address}
            desc={itemData.item.desc}
            onSelect={() => {
              props.navigation.navigate('ReportDetails', {
                report: itemData.item,
              });
            }}
          />
        )}
      />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white', 
    height: '85%', 
    width: '95%',
    borderRadius: 30,
    marginTop: 20,
  },
  ocard: {
    backgroundColor: 'red',
  }
});
export default MyReportsScreen;