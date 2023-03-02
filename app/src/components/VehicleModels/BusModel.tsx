import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../constants';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';
import Layout from '../../../constants/Layout';

const mockArr = [
    {
        number: 1,
        isFilled: false,
    },
    {
        number: 2,
        isFilled: true,
    },
    {
        number: 3,
        isFilled: false,
    },
    {
        number: 4,
        isFilled: false,
    },
    {
        number: 5,
        isFilled: false,
    },
    {
        number: 6,
        isFilled: true,
    },
    {
        number: 7,
        isFilled: true,
    },
    {
        number: 8,
        isFilled: false,
    },
    {
        number: 9,
        isFilled: false,
    },
    {
        number: 10,
        isFilled: true,
    },
    {
        number: 11,
        isFilled: false,
    },
    {
        number: 12,
        isFilled: true,
    },
    {
        number: 13,
        isFilled: false,
    },
    {
        number: 14,
        isFilled: true,
    },
    {
        number: 15,
        isFilled: false,
    },
    {
        number: 16,
        isFilled: false,
    },
    {
        number: 17,
        isFilled: false,
    },
    {
        number: 18,
        isFilled: true,
    },
    {
        number: 19,
        isFilled: false,
    },
    {
        number: 20,
        isFilled: false,
    },
    {
        number: 21,
        isFilled: true,
    },
    {
        number: 22,
        isFilled: false,
    },
    {
        number: 23,
        isFilled: true,
    },
    {
        number: 24,
        isFilled: true,
    },
    {
        number: 25,
        isFilled: true,
    },
    {
        number: 26,
        isFilled: false,
    },
    {
        number: 27,
        isFilled: false,
    },
    {
        number: 28,
        isFilled: false,
    },
    {
        number: 29,
        isFilled: true,
    },
    {
        number: 30,
        isFilled: false,
    },
    {
        number: 31,
        isFilled: false,
    },
    {
        number: 32,
        isFilled: false,
    },
    {
        number: 33,
        isFilled: false,
    }, {
        number: 34,
        isFilled: false,
    },
    {
        number: 35,
        isFilled: false,
    }, {
        number: 36,
        isFilled: false,
    },
    {
        number: 37,
        isFilled: false,
    }, {
        number: 38,
        isFilled: false,
    },
    {
        number: 39,
        isFilled: false,
    },
]

// props => araç koltuk planı, user tarafından görüntülenme için doluluk arrayi, isCustomer ? 
// todo => user tarafı için koltuk seçme işlemi
// vehicle için redux yazılacak.
const BusModel = () => {

    const seatWithNumber = (prop: { isFilled: boolean, number: number }) => (
        <View style={{ height: 36, width: 36, margin: 3, borderWidth: 1, borderRadius: 3, borderColor: COLORS['danger-400'], justifyContent: 'center', alignItems: 'center' }} key={prop.number}>
            <Text >{prop.number.toString()}</Text>
        </View>
    )

    const extraSeats = () => {
        if (mockArr.length % 3 === 1) {
            return (
                <View style={{ height: '100%' }}>
                    {seatWithNumber({ isFilled: mockArr[mockArr.length - 1].isFilled, number: mockArr[mockArr.length - 1].number })}
                </View>
            )
        }
        else {
            return (
                <View style={{ height: '100%' }}>
                    {seatWithNumber({ isFilled: mockArr[mockArr.length - 1].isFilled, number: mockArr[mockArr.length - 1].number })}
                    {seatWithNumber({ isFilled: mockArr[mockArr.length - 2].isFilled, number: mockArr[mockArr.length - 2].number })}
                </View>
            )
        }
    }

    return (
        <ScrollView horizontal style={styles.container}>
            <View style={styles.driverContainer}>
                <MaterialCommunityIcons name="steering" size={32} color={COLORS.gray} />
            </View>
            <View style={styles.passengerContainer}>
                <View style={{ flexDirection: 'row', height: '100%', }}>
                    {mockArr.map((item) => {
                        if (item.number % 3 === 0) {
                            return (
                                <View key={item.number.toString()} style={{ height: '100%' }}>
                                    {seatWithNumber({ isFilled: mockArr[item.number - 3].isFilled, number: mockArr[item.number - 3].number })}
                                    {seatWithNumber({ isFilled: mockArr[item.number - 2].isFilled, number: mockArr[item.number - 2].number })}
                                    <View style={{ position: 'absolute', bottom: 0 }}>
                                        {seatWithNumber({ isFilled: mockArr[item.number - 1].isFilled, number: mockArr[item.number - 1].number })}
                                    </View>
                                </View>
                            )
                        }
                    })}
                    {
                        mockArr.length % 3 !== 0 ? extraSeats() : null
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.disabledColor,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: 'transparent',
        borderRadius: 10
    },
    driverContainer: {
        height: 140,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginRight: 5
    },
    passengerContainer: {
        flexDirection: 'column',
        height: 140,
        justifyContent: 'space-between',
        paddingRight: 20
    },
    smallNumber: {
        position: 'absolute',
        right: 14,
        top: 4.5,
        fontSize: 14
    }
})

export default BusModel;