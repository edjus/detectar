import React from 'react';
import { StyleSheet, View , Dimensions} from 'react-native';
import  MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const current_location={coords:{latitude:-34.61745 , longitude:-58.36795}};


export default class  Map extends React.Component {

  state={
    location:current_location,
  }

  render(){
    return (
       <KeyboardAwareScrollView style={{marginTop:20}}>
        <View style={StyleSheet.containerAll}>
          <MapView 
            style={styles.mapStyle}  
            ref={map => this._map = map}
            initialRegion={{                      
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0921,
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
    },  
  });
