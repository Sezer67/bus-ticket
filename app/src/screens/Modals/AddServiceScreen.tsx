import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';
import { COLORS } from '../../../constants';
import ServiceDetailForm from '../../components/Forms/ServiceDetailForm';



const AddServiceScreen = ({ navigation, route }: RootStackScreenProps<'AddServiceModal'>) => {

    useEffect(() => {
        navigation.setOptions({
            title: 'Create Service',
            headerStyle: {
                backgroundColor: COLORS['danger-400'],
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <ServiceDetailForm isEdit={false} />
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

export default AddServiceScreen;