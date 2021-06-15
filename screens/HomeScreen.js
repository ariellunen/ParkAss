import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/action/auth';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button style={styles.button} title="Camera" onPress={() => {
        // dispatch(authActions.logout());
        props.navigation.navigate('Camera');
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex:1,
  }
})

export default HomeScreen;
