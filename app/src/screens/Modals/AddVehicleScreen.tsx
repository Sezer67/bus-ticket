import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';
import { COLORS } from '../../../constants';

const AddVehicleScreen = ({ navigation, route }: RootStackScreenProps<'AddVehicleModal'>) => {

    useEffect(() => {
        navigation.setOptions({
            title: 'Create Vehicle',
            headerStyle: {
                backgroundColor: COLORS['danger-400'],
            }
        })
    }, [])

    return (
        <View style={[GLOBAL_STYLES.transparentHeaderScreenContainer]}>
            <Text>My Vehicle Add Modal</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AddVehicleScreen;