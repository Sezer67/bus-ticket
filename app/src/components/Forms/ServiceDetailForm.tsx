import { Button, Input, Radio, RadioGroup, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import GLOBAL_STYLES from '../../../constants/Styles';
import { COLORS } from '../../../constants';
import Layout from '../../../constants/Layout';

type PropsType = {
    isEdit: boolean;
}

const ServiceDetailForm: React.FC<PropsType> = ({ isEdit }) => {
    const handleOnSubmit = () => { }

    return (
        <KeyboardAvoidingScrollView>
            <View style={styles.container}>
                {/* <Input
                    placeholder='The place of departure'
                    style={GLOBAL_STYLES.input}
                />
                <Input
                    style={GLOBAL_STYLES.input}
                    placeholder='The place of arrival'
                /> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={[GLOBAL_STYLES.input, { width: '50%', paddingVertical: 10 }]}>
                        <TouchableOpacity style={{ width: '100%', paddingLeft: 15, borderRightWidth: 1, borderRightColor: 'red' }}>
                            <Text appearance='hint'>Departure Time</Text>
                        </TouchableOpacity>
                        <DatePicker mode='datetime' date={new Date()} modal />
                    </View>
                    <View style={[GLOBAL_STYLES.input, { width: '50%', paddingVertical: 10 }]}>
                        <TouchableOpacity style={{ width: '100%', paddingLeft: 15, }}>
                            <Text appearance='hint'>Arrival Time</Text>
                        </TouchableOpacity>
                        <DatePicker mode='datetime' date={new Date()} modal />
                    </View>
                </View>
                {/* <View style={GLOBAL_STYLES.input}>
                    <Text appearance='hint' style={{ paddingLeft: 15, marginBottom: 5 }}>Vehicle Type</Text>
                    <RadioGroup style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Radio status='danger'>Bus</Radio>
                        <Radio status='danger'>Train</Radio>
                        <Radio status='danger'>Plane</Radio>
                    </RadioGroup>
                </View> */}
                {/* <View>
                    <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4, padding: 10, marginBottom: 20, height: Layout.window.height / 5 }}>
                        <Text>Select Vehicle type anında visible olacak. Seçili olunca da normal bi input a dönüşecek daha sonra inputa tıklanırsa tekrardan bu alan açılacak.</Text>
                    </View>
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={[{ width: '50%', marginBottom: 20, borderRightWidth: 1, borderRightColor: COLORS['danger-400'] }]}>
                        <Input
                            style={[GLOBAL_STYLES.input, { marginBottom: 0 }]}
                            placeholder='Start Price ₺'
                        />
                    </View>
                    <View style={[{ width: '50%', marginBottom: 20, }]}>
                        <Input
                            style={[GLOBAL_STYLES.input, { marginBottom: 0 }]}
                            placeholder='End Price ₺'
                        />
                    </View>
                </View>
                {/* <Text>Route  Seçilen her route dan sonra right arrow işareti ile gönderme yapılacak
                    ya da bir input seçmek için olacak altında da route u belirten bir text geçilebilir.
                </Text> */}
            </View>
            <Button onPress={handleOnSubmit} style={isEdit ? styles.submitButton : styles.button}>
                {isEdit ? "EDIT" : "CREATE VEHICLE"}
            </Button>
        </KeyboardAvoidingScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
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