import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Filters = () => {
    return (
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
    )
}

export default Filters

const styles = StyleSheet.create({
    filterMenu: {
        flexDirection: 'row',
        position: 'absolute'
    },
    filterContainer: {
        padding: 10,
        flex: 1
    }
});
  
