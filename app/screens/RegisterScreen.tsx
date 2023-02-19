import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../types';
import { Input, Text, Button, RadioGroup, Radio } from '@ui-kitten/components';
import Layout from '../constants/Layout';
import { COLORS } from '../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useInputPasswordState, useInputState, useRadioGroupState } from '../hooks/forms.hook';
import GLOBAL_STYLES from '../constants/Styles';
import DatePicker from 'react-native-date-picker';
const RegisterScreen = ({ navigation, route }: RootStackScreenProps<'Register'>) => {

    const identityNumberInputState = useInputState();
    const fullNameInputState = useInputState();
    const mailInputState = useInputState();
    const passwordInputState = useInputPasswordState();
    const genderRadioGroupState = useRadioGroupState(0);

    const renderPasswordIcon = () => (
        <TouchableOpacity onPress={() => passwordInputState.setSecureTextEntry(!passwordInputState.secureTextEntry)} style={{ marginLeft: 10, marginRight: 10 }}>
            <Feather name='lock' size={20} />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <Text style={{ width: 200, textAlign: 'center' }} category='h1'>Create Account</Text>
            <View style={styles.cardContainer}>
                <View style={styles.registerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text category='h4'>Sign In</Text>
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
                        <View>
                            {/* DatePicker */}
                        </View>
                        <Input
                            accessoryLeft={renderPasswordIcon}
                            style={passwordInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                            placeholder='Password'
                            {...passwordInputState}
                        />
                    </View>
                    <Button style={styles.submitButton}>
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