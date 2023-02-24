import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../../types';
import { Input, Text, Button } from '@ui-kitten/components';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';
import { Feather } from '@expo/vector-icons';
import { useInputPasswordState, useInputState } from '../../hooks/forms.hook';
import GLOBAL_STYLES from '../../constants/Styles';
import { settingsActions } from '../redux/settings/slice';
import { useAppDispatch } from '../../hooks/redux.hook';
import { userService } from '../../service';
import { userActions } from '../redux/user/slice';
import { setToken } from '../../utils/axios.util';
import { storageHelper } from '../helpers';
const LoginScreen = ({ navigation, route }: RootStackScreenProps<'Login'>) => {

    const mailInputState = useInputState();
    const passwordInputState = useInputPasswordState();

    const dispatch = useAppDispatch();

    const renderPasswordIcon = () => (
        <TouchableOpacity onPress={() => passwordInputState.setSecureTextEntry(!passwordInputState.secureTextEntry)} style={{ marginLeft: 10, marginRight: 10 }}>
            <Feather name='lock' size={20} />
        </TouchableOpacity>
    )

    const handleOnSubmit = async () => {
        try {
            const formData = {
                mail: mailInputState.value,
                password: passwordInputState.value
            }
            dispatch(settingsActions.setLoading({ isLoading: true, content: 'Loading...' }));
            const { data } = await userService.login(formData);
            dispatch(userActions.login(data));
            setToken(data.token);
            storageHelper.setStorageKey("@token", data.token);

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

    return (
        <View style={styles.container}>
            <Text style={{ width: 200, textAlign: 'center' }} category='h1'>Welcome Back</Text>
            <View style={styles.cardContainer}>
                <View style={styles.registerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text category='h4' >Create Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <Text category='h5'>SIGN IN</Text>
                    <View style={styles.forms}>
                        <Input
                            accessoryLeft={<Feather name='mail' size={20} />}
                            style={mailInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            keyboardType='email-address'
                            placeholder='Mail Address'
                            {...mailInputState}
                        />
                        <Input
                            accessoryLeft={renderPasswordIcon}
                            style={passwordInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            placeholder='Password'
                            {...passwordInputState}
                        />
                    </View>
                    <Button onPress={handleOnSubmit} style={styles.submitButton}>
                        SIGN IN
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
        height: Layout.window.height * 1 / 2,
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
        justifyContent: 'space-evenly',
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
    }
})

export default LoginScreen;