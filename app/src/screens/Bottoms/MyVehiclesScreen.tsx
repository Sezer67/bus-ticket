import { Card, Text, Button, Popover, Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { settingsActions } from '../../redux/settings/slice';
import { vehicleService } from '../../../service';
import { vehicleActions } from '../../redux/vehicle/slice';
import { AntDesign, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, images } from '../../../constants';
import { VehicleType } from '../../../types/vehicle.type';
import { vehicleEnums } from '../../../enums';
import Layout from '../../../constants/Layout';
import EmptyList from '../../components/EmptyList';
import { useInputState } from '../../../hooks/forms.hook';
import GLOBAL_STYLES from '../../../constants/Styles';

const MyVehiclesScreen = ({ navigation, route }: RootTabScreenProps<'MyVehicles'>) => {

    const [filterDropVisible, setFilterDropVisible] = useState<boolean>(false);
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [filterKey, setFilterKey] = useState<number | undefined>(undefined);
    const [filteredList, setFilteredList] = useState<VehicleType[]>([]);
    const searchInputState = useInputState();
    const vehicleState = useAppSelector((state: ReduxRootType) => state.vehicle);

    const dispatch = useAppDispatch();

    const getMyVehicles = async () => {
        try {
            const { data } = await vehicleService.lookup({});
            dispatch(vehicleActions.setVehicleList(data));
            setFilteredList(data.rows);
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
    }, []);

    useEffect(() => {
        if (searchInputState.value) {
            setFilteredList(vehicleState.vehicleList.filter((v) =>
                v.plate.trim().toLowerCase().includes(searchInputState.value.trim().toLowerCase())
            ))
        }
        else setFilteredList(vehicleState.vehicleList);
    }, [vehicleState.vehicleList])

    useEffect(() => {
        if (!searchInputState.value.trim()) {
            setFilteredList(vehicleState.vehicleList);
            return;
        }
        const filtered = vehicleState.vehicleList.filter((v) =>
            v.plate.trim().toLowerCase().includes(searchInputState.value.trim().toLowerCase())
        );
        setFilteredList(filtered);
    }, [searchInputState.value])

    const handleEditPress = (id: string) => {
        const selectedVehicle = vehicleState.vehicleList.find((v) => v.id === id);

        if (!selectedVehicle) return;

        dispatch(vehicleActions.setSelectedVehicle(selectedVehicle));
        navigation.navigate('AddVehicleModal', {
            vehicleId: id,
            title: selectedVehicle.plate.toUpperCase()
        });
    }

    const renderIcon = (type: vehicleEnums.VehicleType) => {
        let iconNode = <></>;
        switch (type) {
            case vehicleEnums.VehicleType.Bus:
                iconNode = <FontAwesome name='bus' size={24} color={COLORS['danger-800']} />
                break;
            case vehicleEnums.VehicleType.Plane:
                iconNode = <FontAwesome name='plane' size={24} color={COLORS['danger-800']} />
                break;
            case vehicleEnums.VehicleType.Train:
                iconNode = <FontAwesome name='train' size={24} color={COLORS['danger-800']} />
                break;
        }

        return iconNode;
    }

    const totalPointRenderWithStarIcons = (...points: number[]): React.ReactNode[] => {
        let totalPoint = 0;
        points.forEach((point) => totalPoint += point);
        totalPoint = totalPoint / points.length;

        let starCount = 5;
        const loopCount = Math.floor(totalPoint);
        const stars: React.ReactNode[] = [];

        for (let i = 0; i < loopCount; i++) {
            stars.push(<FontAwesome color={COLORS['warning-600']} name='star' key={i} />);
        }

        if (!Number.isInteger(totalPoint)) {
            if (Math.round(totalPoint) > Math.trunc(totalPoint)) {
                stars.push(<FontAwesome key={100 + totalPoint} color={COLORS['warning-600']} name='star-half-o' />)
                starCount -= 1;
            }
        }

        for (let i = 0; i < starCount - loopCount; i++) {
            stars.push(<FontAwesome color={COLORS['warning-600']} name='star-o' key={i + starCount} />);
        }

        return stars;
    }

    const renderItem = (prop: { item: VehicleType, index: number }) => (
        <Card style={{ marginBottom: 10, backgroundColor: 'white', borderWidth: 0, elevation: 1 }} >
            {/* Header */}
            <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: COLORS.disabledColor, paddingBottom: 10, paddingLeft: 5, justifyContent: 'center' }]}>
                {renderIcon(prop.item.vehicleType)}
                <Text style={{ marginLeft: 10 }} category='h6'>{prop.item.plate.toUpperCase()}</Text>
            </View>
            {/* Content */}
            <View style={[styles.row, { flexWrap: 'wrap', paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: COLORS.disabledColor, paddingVertical: 5, justifyContent: 'center' }]}>
                <View style={[styles.row, { width: '30%', backgroundColor: COLORS['danger-100'], justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                    <Text>{prop.item.seatingPlan}</Text>
                </View>
                <View style={[styles.row, { width: '30%', backgroundColor: COLORS['primary-100'], justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                    <MaterialCommunityIcons name="seatbelt" size={18} color={COLORS['danger-900']} />
                    <Text>{prop.item.seatCount}</Text>
                </View>
                {
                    prop.item.isWifi ?
                        <View style={[styles.row, { width: '30%', backgroundColor: COLORS['warning-100'], justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                            <FontAwesome5 name="wifi" size={18} />
                            <Text>Wifi</Text>
                        </View> : null
                }
                {
                    prop.item.isJack ?
                        <View style={[styles.row, { width: '30%', backgroundColor: COLORS['success-200'], justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                            <MaterialCommunityIcons name="audio-input-stereo-minijack" size={18} />
                            <Text>Jack</Text>
                        </View> : null
                }
                {
                    prop.item.isTV ?
                        <View style={[styles.row, { width: '30%', backgroundColor: COLORS['info-100'], justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                            <Feather name="tv" size={18} />
                            <Text>TV</Text>
                        </View> : null
                }
                <View style={[styles.row, { width: '100%' }]}>
                    <View style={[styles.row, { width: '30%', backgroundColor: COLORS.light, justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                        <Text>Comfort : </Text>
                        <Text>{prop.item.comfortPoint}</Text>
                    </View>
                    <View style={[styles.row, { width: '30%', backgroundColor: COLORS.light, justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                        <Text>Speed : </Text>
                        <Text>{prop.item.speedPoint}</Text>
                    </View>
                    <View style={[styles.row, { width: '30%', backgroundColor: COLORS.light, justifyContent: 'space-around', marginRight: 10, marginBottom: 5, paddingVertical: 5 }]}>
                        <Text>Service : </Text>
                        <Text>{prop.item.servicePoint}</Text>
                    </View>
                </View>
            </View>
            {/* Footer */}
            <View style={[styles.row, { justifyContent: 'space-between', marginTop: 5 }]}>
                <View style={styles.row} >
                    {totalPointRenderWithStarIcons(prop.item.comfortPoint, prop.item.speedPoint, prop.item.servicePoint).map((node) => node)}
                    <Text style={{ marginLeft: 5, fontSize: 12 }} appearance='hint'>{`(${prop.item.votesCount})`}</Text>
                </View>
                <TouchableOpacity onPress={() => handleEditPress(prop.item.id)} style={{ backgroundColor: COLORS['danger-400'], borderRadius: 4, elevation: 4, paddingVertical: 10, paddingHorizontal: 15, height: 'auto' }}>
                    <Text style={{ color: COLORS.light }} >EDIT</Text>
                </TouchableOpacity>
            </View>
        </Card>
    )

    const renderPopoverContent = () => {
        return (
            <TouchableOpacity onPress={() => setFilterDropVisible(true)} style={filterKey !== undefined && styles.activeFilterContainer}>
                <Ionicons name="filter" size={24} color={"black"} />
            </TouchableOpacity>
        );
    }

    const handleOnFilterPress = (index: number) => {
        setFilterKey((index) % 3);
        setFilterDropVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }]}>
                {
                    searchVisible ? (
                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Input
                                accessoryLeft={<AntDesign name='search1' size={20} />}
                                style={[searchInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input, { width: '100%', marginBottom: 0 }]}
                                placeholder='Search Plate'
                                {...searchInputState}
                            />
                            <TouchableOpacity style={{ width: 20, marginLeft: 10 }} onPress={() => setSearchVisible(false)}>
                                <AntDesign name='close' size={20} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <View style={[styles.row, styles.hrBorder, { width: '80%' }]}>
                                <Text category='h6'>Total Vehicle Count of Your Company : </Text>
                                {/* <AntDesign name="right" size={18} style={{ marginTop: 2, marginHorizontal: 4 }} color="black" /> */}
                                <Text category='h6' >{vehicleState.vehiclesCount}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setSearchVisible(true)}>
                                <AntDesign name='search1' size={20} />
                            </TouchableOpacity>
                        </>
                    )
                }
                <View>
                    <Popover style={{ opacity: .75, marginTop: 40 }} visible={filterDropVisible} onBackdropPress={() => setFilterDropVisible(false)} anchor={renderPopoverContent}>

                        <View style={styles.popoverContent}>
                            <View style={styles.popoverArrow} />
                            <View>
                                {
                                    Object.keys(vehicleEnums.VehicleType).filter((key) => Number.isNaN(Number(key)))
                                        .map((key, index) => (
                                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleOnFilterPress(index)} key={key} >
                                                {
                                                    filterKey === index && (
                                                        <FontAwesome5 style={{ marginRight: 20 }} name="check" />
                                                    )
                                                }
                                                <Text>{key}</Text>
                                            </TouchableOpacity>
                                        ))}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { setFilterKey(undefined); setFilterDropVisible(false); }}>
                                    <Text>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Popover>
                </View>
            </View>
            <FlatList
                data={filterKey === undefined ? filteredList : filteredList.filter((v) => v.vehicleType === filterKey)}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyList}
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
    },
    popoverArrow: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: 0,
        height: 0,
        right: 1,
        top: -20,
        borderWidth: 10,
        borderColor: 'transparent',
        borderBottomColor: COLORS['danger-400']
    },
    popoverContent: {
        width: Layout.window.width / 3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS['danger-400'],
        borderTopRightRadius: 2,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    activeFilterContainer: {
        width: 35,
        height: 35,
        backgroundColor: COLORS['danger-500'],
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});

export default MyVehiclesScreen;