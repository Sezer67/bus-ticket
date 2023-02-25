import { IndexPath, Input, Select, SelectItem, } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useInputState, useOnlySelectInputState } from '../../../hooks/forms.hook';
import GLOBAL_STYLES from '../../../constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, icons } from '../../../constants';
import { vehicleEnums } from '../../../enums';

type PropsType = {
    isEdit: boolean;
}
const VehicleDetailForm: React.FC<PropsType> = ({ isEdit }) => {

    const seatCountInputState = useInputState();
    const plateInputState = useInputState();
    const seatingPlanInputState = useInputState();
    const vehicleTypeSelectState = useOnlySelectInputState();

    return (
        <>
            <KeyboardAvoidingScrollView>
                <View style={styles.container}>
                    <Input
                        accessoryLeft={<MaterialCommunityIcons name="seatbelt" size={20} color={COLORS['danger-900']} />}
                        style={seatCountInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                        placeholder='Seat Count'
                        {...seatCountInputState}
                    />

                    <Input
                        accessoryLeft={<Image source={icons.plate} resizeMode='cover' />}
                        style={seatCountInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                        placeholder='Vehicle Plate'
                        {...plateInputState}
                    />
                    <Select
                        multiSelect={false}
                        {...vehicleTypeSelectState}
                        placeholder="Vehicle Type"
                        value={vehicleEnums.VehicleType[(Number(vehicleTypeSelectState.selectedIndex) - 1).toString() as keyof typeof vehicleEnums.VehicleType]}
                        status='danger'
                        activeOpacity={20}

                    >
                        {Object.keys(vehicleEnums.VehicleType).filter((key) => Number.isNaN(Number(key))).map((key) => (
                            <SelectItem style={{ backgroundColor: COLORS['danger-300'], borderWidth: 1, borderTopWidth: 0, borderColor: COLORS.light, }} activeOpacity={.5} key={key} title={key} />
                        ))}
                    </Select>

                </View>
            </KeyboardAvoidingScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 50
    },
});

export default VehicleDetailForm;