import { Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../../types';

const MyVehiclesScreen = ({ navigation, route }: RootTabScreenProps<'MyVehicles'>) => {
    return (
        <View>
            <Text>My Vehicles Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MyVehiclesScreen;