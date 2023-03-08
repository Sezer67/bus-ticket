import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import { COLORS } from '../../../constants';
import VehicleDetailForm from '../../components/Forms/VehicleDetailForm';


const AddVehicleScreen = ({ navigation, route }: RootStackScreenProps<'AddVehicleModal'>) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        const { vehicleId, title } = route.params;

        navigation.setOptions({
            title,
            headerStyle: {
                backgroundColor: vehicleId ? COLORS['success-300'] : COLORS['danger-400'],
            }
        });
        if (vehicleId) {
            setIsEdit(true);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <VehicleDetailForm isEdit={isEdit} />
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