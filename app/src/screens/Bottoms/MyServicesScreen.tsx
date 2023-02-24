import { Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';

const MyServicesScreen = ({ navigation, route }: RootTabScreenProps<'MyServices'>) => {
    return (
        <View style={[GLOBAL_STYLES.transparentHeaderScreenContainer]}>
            <Text>My Services Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MyServicesScreen;