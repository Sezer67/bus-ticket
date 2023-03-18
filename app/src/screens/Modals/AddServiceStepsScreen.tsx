import { Modal, Text, ViewPager } from '@ui-kitten/components';
import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { RootStackScreenProps } from '../../../types';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import Layout from '../../../constants/Layout';
import { convertHelper, dateHelper } from '../../helpers';
import ServiceDetailForm from '../../components/Forms/ServiceDetailForm';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { serviceOfService } from '../../../service';
import { serviceTypes } from '../../../types/index';
import RouteDetailList from '../../components/RouteDetailList';
type ServiceFormData = {
    departureCity: string;
    arrivalCity: string;
    departureDate?: Date;
    arrivalDate?: Date;
    price?: number
}

const AddServiceStepsScreen = ({ navigation, route }: RootStackScreenProps<'AddServiceStepsModal'>) => {

    const [stepRoutes, setStepRoutes] = useState<ServiceFormData[]>([]);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completedStepCount, setCompletedStepCount] = useState<number>(1);
    const [createdServices, setCreatedServices] = useState<serviceTypes.ServiceType[]>([
        {
            arrivalCity: "Adıyaman",
            arrivalDate: new Date("2023-03-15T23:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adana",
            departureDate: new Date("2023-03-15T21:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "92a4bede-a270-4d45-95a2-e6d3f76f7274",
            price: 250
        },
        {
            arrivalCity: "Adıyaman",
            arrivalDate: new Date("2023-03-15T23:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adana",
            departureDate: new Date("2023-03-15T21:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "92a4bede-a270-4d45-95a2-awed",
            price: 250
        }, {
            arrivalCity: "Adıyaman",
            arrivalDate: new Date("2023-03-15T23:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adana",
            departureDate: new Date("2023-03-15T21:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "92a4bede-a270-4d45-95a2-asdsddsad",
            price: 250
        },
        {
            arrivalCity: "Adıyaman",
            arrivalDate: new Date("2023-03-15T23:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adana",
            departureDate: new Date("2023-03-15T21:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "92a4bede-a270-4d45-95a2-e6d3f76f7asd",
            price: 250
        },
        {
            arrivalCity: "Afyonkarahisar",
            arrivalDate: new Date("2023-03-16T02:00:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adana",
            departureDate: new Date("2023-03-15T21:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "6bf3257f-8341-48fe-91b1-7f0d393fcd10",
            price: 350
        },
        {
            arrivalCity: "Ağrı",
            arrivalDate: new Date("2023-03-16T04:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adana",
            departureDate: new Date("2023-03-15T21:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "9ebebdb6-1523-4614-934e-14393b0798b9",
            price: 500
        },
        {
            arrivalCity: "Afyonkarahisar",
            arrivalDate: new Date("2023-03-16T02:00:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adıyaman",
            departureDate: new Date("2023-03-15T23:30:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "c3efab04-1d26-49dd-bdbc-f91a55e10882",
            price: 250
        },
        {
            arrivalCity: "Ağrı",
            arrivalDate: new Date("2023-03-16T04:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Adıyaman",
            departureDate: new Date("2023-03-15T23:30:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "fd13a5d4-8675-448b-ac44-85e1ef4d1073",
            price: 500
        },
        {
            arrivalCity: "Ağrı",
            arrivalDate: new Date("2023-03-16T04:30:00.000Z"),
            baseServiceId: "93f2066f-f085-4b30-a9cb-d0f062444dda",
            departureCity: "Afyonkarahisar",
            departureDate: new Date("2023-03-16T02:00:00.000Z"),
            filledSeats: [
                "[]"
            ],
            id: "cce5a6f2-1335-4e20-9b48-7435c2e67d40",
            price: 300
        }
    ]);
    const [outputModalVisible, setOutputVisible] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const res = convertHelper.convertRouteToSteps(route.params.route);
        setStepRoutes(res.map((val) => {
            return {
                ...val,
                arrivalDate: undefined,
                departureDate: undefined,
                price: undefined
            }
        }));
    }, [route.params])

    const progressWidth = useMemo(() => {
        return `${(completedStepCount / stepRoutes.length) * 100}%`
    }, [completedStepCount]);

    const formStateFill = (data: ServiceFormData[]) => {
        let resultArr: ServiceFormData[] = [];
        data.forEach((item) => {
            if (item.departureDate) {
                const array = resultArr.length > 0 ? [...resultArr] : [...data];
                resultArr = array.map((d) => {
                    if (d.departureCity === item.departureCity) {
                        return {
                            ...d,
                            departureDate: item.departureDate,
                        }
                    }
                    return d;
                })
            }
            if (item.arrivalDate) {
                const array = resultArr.length > 0 ? [...resultArr] : [...data]
                resultArr = array.map((d) => {
                    if (d.arrivalCity === item.arrivalCity) {
                        return {
                            ...d,
                            arrivalDate: item.arrivalDate,
                        }
                    }
                    return d;
                })
            }
        });
        return resultArr;
    }

    const handleNextStepForRouteStations = (data?: {
        departureDate: Date,
        arrivalDate: Date,
        price: number
    }) => {
        const currentStep = activeStep;
        if (activeStep + 1 < stepRoutes.length) {
            setActiveStep(currentStep + 1);
        }
        if (data) {
            const form = stepRoutes.map((route, index) => {
                if (index === currentStep) {
                    return {
                        ...route,
                        ...data
                    }
                }
                return route;
            });
            const newStepRoutes = formStateFill(form);
            setStepRoutes(newStepRoutes);
            setCompletedStepCount((prev) => prev + 1);
        }
    }

    const createMultipleServiceRequest = async () => {
        try {
            dispatch(settingsActions.setLoading({ isLoading: true, content: 'Service is being created' }));
            console.log("gönderilen data : ", stepRoutes);
            // @ts-ignore
            const { data } = await serviceOfService.createMultipleService({ datas: stepRoutes, baseServiceId: route.params.baseServiceId });
            console.log(data);
            setCreatedServices(data);
            setOutputVisible(true);
        } catch (error: any) {
            if (typeof error.response?.data.message === "string") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
        } finally {
            dispatch(settingsActions.setLoading({ isLoading: false, content: '' }))
        }
    }

    const renderServiceItem = (prop: { item: serviceTypes.ServiceType, index: number }) => (
        <View>
            <View>
                <Text category='h6' style={{}} >{prop.item.departureCity} - {prop.item.arrivalCity}</Text>
            </View>
            <View>
                <Text>{dateHelper.formattedDate(new Date(prop.item.arrivalDate), "Day Month Date Year HH:mm")}</Text>
                <Text>{dateHelper.formattedDate(new Date(prop.item.departureDate), "Day Month Date Year HH:mm")}</Text>
                <Text>{prop.item.price} ₺</Text>
            </View>
        </View>
    )

    useEffect(() => {
        let control = false;

        for (let i = 0; i < stepRoutes.length; i++) {
            const ctrl = !!(stepRoutes[i].departureDate && stepRoutes[i].arrivalDate && stepRoutes[i].price)
            if (ctrl) {
                control = true;
            } else {
                control = false;
                break;
            }
        }
        if (control)
            createMultipleServiceRequest();
    }, [completedStepCount])

    return (
        <View style={styles.container}>
            <View style={styles.customHeader}>
                <Text category='h5'>Route Stations</Text>

                <TouchableOpacity onPress={() => navigation.navigate("Root")}>
                    <FontAwesome name="close" size={22} color={COLORS['danger-600']} />
                </TouchableOpacity>
                <View style={styles.bar} />
                <View style={[styles.completedBar, { width: progressWidth }]} />
            </View>
            <View style={styles.stepsContainer}>
                <View style={styles.stepLeft}>
                    {
                        stepRoutes.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => setActiveStep(index)} style={[styles.stepButton, index === activeStep ? { backgroundColor: COLORS['danger-500'] } : {}]} key={index.toString()}>
                                    <Text style={{ color: COLORS.light }}>
                                        Step {index + 1}
                                    </Text>
                                </TouchableOpacity >
                            )
                        })
                    }
                </View>
                <View style={styles.stepRight}>
                    <ViewPager
                        style={{ flex: 1 }}
                        selectedIndex={activeStep}
                        shouldLoadComponent={(index) => index === activeStep}
                        onSelect={(index) => setActiveStep(index)}
                    >
                        {
                            stepRoutes.map((item, index) => {
                                return (
                                    <View style={{ paddingHorizontal: 15, flex: 1, marginBottom: 10 }} key={index.toString()} >
                                        <Text category='h4' style={{}} >{item.departureCity} - {item.arrivalCity}</Text>
                                        <View style={styles.formContainer}>
                                            <ServiceDetailForm
                                                key={index.toString()}
                                                isEdit={false}
                                                isEnd={activeStep + 1 === stepRoutes.length}
                                                nextStep={handleNextStepForRouteStations}
                                                data={stepRoutes[activeStep]}
                                            />
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ViewPager>
                </View>
            </View>
            <Modal
                visible={outputModalVisible}
                backdropStyle={styles.backdrop}
                style={styles.modalContainer}
            >
                <RouteDetailList data={createdServices} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    customHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 20,
        height: 80,
    },
    bar: {
        height: 4,
        width: Layout.window.width,
        backgroundColor: COLORS.disabledColor,
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    completedBar: {
        height: 4,
        width: 0,
        backgroundColor: COLORS['danger-500'],
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    stepsContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    stepLeft: {
        height: '100%',
        width: 100,
        borderRightWidth: 1,
        borderRightColor: COLORS['danger-400'],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        zIndex: 9999
    },
    stepRight: {
        width: Layout.window.width - 101,
        height: '100%',
        marginTop: 20
    },
    stepButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.dark,
        marginBottom: 10,
        elevation: 3,
        borderRadius: 4
    },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 20,
    }, backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: Layout.window.width * 4 / 5,
        maxHeight: Layout.window.height * 3 / 5,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 10,
        borderRadius: 5
    }
})

export default AddServiceStepsScreen;