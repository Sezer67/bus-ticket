import { Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../../types';

const MyCompanyScreen = ({ navigation, route }: RootTabScreenProps<'MyCompany'>) => {
    return (
        <View>
            <Text>My Company Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MyCompanyScreen;