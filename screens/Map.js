import * as Location from 'expo-location';
import React from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView from 'react-native-maps';

const DEFAULT_LOCATION = {
  coords: {
    latitude:-34.61745,
    longitude:-58.36795
  }
};
const DEFAULT_DELTA = 0.045;

export default class Map extends React.Component {
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

          <View style={styles.filterMenu}>
            <View style={styles.filterContainer}>
              <DropDownPicker
                items={[
                  {label: 'Comuna 1', value: '1' },
                  {label: 'Comuna 2', value: '2' },
                  {label: 'Comuna 3', value: '3' },
                ]} />
            </View>
            <View style={styles.filterContainer}>
              <DropDownPicker
                items={[
                  {label: '1 KM', value: '1' },
                  {label: '5 KM', value: '5' },
                  {label: '10 KM', value: '10' },
                ]} />
            </View>
          </View>

          <MapView 
            style={styles.mapStyle}  
            ref={map => this._map = map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: DEFAULT_DELTA,
              longitudeDelta: DEFAULT_DELTA
            }}>
          </MapView>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  filterMenu: {
    flexDirection: 'row',
    position: 'absolute'
  },
  filterContainer: {
    padding: 10,
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1
  },
  containerAll:{
    ...StyleSheet.absoluteFillObject
  }
});
