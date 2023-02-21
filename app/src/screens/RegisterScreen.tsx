import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../../types';
import { Input, Text, Button, RadioGroup, Radio } from '@ui-kitten/components';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useDatePickerState, useInputPasswordState, useInputState, useRadioGroupState } from '../../hooks/forms.hook';
import GLOBAL_STYLES from '../../constants/Styles';
import DatePicker from 'react-native-date-picker';
import { userService } from '../../service';
import { useAppDispatch } from '../../hooks/redux.hook';
import { settingsActions } from '../redux/settings/slice';
import { userActions } from '../redux/user/slice';
import { storageHelper } from '../helpers';
import { setToken } from '../../utils/axios.util';
import UserDetailForm from '../components/Forms/UserDetailForm';

const RegisterScreen = ({ navigation, route }: RootStackScreenProps<'Register'>) => {







    return (
        <View style={styles.container}>
            <Text style={{ width: 200, textAlign: 'center' }} category='h1'>Create Account</Text>
            <View style={styles.cardContainer}>
                <View style={styles.registerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text category='h4'>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <UserDetailForm isEdit={false} isDisable={false} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: COLORS['danger-400'],
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    focusInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: COLORS['danger-400'],
        marginBottom: 20,
        backgroundColor: COLORS['danger-100']
    },
    cardContainer: {
        width: Layout.window.width * 3 / 4,
        height: Layout.window.height * 3 / 5,
        backgroundColor: COLORS['danger-100'],
        marginTop: 60,
        borderRadius: 20,
        flexDirection: 'column'
    },
    registerContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 8,
    },
    forms: {
        width: '100%',
        marginTop: 30
    },
    submitButton: {
        backgroundColor: COLORS['success-400'],
        width: '100%',
        borderWidth: 0,
        elevation: 4
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    }
})

export default RegisterScreen;