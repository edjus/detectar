import React from 'react';
import { Alert, StyleSheet, View , Dimensions, Text} from 'react-native';
import  MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';

const DEFAULT_LOCATION = {
  coords: {
    latitude:-34.61745,
    longitude:-58.36795
  }
};
const DEFAULT_DELTA = 0.045;

export default class  Map extends React.Component {
  state = {
    location:DEFAULT_LOCATION
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled){
      Alert.alert(
        'Enable your location service.',
        'This app requires location services.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    this.setState({ location })
  }

  render(){
    return (
       <KeyboardAwareScrollView style={{marginTop:20}}>
        <View style={StyleSheet.containerAll}>
          <MapView 
            style={styles.mapStyle}  
            ref={map => this._map = map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: DEFAULT_DELTA,
              longitudeDelta: DEFAULT_DELTA
            }}
          > 
          </MapView>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerAll:{
    ...StyleSheet.absoluteFillObject
  }
});
