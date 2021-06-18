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
import MapPreview from '../components/MapPreview';
import * as reportActions from '../store/action/report';
import Colors from '../constants/Colors';
import {useSelector} from 'react-redux';
import ReportItem from '../components/ReportItem';

const MyReportsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const reports = useSelector(state => state.report.reportsArr);


  const loadReports = useCallback(async() => {
    setError(null);
    setIsLoading(true);
    try{
      await dispatch(reportActions.fetchReports());
    } catch(err) {
      setError(err.message)
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    loadReports();
  }, [dispatch, loadReports]);

  if(error){
    return(
      <View style={{flex:1, justifyContent:'center'}}>
        <Text>An error occured!</Text>
        <Button 
          title="Try Again" 
          onPress={loadReports} 
          color={Colors.primary}
        />
    </View>
    )
  }

  if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center'}}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    )
  }

  if(!isLoading && reports?.length === 0){
    return(
      <View style={{flex:1, justifyContent:'center'}}>
      <Text>אין דיווחים קודמים!</Text>
    </View>
    )
  }

  return(
    <FlatList 
      data={reports}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ReportItem 
          image={itemData.item.imageUrl}
          address={itemData.item.address}
          desc={itemData.item.desc}
          // onSelect={() => {
          //   props.navigation.navigate('PlaceDetail', {
          //     placeTitle: itemData.item.title,
          //     placeId: itemData.item.id
          //   });
          // }}
        />
      )}
    />
  )
}


export default MyReportsScreen;