import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { BaseServiceType, } from '../../types/service.type';
import { Text } from '@ui-kitten/components';
import { COLORS } from '../../constants';
import { FontAwesome } from '@expo/vector-icons';
import VehicleTypeIcon from './VehicleModels/TypeIcon';
import Layout from '../../constants/Layout';
import Accordion from './Accordion';
import RouteDetailList from './RouteDetailList';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types';

type PropsType = {
    item: BaseServiceType,
    index: number
}

const BaseServiceWithServicesItem: React.FC<PropsType> = ({ item, index }) => {

    const navigation = useNavigation();

    const CompletedTextArea = () => (
        <View style={[styles.row,]}>
            <FontAwesome name='check-circle-o' size={24} color={COLORS['success-400']} />
            <Text appearance='hint' style={{ marginLeft: 10, color: COLORS['success-600'] }}>Service is Completed</Text>
        </View>
    )

    const FirstAndLastStationText = (prop: { route: string[] }) => (
        <Text category='h5'>{prop.route[0]} - {prop.route[prop.route.length - 1]}</Text>
    )

    const navigateToCreateServices = () => {
        navigation.navigate('AddServiceStepsModal', {
            baseServiceId: item.id,
            route: item.route
        });
    }

    return (
        <View style={styles.card}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <FirstAndLastStationText route={item.route.split(",")} />
                <View style={styles.row}>
                    <VehicleTypeIcon type={item.vehicle.vehicleType} color="dark" />
                    <Text style={{ marginLeft: 20 }} category='h6'>{item.vehicle.plate.toUpperCase()}</Text>
                </View>
            </View>
            <Accordion
                title={
                    <Text style={{ ...Layout.FONTS.h2, fontWeight: '700' }}>Route Details</Text>
                }
                children={
                    <View style={{ marginLeft: 20 }}>
                        <RouteDetailList
                            data={item.services.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())}
                        />
                    </View>
                }
            />
            {
                item.services.length === 0 ? (
                    <TouchableOpacity onPress={navigateToCreateServices} style={styles.row}>
                        <FontAwesome name='warning' size={20} style={{ marginRight: 10 }} color={COLORS['danger-600']} />
                        <Text status='danger'>Route details are not complete</Text>
                    </TouchableOpacity>
                ) : null
            }
            {/* winnings tickets row */}
            {
                item.isCompleted ? <CompletedTextArea /> : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS['danger-400'],
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    row: { flexDirection: 'row', alignItems: 'center' }
})

export default BaseServiceWithServicesItem;