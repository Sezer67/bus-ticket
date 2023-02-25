import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';
import { COLORS } from '../../../constants';
import VehicleDetailForm from '../../components/Forms/VehicleDetailForm';

const AddVehicleScreen = ({ navigation, route }: RootStackScreenProps<'AddVehicleModal'>) => {

    useEffect(() => {
        navigation.setOptions({
            title: 'Create Vehicle',
            headerStyle: {
                backgroundColor: COLORS['danger-400'],
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>

                <VehicleDetailForm isEdit={false} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 40
    }
});

export default AddVehicleScreen;