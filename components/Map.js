import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DEFAULT_DELTA = 0.045;

const renderMarkers = (coordinates) => {
    return coordinates.map(coord => {
        return <Marker
            coordinate={coord}
            pinColor='red' />
    })
}

const Map = ({ currentLocation, markersCoordinates }) => {
    return (
        <MapView 
            style={styles.mapStyle}
            region={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: DEFAULT_DELTA,
                longitudeDelta: DEFAULT_DELTA
            }}>

            {renderMarkers(markersCoordinates)}
        </MapView>
    )
}

export default Map


const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 20,
        zIndex: -1
    }
});
  