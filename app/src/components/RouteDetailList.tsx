import React from 'react';
import { FlatList, View } from 'react-native';
import { ServiceType } from '../../types/service.type';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';
import { dateHelper } from '../helpers';
import { COLORS } from '../../constants';
import Layout from '../../constants/Layout';


const RouteDetailList: React.FC<{ data: ServiceType[] }> = ({ data }) => {

    const renderServiceList = (prop: { item: ServiceType }) => (
        <View>
            <Text style={{ marginBottom: 5,...Layout.FONTS.h2 }} >
                {prop.item.departureCity} - {prop.item.arrivalCity} 
                {" "}
                <Text category='h6'>( {prop.item.price} ₺ )</Text>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="clock-o" size={20} color={COLORS.gray} style={{ marginRight: 10 }} />
                <Text appearance='hint'>{dateHelper.formattedDate(new Date(prop.item.departureDate), "DD/MM HH:mm")} - {dateHelper.formattedDate(new Date(prop.item.arrivalDate), "DD/MM HH:mm")}</Text>
            </View>
        </View>
    )

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderServiceList}
        />
    )
};

export default RouteDetailList;