import { GOOGLE_API_KEY } from '@env';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const DEFAULT_DELTA = 0.045;

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const renderMarkers = (markers, setSelecetedLocation) => {
    return markers.map((marker, index) => {
        return <Marker
            key={marker.id}
            coordinate={marker.coords}
            pinColor='red'
            title={marker.title}
            description={`Dirección: ${marker.address}, ${marker.comuna}`}
            onPress={e =>{
                e.stopPropagation();
                setSelecetedLocation(marker);
            }}
        />
    })
}

const Map = ({ currentLocation, markersCoordinates, distance }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    let mapView;

    return (
        <MapView 
            style={styles.mapStyle}
            initialRegion={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: DEFAULT_DELTA,
                longitudeDelta: DEFAULT_DELTA
            }}
            ref={m => mapView = m}
            moveOnMarkerPress={false}>

            {selectedLocation && (
                <MapViewDirections
                    origin={currentLocation.coords}
                    destination={selectedLocation.coords}
                    apikey={GOOGLE_API_KEY}
                    strokeColor='hotpink'
                    strokeWidth={3}
                    onReady={result => {
                        mapView.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: (WIDTH / 20),
                                bottom: (HEIGHT / 20),
                                left: (WIDTH / 20),
                                top: (HEIGHT / 20),
                            }
                        });
                    }}
                />
            )}

            {distance && (<Circle 
                center={currentLocation.coords}  
                radius={distance}  
                fillColor={'rgba(200,100,2,0.2)'} 
                strokeColor={'red'} 
                strokeWidth={3}>
            </Circle>)}

            <Marker
                coordinate={currentLocation.coords}
                pinColor='blue'
                title='You'
            />

            {renderMarkers(markersCoordinates, setSelectedLocation)}
        </MapView>
    )
}

export default Map


const styles = StyleSheet.create({
    mapStyle: {
        width: WIDTH,
        height: HEIGHT - 20,
        zIndex: -1
    }
});
  