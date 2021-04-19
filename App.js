import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import Texts from './utils/Texts';
import Toast from 'react-native-toast-message';
import * as Network from 'expo-network';

export default function App() {
  const [appState, setAppState] = useState({
    connection: {
      firstCheck: false,
      active: false
    }
  })

  if (!appState.connection.firstCheck) {
    Network.getNetworkStateAsync().then(state => {
      setAppState({
        connection: {
          active: state.isInternetReachable,
          firstCheck: true
        }
      })
    })

    return (<View></View>)
  }

  // Network is fetched asynchronically, which means it is not
  // immediately available on first render
  if (appState.connection.firstCheck && !appState.connection.active) {
    return (
      <View>
        {Alert.alert(
          Texts.internetProblemTitle(),
          Texts.internetProblemMessage(),
          [{ text: 'OK' }],
          { cancelable: false }
        )}
      </View>
    )
  }

  return (
    <InternetConnectionAlert
      title={Texts.internetProblemTitle()}
      message={Texts.internetProblemMessage()}
    >
      <View style={styles.container}>
        <HomeScreen></HomeScreen>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </InternetConnectionAlert>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
