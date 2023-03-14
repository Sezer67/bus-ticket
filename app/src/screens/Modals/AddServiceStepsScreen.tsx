import { Text, ViewPager } from '@ui-kitten/components';
import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../../../types';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import Layout from '../../../constants/Layout';
import { convertHelper } from '../../helpers';
import ServiceDetailForm from '../../components/Forms/ServiceDetailForm';
const AddServiceStepsScreen = ({ navigation, route }: RootStackScreenProps<'AddServiceStepsModal'>) => {

    const [stepRoutes, setStepRoutes] = useState<{ departureCity: string, arrivalCity: string }[]>([]);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completedStepCount, setCompletedStepCount] = useState<number>(0);

    useEffect(() => {
        const res = convertHelper.convertRouteToSteps(route.params.route);
        setStepRoutes(res);
    }, [route.params])

    const progressWidth = useMemo(() => {
        return `${(activeStep / stepRoutes.length) * 100}%`
    }, [activeStep]);

    return (
        <View style={styles.container}>
            <View style={styles.customHeader}>
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
                                    <View style={{ alignItems: 'center', paddingHorizontal: 15, flex: 1, marginBottom: 10 }} key={index.toString()} >
                                        <Text category='h4' style={{}} >{item.departureCity} - {item.arrivalCity}</Text>
                                        <View style={styles.formContainer}>
                                            <ServiceDetailForm key={index.toString()} isEdit={false} />
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ViewPager>
                </View>
            </View>
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
        justifyContent: 'flex-end',
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
        paddingHorizontal: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
})

export default AddServiceStepsScreen;