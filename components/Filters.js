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
                        {label: 'Comuna',   value: '0' },
                        {label: 'Comuna 1', value: 'Comuna 1' },
                        {label: 'Comuna 2', value: 'Comuna 2' },
                        {label: 'Comuna 3', value: 'Comuna 3' },
                        {label: 'Comuna 4', value: 'Comuna 4' },
                        {label: 'Comuna 5', value: 'Comuna 5' },
                        {label: 'Comuna 6', value: 'Comuna 6' },
                        {label: 'Comuna 7', value: 'Comuna 7' },
                        {label: 'Comuna 8', value: 'Comuna 8' },
                        {label: 'Comuna 9', value: 'Comuna 9' },
                        {label: 'Comuna 10', value: 'Comuna 10' },
                        {label: 'Comuna 11', value: 'Comuna 11' },
                        {label: 'Comuna 12', value: 'Comuna 12' },
                        {label: 'Comuna 13', value: 'Comuna 13' },
                        {label: 'Comuna 14', value: 'Comuna 14' },
                        {label: 'Comuna 15', value: 'Comuna 15' }
                    ]}
                    onChangeItem={item => {
                        const value = item.value === "0" ? undefined : item.value;
                        const newFilters = { ...filters, comuna: value };
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
  
