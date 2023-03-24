import { Button, Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { formTypes } from '../../../types/index';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { userService } from '../../../service';
import { useInputPasswordState } from '../../../hooks/forms.hook';
import { Feather } from '@expo/vector-icons';
import GLOBAL_STYLES from '../../../constants/Styles';

const ChangePasswordForm = () => {
    const currentPassword = useInputPasswordState();
    const newPassword = useInputPasswordState();

    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        try {
            dispatch(settingsActions.setLoading({ isLoading: true, content: 'Checking password ...' }));
            await userService.changePassword({
                currentPassword: currentPassword.value, newPassword: newPassword.value
            });
            dispatch(settingsActions.setErrorSnackbar({ isError: true, content: "Password is changed ✓" }));
            currentPassword.onChangeText("");
            newPassword.onChangeText("");
        } catch (error: any) {
            if (typeof error.response?.data.message === "string") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
        } finally {
            dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
        }
    }
    const renderPasswordIcon = (prop: { state: formTypes.InputPasswordHookType }) => (
        <TouchableOpacity onPress={() => prop.state.setSecureTextEntry(!prop.state.secureTextEntry)} style={{ marginLeft: 10, marginRight: 10 }}>
            <Feather name={prop.state.secureTextEntry ? "lock" : "unlock"} size={20} />
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <Input
                label="Your Current Password"
                style={currentPassword.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                accessoryLeft={() => renderPasswordIcon({ state: currentPassword })}
                {...currentPassword}
            />
            <Input
                style={newPassword.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                label="New Password"
                accessoryLeft={() => renderPasswordIcon({ state: newPassword })}
                {...newPassword}
            />
            <Button onPress={handleSubmit} style={styles.button}>
                SAVE
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        backgroundColor: COLORS['danger-300'],
        borderWidth: 0,
        marginTop: 20,
        elevation: 4
    }
})

export default ChangePasswordForm;