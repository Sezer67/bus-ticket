import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../../../constants/Layout';
import { Text } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { FontAwesome } from '@expo/vector-icons';
import { settingsActions } from '../../redux/settings/slice';
import { ReduxRootType } from '../../../types/redux-slice.type';

const Snackbar = () => {

    const settingState = useAppSelector((state: ReduxRootType) => state.settings);
    const dispacth = useAppDispatch();

    const handleClose = () => {
        dispacth(settingsActions.setErrorSnackbar({ isError: false, content: undefined }))
    }

    useEffect(() => {
        setTimeout(() => {
            handleClose();
        }, 3000)
    }, [settingState.error])

    return (
        <View style={[styles.container, { display: settingState.error.isError ? 'flex' : 'none' }]}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>{settingState.error.content}</Text>
                <TouchableOpacity onPress={handleClose}>
                    <FontAwesome name='close' color="red" size={20} />
                </TouchableOpacity>
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
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white'
    }
})

export default Snackbar;