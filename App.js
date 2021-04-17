import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import Texts from './utils/Texts';

export default function App() {
  return (
    <InternetConnectionAlert
      title={Texts.internetProblemTitle()}
      message={Texts.internetProblemMessage()}
    >
      <View style={styles.container}>
        <HomeScreen></HomeScreen>
      </View>
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
