import { Button, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import { COLORS } from '../../../constants';
import { serviceOfService, vehicleService } from '../../../service';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { VehicleType } from '../../../types/vehicle.type';
import EmptyList from '../../components/EmptyList';
import VehicleTypeIcon from '../../components/VehicleModels/TypeIcon';
import Layout from '../../../constants/Layout';
import { FontAwesome } from '@expo/vector-icons';
import SelectCityModal from '../../components/Modals/SelectCityModal';
import cities from '../../../static-files/cities_of_turkey.json'
import { arrayIndexChange } from '../../helpers';
import { serviceActions } from '../../redux/service/slice';
import { vehicleEnums } from '../../../enums';


const AddServiceScreen = ({ navigation, route }: RootStackScreenProps<'AddServiceModal'>) => {

    const [vehicles, setVehicles] = useState<Pick<VehicleType, "id" | "plate" | "vehicleType">[]>([]);
    const [form, setForm] = useState<{ id: string, route: string[], }>({ id: "", route: [] });
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [cityModalVisible, setCityModalVisible] = useState<boolean>(false);
    const [filterCities, setFilterCities] = React.useState<{ id: number, name: string }[]>(cities);

    const dispatch = useAppDispatch();
    const colorPalette = [COLORS['danger-100'], COLORS['primary-100'], COLORS['warning-100'], COLORS['info-100'], COLORS['success-100']];

    useEffect(() => {
        navigation.setOptions({
            title: 'Create Service',
            headerStyle: {
                backgroundColor: COLORS['danger-400'],
            }
        })
    }, []);

    useEffect(() => {
        const getVehicles = async () => {
            try {
                dispatch(settingsActions.setLoading({ isLoading: true, content: 'loading...' }));
                const { data } = await vehicleService.lookup({ select: ['plate', 'id', 'vehicleType'] });

                setVehicles(data.rows);
            } catch (error: any) {
                if (typeof error.response?.data.message === "string") {
                    dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
                } else if (typeof error.response?.data.message === "object") {
                    dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
                } else {
                    dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
                }
            } finally {
                dispatch(settingsActions.setLoading({ isLoading: false, content: '' }));
            }
        }
        getVehicles();
    }, [])

    useEffect(() => {
        if (selectedCity.trim().length > 0) {
            setForm({
                ...form,
                route: [...form.route, selectedCity]
            });
            setFilterCities(
                filterCities.filter((city) => city.name !== selectedCity)
            );
            setSelectedCity("");
        }
    }, [selectedCity])

    const handlePressVehicleItem = (id: string) => {
        setForm({ ...form, id });
    }

    const handlePressStationAdd = () => {
        if (!form.id) {
            dispatch(settingsActions.setErrorSnackbar({ isError: true, content: 'Please select vehicle first.' }))
            return;
        }
        setCityModalVisible(true);
    }

    const handlePressRouteItemDelete = (name: string) => {
        const newRoutes = form.route.filter((val) => val !== name);
        setForm({
            ...form,
            route: newRoutes
        });
        setFilterCities(cities.filter((city) => !newRoutes.includes(city.name)));
    }


    const handlePressRouteItemUp = (index: number) => {
        // name in index i ile bir üstündekinin index i yer değiştirmeli
        setForm({
            ...form,
            route: arrayIndexChange(form.route, index, index - 1)
        });
    }

    const handleSubmit = async () => {
        if (form.route.length < 2) {
            dispatch(settingsActions.setErrorSnackbar({ isError: true, content: 'Minimum 2 stations are required' }))
            return;
        }
        try {
            const { data } = await serviceOfService.createBaseService({ vehicleId: form.id, route: form.route.join(",") });
            const selectedVehicle = vehicles.find((v) => v.id === form.id);
            dispatch(serviceActions.addBaseService({
                ...data,
                vehicle: {
                    id: form.id,
                    plate: selectedVehicle?.plate || " ",
                    vehicleType: selectedVehicle?.vehicleType || vehicleEnums.VehicleType.Bus
                }
            }));
            navigation.navigate('AddServiceStepsModal', {
                baseServiceId: data.id,
                route: data.route
            });
        } catch (error: any) {
            console.log(error);
            if (typeof error.response?.data.message === "string") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
        }
    }


    const renderPlate = (prop: { item: Pick<VehicleType, "id" | "plate" | "vehicleType"> }) => (
        <TouchableOpacity onPress={() => handlePressVehicleItem(prop.item.id)} style={[form.id === prop.item.id ? styles.selectedItem : null, { borderBottomColor: COLORS['danger-200'], borderBottomWidth: 1, marginBottom: 10 }]}>
            <View style={styles.row}>
                {
                    form.id === prop.item.id ? <FontAwesome name='check' size={20} color={COLORS.dark} /> : null
                }
                <Text category='h6'>{prop.item.plate.toUpperCase()}</Text>
                <VehicleTypeIcon type={prop.item.vehicleType} color='dark' />
            </View>
        </TouchableOpacity>
    )

    const renderRoute = (prop: { item: string, index: number }) => (
        <View style={[styles.routeItemContainer, { backgroundColor: colorPalette[prop.index % colorPalette.length] }]}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginRight: 5, ...Layout.FONTS.body2 }}>{prop.index + 1}. {prop.item}</Text>
                <Text style={{ ...Layout.FONTS.body2 }} appearance='hint'>{prop.index === 0 ? "(First Station)" : prop.index + 1 === form.route.length ? "(Last Station)" : ""}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {
                    prop.index !== 0 ?
                        (
                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => handlePressRouteItemUp(prop.index)}>
                                <FontAwesome name="arrow-circle-o-up" size={24} />
                            </TouchableOpacity>
                        )
                        : null
                }
                <TouchableOpacity onPress={() => handlePressRouteItemDelete(prop.item)}>
                    <FontAwesome name="close" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )

    // bu ekranda araçları çekilecek ve route istenecek

    return (
        <View style={styles.container}>

            <View style={styles.formContainer}>
                <View
                    style={{ height: Layout.window.height / 3, width: '100%' }}
                >
                    <Text appearance='hint' category='h6' style={{ marginBottom: 10, fontWeight: '700', }}>Select Vehicle of This Service</Text>
                    <FlatList
                        data={vehicles}
                        ListEmptyComponent={<EmptyList text='Your company has not vehicle' mt={20} imageW={128} />}
                        renderItem={renderPlate}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <Text appearance='hint' category='h6' style={{ marginBottom: 10, fontWeight: '700' }}>Route Information</Text>
                    <Button appearance='outline' status='danger' style={styles.button} onPress={handlePressStationAdd}>Add Station</Button>
                </View>
                {
                    form.route.length > 0 ? (
                        <View style={{ flex: 1, width: '100%', marginTop: 10, marginBottom: 25 }}>
                            <FlatList
                                data={form.route}
                                renderItem={renderRoute}
                            />
                            <TouchableOpacity
                                style={[styles.buttonT, { marginTop: 10 }]}
                                onPress={handleSubmit}
                            >
                                <Text style={{ fontWeight: '700', color: COLORS['primary-400'], marginRight: 15 }}>Next Step</Text>
                                <FontAwesome name='arrow-right' size={16} style={{}} color={COLORS['primary-500']} />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

                <SelectCityModal key="create-service" isVisible={cityModalVisible} setVisible={setCityModalVisible} data={filterCities} setValue={setSelectedCity} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 40,
        marginTop: 40,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingBottom: 5,
        paddingHorizontal: 10
    },
    routeItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10
    },
    selectedItem: {
        backgroundColor: COLORS['danger-300'],
        paddingVertical: 10,
        borderRadius: 4,
    },
    button: {
        width: '100%',
        borderWidth: 0,
        alignItems: 'center'
    },
    buttonT: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: COLORS['primary-100'],
        justifyContent: 'center',
        borderRadius: 5
    }
});

export default AddServiceScreen;