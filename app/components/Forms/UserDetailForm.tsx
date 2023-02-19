import { Button, Input, Radio, RadioGroup, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { formTypes } from '../../types/index';
import DatePicker from 'react-native-date-picker';
import { COLORS } from '../../constants';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
type PropsType = {
    isEdit: boolean;
    isDisable: boolean
}

const initialFormData: formTypes.UserDetailFormType = {
    fullName: "",
    gender: "Male",
    identityNumber: "",
    mail: "",
}
enum GenderRadioEnum {
    Male = 0,
    Female = 1
}
const UserDetailForm: React.FC<PropsType> = ({ isEdit, isDisable }) => {

    const [form, setForm] = useState<formTypes.UserDetailFormType>(initialFormData);
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const [genderRadio, setGenderRadio] = useState<GenderRadioEnum>(0);

    const onChangeText = (value: string, formValue: keyof formTypes.UserDetailFormType) => {
        setForm({
            ...form,
            [formValue]: value
        });
    }

    const onChangeGender = (index: GenderRadioEnum) => {
        setGenderRadio(index);
        Object.keys(GenderRadioEnum).map((key) => {
            if (GenderRadioEnum[key as keyof typeof GenderRadioEnum] === index)
                onChangeText(key, "gender")
        });
    }



    return (
        <View style={styles.container}>
            <KeyboardAvoidingScrollView>
                <View style={styles.formInput}>
                    <Input disabled={isDisable} label="Full Name" onChangeText={(text) => onChangeText(text, "fullName")} value={form.fullName} />
                </View>
                <View style={styles.formInput}>
                    <Input disabled={isDisable} label="Identity No" onChangeText={(text) => onChangeText(text, "identityNumber")} value={form.identityNumber} />
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontSize: 12, fontWeight: '700', color: isDisable ? '#C5CEE0' : COLORS.gray }} appearance='hint'>Date</Text>
                        <Text style={{ width: '50%', fontSize: 12, fontWeight: '700', color: isDisable ? '#C5CEE0' : COLORS.gray }} appearance='hint'>Gender</Text>
                    </View>
                    <View style={[styles.formRow, { backgroundColor: isDisable ? '#f7f8fa' : 'white' }]}>
                        <TouchableOpacity onPress={() => {
                            if (!isDisable) setDatePickerVisible(true)
                        }} style={styles.dateContent}>
                            <Text style={{ textAlign: 'center' }}>
                                {form.birthday?.toDateString() || "Select Date"}
                            </Text>
                        </TouchableOpacity>
                        <DatePicker
                            maximumDate={new Date()}
                            title="Select Birthday"
                            confirmText='Select'
                            cancelText='Cancel'
                            mode='date'
                            modal
                            locale='en'
                            open={datePickerVisible}
                            onConfirm={(date: Date) => {
                                setDatePickerVisible(false);
                                setForm({ ...form, birthday: date });
                            }}
                            onCancel={() => setDatePickerVisible(false)}
                            date={form.birthday || new Date("January 2,2000")}
                        />
                        <RadioGroup
                            selectedIndex={genderRadio}
                            onChange={(index) => onChangeGender(index)}
                            style={[styles.radioGroup]}
                        >
                            <Radio >Male</Radio>
                            <Radio>Female</Radio>
                        </RadioGroup>
                    </View>
                </View>
                <View style={styles.formInput}>
                    <Input disabled={isDisable} label="Email" onChangeText={(text) => onChangeText(text, "mail")} value={form.mail} />
                </View>
                {
                    !isEdit ? (
                        <View style={styles.formInput}>
                            <Input label="Password" onChangeText={(text) => onChangeText(text, "password")} />
                        </View>
                    ) : null
                }
                <Button style={styles.button}>
                    {isEdit ? "EDIT" : "REGISTER"}
                </Button>
            </KeyboardAvoidingScrollView>
        </View >
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    formInput: {
        marginBottom: 10,
    },
    formRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        height: 45,
        paddingHorizontal: 5,
        borderColor: COLORS.disabledColor,
        borderWidth: 1,
        borderRadius: 5
    },
    radioGroup: {
        flexDirection: 'row',
        width: '50%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    dateContent: {
        width: '50%',
    }, button: {
        backgroundColor: COLORS['danger-300'],
        borderWidth: 0,
        elevation: 4
    }
})


export default UserDetailForm;