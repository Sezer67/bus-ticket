import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import { COLORS } from '../../../constants';
import { Text } from '@ui-kitten/components';
import { useAppSelector } from '../../../hooks/redux.hook';


const Snackbar = () => {

    const settingState = useAppSelector((state) => state.settings);

    return (
        <View style={[styles.container, { display: settingState.error.isError ? 'flex' : 'none' }]}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>{settingState.error.content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        position: 'absolute',
        bottom: 10
    },
    subContainer: {
        backgroundColor: '#212121',
        width: Layout.window.width - 40,
        elevation: 4,
        height: 60,
        marginHorizontal: 20,
        borderRadius: 5,
        padding: 20
    },
    text: {
        color: 'white'
    }
})

export default Snackbar;