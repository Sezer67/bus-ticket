import React, { useEffect } from 'react';
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { Input, Button, Radio, RadioGroup, Text } from "@ui-kitten/components"
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useDatePickerState, useInputPasswordState, useInputState, useRadioGroupState } from "../../../hooks/forms.hook";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { settingsActions } from "../../redux/settings/slice";
import { userService } from "../../../service";
import { userActions } from "../../redux/user/slice";
import { storageHelper } from "../../helpers";
import { setToken } from "../../../utils/axios.util";
import GLOBAL_STYLES from "../../../constants/Styles";
import { COLORS } from "../../../constants";
import DatePicker from "react-native-date-picker";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { ReduxRootType } from '../../../types/redux-slice.type';

type PropsType = {
    isEdit: boolean;
    isDisable: boolean
}

const UserDetailForm: React.FC<PropsType> = ({ isEdit, isDisable }) => {
    const identityNumberInputState = useInputState();
    const fullNameInputState = useInputState();
    const mailInputState = useInputState();
    const passwordInputState = useInputPasswordState();
    const genderRadioGroupState = useRadioGroupState(0);
    const roleRadioGroupState = useRadioGroupState(0);
    const datePickerState = useDatePickerState(new Date("January 1,2000"));

    const userState = useAppSelector((state: ReduxRootType) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isEdit && userState.user.id) {
            fullNameInputState.onChangeText(userState.user.fullName);
            identityNumberInputState.onChangeText(userState.user.identityNumber || "");
            mailInputState.onChangeText(userState.user.mail);
            genderRadioGroupState.onChange(userState.user.gender);
            datePickerState.onConfirm(new Date(userState.user.birthday) || new Date("January 1,2000"));
        }
    }, [isEdit, userState])

    const renderPasswordIcon = () => (
        <TouchableOpacity onPress={() => passwordInputState.setSecureTextEntry(!passwordInputState.secureTextEntry)} style={{ marginLeft: 10, marginRight: 10 }}>
            <Feather name={passwordInputState.secureTextEntry ? "lock" : "unlock"} size={20} />
        </TouchableOpacity>
    )

    const handleOnSubmit = async () => {
        const formData = {
            fullName: fullNameInputState.value,
            mail: mailInputState.value,
            gender: genderRadioGroupState.selectedIndex,
            birthday: datePickerState.date,
            identityNumber: identityNumberInputState.value || undefined,
            password: passwordInputState.value,
            role: roleRadioGroupState.selectedIndex
        };
        dispatch(settingsActions.setLoading({ isLoading: true, content: 'Creating a record...' }));
        try {
            const { data } = await userService.register(formData);
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
        <>
            <KeyboardAvoidingScrollView>
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
                        disabled={isDisable}
                        {...mailInputState}
                        keyboardType='email-address'
                    />
                    <Input
                        accessoryLeft={<FontAwesome name='id-card-o' size={20} />}
                        style={identityNumberInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                        placeholder='Identity Number'
                        disabled={isDisable}
                        maxLength={11}
                        keyboardType='number-pad'
                        {...identityNumberInputState}
                    />
                    <View style={[GLOBAL_STYLES.input, styles.row, { alignItems: 'center', paddingLeft: 20 }]}>
                        <FontAwesome name='transgender' size={20} />
                        <RadioGroup {...genderRadioGroupState} style={[styles.row, { paddingLeft: 20 }]}>
                            <Radio status='danger'>Male        </Radio>
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
                    {
                        !isEdit && (
                            <View style={[GLOBAL_STYLES.input, styles.row, { alignItems: 'center', paddingLeft: 16 }]}>
                                <MaterialCommunityIcons name='office-building' size={20} />
                                <RadioGroup {...roleRadioGroupState} style={[styles.row, { paddingLeft: 20 }]}>
                                    <Radio status='danger'>Customer</Radio>
                                    <Radio status='danger'>Company</Radio>
                                </RadioGroup>
                            </View>
                        )
                    }
                    {
                        !isEdit && (
                            <Input
                                accessoryLeft={renderPasswordIcon}
                                style={passwordInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                                placeholder='Password'
                                {...passwordInputState}
                            />
                        )
                    }
                </View>
                <Button onPress={handleOnSubmit} style={isEdit ? styles.button : styles.submitButton}>
                    {isEdit ? "EDIT" : "CREATE ACCOUNT"}
                </Button>
            </KeyboardAvoidingScrollView >
        </>
    );
}

const styles = StyleSheet.create({
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
    },
    button: {
        backgroundColor: COLORS['danger-300'],
        borderWidth: 0,
        elevation: 4
    }
})

export default UserDetailForm;