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
import { userEnums } from '../../enums';
import { userService } from '../../service';
import { useAppDispatch } from '../../hooks/redux.hook';
import { AxiosError } from 'axios';
import { settingsActions } from '../redux/settings/slice';
import { userActions } from '../redux/user/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageHelper } from '../helpers';
import { setToken } from '../../utils/axios.util';

const RegisterScreen = ({ navigation, route }: RootStackScreenProps<'Register'>) => {

    const identityNumberInputState = useInputState();
    const fullNameInputState = useInputState();
    const mailInputState = useInputState();
    const passwordInputState = useInputPasswordState();
    const genderRadioGroupState = useRadioGroupState(0);
    const datePickerState = useDatePickerState(new Date("January 1,2000"));

    const dispacth = useAppDispatch();

    const renderPasswordIcon = () => (
        <TouchableOpacity onPress={() => passwordInputState.setSecureTextEntry(!passwordInputState.secureTextEntry)} style={{ marginLeft: 10, marginRight: 10 }}>
            <Feather name='lock' size={20} />
        </TouchableOpacity>
    )

    const handleOnSubmit = async () => {
        const formData = {
            fullName: fullNameInputState.value,
            mail: mailInputState.value,
            gender: genderRadioGroupState.selectedIndex,
            birthday: datePickerState.date,
            identityNumber: identityNumberInputState.value || undefined,
            password: passwordInputState.value
        };
        dispacth(settingsActions.setLoading({ isLoading: true, content: 'Creating a record...' }));
        try {
            const { data } = await userService.register(formData);
            dispacth(userActions.login(data));
            setToken(data.token);
            storageHelper.setStorageKey("@token", data.token);
        } catch (error: any) {
            if (typeof error.response?.data.message === "string") {
                dispacth(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispacth(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispacth(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
            setTimeout(() => {
                dispacth(settingsActions.setErrorSnackbar({ isError: false, content: undefined }))
            }, 5000)
        } finally {
            dispacth(settingsActions.setLoading({ isLoading: false, content: undefined }));
        }

        console.log(formData);
    }

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
                    <View style={styles.forms}>
                        <Input
                            accessoryLeft={<FontAwesome name='user-o' size={20} />}
                            style={fullNameInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            placeholder='Full Name'
                            {...fullNameInputState}
                        />
                        <Input
                            accessoryLeft={<Feather name='mail' size={20} />}
                            style={mailInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            placeholder='Mail Address'
                            {...mailInputState}
                            keyboardType='email-address'
                        />
                        <Input
                            accessoryLeft={<FontAwesome name='id-card-o' size={20} />}
                            style={identityNumberInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            placeholder='Identity Number'
                            maxLength={11}
                            keyboardType='number-pad'
                            {...identityNumberInputState}
                        />
                        <View style={[GLOBAL_STYLES.input, styles.row, { alignItems: 'center', paddingLeft: 20 }]}>
                            <FontAwesome name='transgender' size={20} />
                            <RadioGroup {...genderRadioGroupState} style={[styles.row, { paddingLeft: 20 }]}>
                                <Radio status='danger'>Male</Radio>
                                <Radio status='danger'>Female</Radio>
                            </RadioGroup>
                        </View>
                        <View style={[GLOBAL_STYLES.input, styles.row, { alignItems: 'center', paddingLeft: 18, paddingBottom: 10 }]}>
                            <FontAwesome name='birthday-cake' size={20} />
                            <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => datePickerState.onOpen()}>
                                <Text>{datePickerState.date.toDateString()}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                maximumDate={new Date("January 1,2014")}
                                title="Select Birthday"
                                confirmText='Select'
                                cancelText='Cancel'
                                mode='date'
                                modal
                                locale='en'
                                {...datePickerState}
                            />
                        </View>
                        <Input
                            accessoryLeft={renderPasswordIcon}
                            style={passwordInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            placeholder='Password'
                            {...passwordInputState}
                        />
                    </View>
                    <Button onPress={handleOnSubmit} style={styles.submitButton}>
                        CREATE ACCOUNT
                    </Button>
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
        padding: 20,
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