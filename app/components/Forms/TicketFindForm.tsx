import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Autocomplete, AutocompleteItem, Text, Input, Button } from '@ui-kitten/components';
import { COLORS } from '../../constants';
import DatePicker from 'react-native-date-picker';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import RouteLine from '../RouteLine';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import GLOBAL_STYLES from '../../constants/Styles';
import { TicketRouteLineIcon, TicketType } from '../../screens/types/ticket-find.type';
import cities from '../../static-files/cities_of_turkey.json';
import SelectCityModal from '../Modals/SelectCityModal';

type PropsType = {
    routeLineIcon: TicketRouteLineIcon;
    submitButtonText: string;
    ticketType: TicketType
}

const TicketFindForm: React.FC<PropsType> = ({ routeLineIcon, submitButtonText, ticketType }) => {

    const [fromValue, setFromValue] = React.useState<string>("");
    const [toValue, setToValue] = React.useState<string>("");
    const [dateValue, setDateValue] = useState<Date>(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const [data, setData] = React.useState<{ id: number, name: string, }[]>(cities);

    useEffect(() => {
        if (data.length < 1)
            setData(cities);
    }, [data]);

    const isFilledForm = useMemo<boolean>(() => {
        let isFromAvaliable = false;
        let isToAvaliable = false;

        if (fromValue.trim().length < 1 || toValue.trim().length < 1) return false;

        for (let index = 0; index < data.length; index++) {
            if (!isFromAvaliable && data[index].name.includes(fromValue)) isFromAvaliable = true;
            if (!isToAvaliable && data[index].name.includes(toValue)) isToAvaliable = true;
        }
        return isFromAvaliable && isToAvaliable;
    }, [fromValue, toValue, data])

    const dispatch = useAppDispatch();

    const searchText = (text: string, type: 'from' | 'to') => {
        if (type === "from") setFromValue(text);
        else setToValue(text);
        setData(data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }

    const renderOption = (item: { name: string }, index: number) => (
        <AutocompleteItem
            key={index}
            title={item.name}
        />
    );

    const compareFromTo = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    }

    const handleOnFinish = () => {
        dispatch(settingsActions.setLoading({ isLoading: true, content: 'Looking for Tickets ...' }));
        setTimeout(() => {
            dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
        }, 5000);
    }

    return (
        <View style={styles.container}>
            <RouteLine icon={routeLineIcon} >
                <Autocomplete
                    style={{ width: '100%', marginBottom: 10, borderColor: COLORS['warning-300'] }}
                    onFocus={() => setData(cities)}
                    label="From"
                    value={fromValue}
                    onSelect={(index: number) => {
                        setFromValue(data[index].name)
                        setData(cities);
                    }}
                    onChangeText={(value: string) => searchText(value, "from")}
                    scrollEnabled
                >
                    {fromValue.trim().length > 2 ? data.map(renderOption) : <></>}
                </Autocomplete>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={GLOBAL_STYLES.separator} />
                    </View>
                    <TouchableOpacity onPress={compareFromTo}>
                        <MaterialCommunityIcons name="compare-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Autocomplete
                    style={{ width: '100%', marginBottom: 10 }}
                    label="To"
                    onFocus={() => setData(cities)}
                    value={toValue}
                    onSelect={(index: number) => {
                        setToValue(data[index].name)
                        setData(cities);
                    }}
                    onChangeText={(value: string) => searchText(value, "to")}
                    scrollEnabled
                >
                    {toValue.trim().length > 2 ? data.map(renderOption) : <></>}
                </Autocomplete>
            </RouteLine>
            <SelectCityModal isVisible data={data} setVisible={setDatePickerVisible} />
            <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                <Text appearance='hint' style={{ fontWeight: '700', fontSize: 12, marginBottom: 2 }} >
                    Date
                </Text>
                <Button style={{ width: '100%', backgroundColor: 'white' }} onPress={() => setDatePickerVisible(true)} appearance='outline' status='basic'>
                    {dateValue.toDateString()}
                </Button>
                <DatePicker
                    minimumDate={new Date()}
                    title="Select Date"
                    confirmText='Select'
                    cancelText='Cancel'
                    mode='date'
                    modal
                    locale='en'
                    open={datePickerVisible}
                    onConfirm={(date: Date) => { setDatePickerVisible(false); setDateValue(date) }}
                    date={dateValue} onCancel={() => setDatePickerVisible(false)}
                />
            </View>
            <Button
                style={[styles.submitButton, { backgroundColor: isFilledForm ? COLORS['danger-400'] : COLORS.gray }]}
                appearance='filled'
                onPress={handleOnFinish}
            >
                {submitButtonText}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submitButton: {
        width: '100%',
        marginTop: 20,
        borderWidth: 0,
        elevation: 4,
    }
})

export default TicketFindForm;