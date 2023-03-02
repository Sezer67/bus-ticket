import { Card, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { settingsActions } from '../../redux/settings/slice';
import { vehicleService } from '../../../service';
import { vehicleActions } from '../../redux/vehicle/slice';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import { VehicleType } from '../../../types/vehicle.type';
import { vehicleEnums } from '../../../enums';

const MyVehiclesScreen = ({ navigation, route }: RootTabScreenProps<'MyVehicles'>) => {

    const vehicleState = useAppSelector((state: ReduxRootType) => state.vehicle);

    const dispatch = useAppDispatch();

    const getMyVehicles = async () => {
        try {
            const { data } = await vehicleService.lookup({});
            dispatch(vehicleActions.setVehicleList(data));
        } catch (error: any) {
            if (typeof error.response?.data.message === "string") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
        }
    }

    useEffect(() => {
        getMyVehicles();
    }, [])

    const renderIcon = (type: vehicleEnums.VehicleType) => {
        let iconNode = <></>;

        switch (type) {
            case vehicleEnums.VehicleType.Bus:
                iconNode = <FontAwesome name='bus' size={20} color={COLORS['danger-400']} />
            case vehicleEnums.VehicleType.Plane:
                iconNode = <FontAwesome name='plane' size={20} color={COLORS['danger-400']} />
            case vehicleEnums.VehicleType.Train:
                iconNode = <FontAwesome name='train' size={20} color={COLORS['danger-400']} />
        }

        return iconNode;
    }

    const renderItem = (prop: { item: VehicleType, index: number }) => (
        <Card>
            {/* Header */}
            <View>
                {renderIcon(prop.item.vehicleType)}
            </View>
            {/* Content */}
        </Card>
    )

    return (
        <View style={styles.container}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={[styles.row, styles.hrBorder]}>
                    <Text category='h6'>Total Vehicle Count of Your Company </Text>
                    <AntDesign name="right" size={18} style={{ marginTop: 2, marginHorizontal: 4 }} color="black" />
                    <Text category='h6' >{vehicleState.vehiclesCount}</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Ionicons name="filter" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={vehicleState.vehicleList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hrBorder: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS['danger-400'],
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});

export default MyVehiclesScreen;