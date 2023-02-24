import React, { useEffect } from 'react'
import { RootStackScreenProps } from '../../../types'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Button, Card, Text } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ServicesScreen = ({ navigation, route }: RootStackScreenProps<'Services'>) => {

    // yapılan sorgu verileri redux da filter state olarak tutulsun.
    // tepede sorgu verilerimiz listelenecek.

    const mockServices = [
        {
            id: 'asdf',
            company: 'METRO',
            price: 250,
            seat: '2+1',
            arrivalTime: '8',
            departureTime: '23:00',
            departureCity: 'İzmir',
            arrivalCity: 'Ankara',
            routeDetail: ['İzmir', 'Ankara', 'istanbul']
        },
        {
            id: 'asdsdf',
            company: 'KAMILKOC',
            price: 250,
            seat: '2+1',
            arrivalTime: '8',
            departureTime: '23:15',
            departureCity: 'İzmir',
            arrivalCity: 'Ankara',
            routeDetail: ['İzmir', 'Ankara', 'istanbul']
        },
        {
            id: 'aassdf',
            company: 'BASKENT TURIZM',
            price: 250,
            seat: '2+1',
            arrivalTime: '8',
            departureTime: '23:30',
            departureCity: 'İzmir',
            arrivalCity: 'Ankara',
            routeDetail: ['İzmir', 'Ankara', 'istanbul']
        }
    ]

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: COLORS['danger-400']
            }
        })
    }, [])



    const renderItem = (prop: { item: any, index: number }) => (
        <Card status={prop.index % 2 === 0 ? "warning" : "danger"} style={{ marginBottom: 10 }}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <Text category='h6' style={{ paddingLeft: 10 }}>{prop.item.company}</Text>
                <Text category='h6' style={{ paddingRight: 10 }} >{prop.item.departureTime}</Text>
            </View>
            {/* Content */}
            <View style={styles.cardContent}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="seatbelt" size={24} color={COLORS.gray} />
                    <Text style={styles.contentText}>{prop.item.seat}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="highway" size={24} color={COLORS.gray} />
                    <Text style={styles.contentText}>{prop.item.departureCity} - {prop.item.arrivalCity}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="clock-outline" size={24} color={COLORS.gray} />
                    <Text style={styles.contentText}>{prop.item.arrivalTime} hours</Text>
                </View>
            </View>
            {/* Footer */}
            <View style={styles.cardFooter}>
                <Button appearance='ghost'>Show Service</Button>
                <Text category='h6' style={{ paddingRight: 10 }} appearance='hint'>{prop.item.price} TL</Text>
            </View>
        </Card>
    )

    const _footer = () => (
        <View>
            <TouchableOpacity style={styles.footerButton}>
                <Text style={{ color: '#fff', fontWeight: '700', marginRight: 10 }}>NEXT DAY</Text>
                <MaterialCommunityIcons name='arrow-right-bottom-bold' size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.screen}>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <View>
                    <Text>Filtrelenen gün yol vs.</Text>
                </View>
                <FlatList
                    data={mockServices}
                    renderItem={renderItem}
                    ListFooterComponent={_footer}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 10
    },
    cardHeader: {
        width: '100%',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardFooter: {
        width: '100%',
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, cardContent: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    contentText: {
        color: '#000',
        fontSize: 12,
    }, footerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: COLORS['danger-400']
    }
})

export default ServicesScreen