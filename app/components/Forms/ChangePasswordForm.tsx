import { Button, Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { formTypes } from '../../types/index';

const ChangePasswordForm = () => {


    const [form, setForm] = useState<formTypes.ChangePasswordType>({
        currentPassword: "", newPassword: ""
    });

    const onChangeText = (value: string, formValue: keyof formTypes.ChangePasswordType) => {
        setForm({
            ...form,
            [formValue]: value
        });
    }

    return (
        <View style={styles.container}>
            <Input label="Your Current Password" value={form.currentPassword} onChangeText={(text) => onChangeText(text, "currentPassword")} />
            <Input label="New Password" value={form.newPassword} onChangeText={(text) => onChangeText(text, "newPassword")} />
            <Button style={styles.button}>
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