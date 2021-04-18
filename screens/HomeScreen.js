import * as Location from 'expo-location';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Filters from '../components/Filters';
import Map from '../components/Map';
import * as LocationService from '../services/LocationsService'
import Texts from '../utils/Texts';
import { calculateDistance, showToastMessage } from '../utils/Utils';


const DEFAULT_LOCATION = {
  coords: {
    latitude:-34.61745,
    longitude:-58.36795
  },
};

const UPDATE_INTERVAL = 1000

export default class HomeScreen extends React.Component {
  state = {
    location: null,
    markers: [],
    distance: null,
  }

  componentDidMount() {
    this.getCurrentLocation();

    this.getMarkers()
  }

  getMarkers(filters = {}) {
    LocationService.get(filters).then((markers) => {
      const filteredMarkers = this.filterByDistance(markers, parseInt(filters.distance)); 
      this.setState({ markers: filteredMarkers })
    }).catch((e) => {
      showToastMessage('error', 'Error conexión', 'Hubo un problema con la conección.', 'bottom');
    });
  }

  filterByDistance(markers, maxdistance) {
    if (!maxdistance){
      this.setState({...this.state, distance: null});
      return markers;
    }

    this.setState({...this.state, distance: maxdistance*1000});
    return markers.filter(marker => {
      const {latitude, longitude} = marker.coords;
      const {coords} = this.state.location
      const distance = calculateDistance(latitude, longitude, coords.latitude, coords.longitude);
      return distance <= maxdistance;
    });
  }

  async getCurrentLocation() {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled){
      Alert.alert(
        Texts.enableLocationServicesTitle(),
        Texts.enableLocationServicesMessage(),
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        Texts.permissionNotGrantedTitle(),
        Texts.permissionNotGrantedMessage(),
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: UPDATE_INTERVAL
    }, (newLocation) => {
      this.setState({ location: newLocation })
    })

    this.setState({ location })
  }

  onFilterChange(filters) {
    this.getMarkers(filters)
  }

  render(){
    return (
      <KeyboardAwareScrollView style={{marginTop:20}}>
        <View style={StyleSheet.containerAll}>

          <Filters
            onFiltersChange={newFilters => this.onFilterChange(newFilters)} />

          {this.state.location && (<Map
            currentLocation={this.state.location}
            markersCoordinates={this.state.markers}
            distance={this.state.distance}
          />)}

        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerAll:{
    ...StyleSheet.absoluteFillObject
  }
});
