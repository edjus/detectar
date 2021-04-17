import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Filters = ({ onFiltersChange }) => {
    const [filters, setFilters] = useState({
        comuna: '0',
        distance: '0'
    });

    return (
        <View style={styles.filterMenu}>
            <View style={styles.filterContainer}>
                <DropDownPicker
                    defaultValue={filters.comuna}
                    items={[
                        {label: 'Comuna', value: '0' },
                        {label: 'Comuna 1', value: '1' },
                        {label: 'Comuna 2', value: '2' },
                        {label: 'Comuna 3', value: '3' },
                    ]}
                    onChangeItem={item => {
                        const newFilters = { ...filters, comuna: item.value };
                        setFilters(newFilters);
                        onFiltersChange(newFilters);
                    }}
                />
            </View>
            <View style={styles.filterContainer}>
                <DropDownPicker
                    defaultValue={filters.distance}
                    items={[
                        {label: 'Distancia', value: '0' },
                        {label: '1 KM', value: '1' },
                        {label: '5 KM', value: '5' },
                        {label: '10 KM', value: '10' },
                    ]}
                    onChangeItem={item => {
                        const newFilters = { ...filters, distance: item.value };
                        setFilters(newFilters);
                        onFiltersChange(newFilters);
                    }}
                />
            </View>
        </View>
    )
}

export default Filters;

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
  
