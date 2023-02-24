import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';
import { COLORS } from '../../../constants';

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
        <View style={[GLOBAL_STYLES.transparentHeaderScreenContainer]}>
            <Text>My Service Add Modal</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AddServiceScreen;