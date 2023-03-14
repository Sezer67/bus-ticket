import { Button, Input, Radio, RadioGroup, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import GLOBAL_STYLES from '../../../constants/Styles';
import { COLORS } from '../../../constants';
import Layout from '../../../constants/Layout';
import { dateHelper } from '../../helpers';
import { useInputState } from '../../../hooks/forms.hook';

type PropsType = {
    isEdit: boolean;
    isEnd: boolean;
    nextStep: (data?: {
        departureDate: Date,
        arrivalDate: Date,
        price: number
    }) => void;
}

const ServiceDetailForm: React.FC<PropsType> = ({ isEdit, isEnd, nextStep }) => {

    const [departureDateVisible, setDepartureDateVisible] = useState<boolean>(false);
    const [arrivalDateVisible, setArrivalDateVisible] = useState<boolean>(false);
    const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
    const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
    const priceInputState = useInputState(true);

    const handleOnSubmit = () => {
        if (isEnd) {
            // save
        } else {
            // next Step bir boş geçiş olacak , birde dolu complete işlemli olacak
            const data = {
                departureDate,
                arrivalDate,
                price: Number(priceInputState.value)
            };
            const isCompleted = !!(data.departureDate && data.arrivalDate && priceInputState.value)
            if (isCompleted) nextStep(data);
            else nextStep();
        }
    }

    useEffect(() => {
        console.log(departureDate);
    }, [departureDate])

    return (
        <KeyboardAvoidingScrollView>
            <View style={styles.container}>
                <View style={[GLOBAL_STYLES.input, { width: '100%', paddingVertical: 10 }]}>
                    <TouchableOpacity onPress={() => setDepartureDateVisible(true)} style={{ width: '100%', paddingLeft: 15 }}>
                        <Text appearance='hint'>{departureDate ? dateHelper.formattedDate(departureDate, "Day Month Date Year HH:mm") : "Departure Time"}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        minimumDate={new Date()}
                        maximumDate={arrivalDate}
                        title="Departure Date"
                        confirmText='Select'
                        cancelText='Cancel'
                        mode='datetime'
                        locale='en'
                        date={departureDate || new Date()}
                        modal
                        open={departureDateVisible}
                        onCancel={() => setDepartureDateVisible(false)}
                        onConfirm={(date: Date) => { setDepartureDate(date); setDepartureDateVisible(false) }}
                    />
                </View>
                <View style={[GLOBAL_STYLES.input, { width: '100%', paddingVertical: 10 }]}>
                    <TouchableOpacity onPress={() => setArrivalDateVisible(true)} style={{ width: '100%', paddingLeft: 15 }}>
                        <Text appearance='hint'>{arrivalDate ? dateHelper.formattedDate(arrivalDate, "Day Month Date Year HH:mm") : "Arrival Time"}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        minimumDate={departureDate || new Date()}
                        title="Arrival Date"
                        confirmText='Select'
                        cancelText='Cancel'
                        mode='datetime'
                        locale='en'
                        date={arrivalDate || new Date()}
                        modal
                        open={arrivalDateVisible}
                        onCancel={() => setArrivalDateVisible(false)}
                        onConfirm={(date: Date) => setArrivalDate(date)}
                    />
                </View>
                <View>
                    <Input
                        style={priceInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                        placeholder='Price ₺'
                        maxLength={4}
                        keyboardType='numeric'
                        {...priceInputState}
                    />
                    <Text style={{ position: 'absolute', right: 10, top: 5, ...Layout.FONTS.body1 }}>₺</Text>
                </View>
            </View>
            <Button onPress={handleOnSubmit} style={isEdit ? styles.submitButton : styles.button}>
                {isEnd ? "Save" : "Next Step"}
            </Button>
        </KeyboardAvoidingScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 50
    },
    submitButton: {
        backgroundColor: COLORS['success-400'],
        width: '100%',
        borderWidth: 0,
        elevation: 4
    },
    button: {
        backgroundColor: COLORS['danger-400'],
        borderWidth: 0,
        elevation: 4
    },
});

export default ServiceDetailForm;