import React, { useEffect } from 'react'
import { RootStackScreenProps } from '../../../types'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Button, Card, Text } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../../constants'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '../../../hooks/redux.hook'
import { ReduxRootType } from '../../../types/redux-slice.type'
import { ServiceType } from '../../../types/service.type'
import { dateHelper } from '../../helpers'
import Layout from '../../../constants/Layout'
import Accordion from '../../components/Accordion'

const ServicesScreen = ({ navigation, route }: RootStackScreenProps<'Services'>) => {

    // yapılan sorgu verileri redux da filter state olarak tutulsun.
    // tepede sorgu verilerimiz listelenecek.
    const serviceState = useAppSelector((state:ReduxRootType) => state.service);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: COLORS['danger-400']
            }
        })
    }, [])

    const renderRoute = (route:string, start:string, end:string) => {
        const _renderItem = ({item,index}:{item:string,index:number}) => {
            return (
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {
                        start === item || end === item ? (
                            <Entypo name='dot-single' size={24} color={COLORS['primary-400']} />
                        ) : null
                    }
                    <Text style={start === item || end === item ? {color: COLORS['primary-400']} : {paddingLeft:24}}>{item}</Text>
                </View>
            )
        }
        return (
            <FlatList 
                data={route.split(",")}
                keyExtractor={(item) => item}
                renderItem={_renderItem}
            />
        )
    }

    const renderItem = (prop: { item: ServiceType, index: number }) => {
        const arrivalTime = dateHelper.hourDifference(new Date(prop.item.departureDate), new Date(prop.item.arrivalDate));

        return (
            <Card status={prop.index % 2 === 0 ? "warning" : "danger"} style={{ marginBottom: 10 }}>
                {/* Header */}
                <View style={styles.cardHeader}>
                    <Text category='h6' style={{ paddingLeft: 10 }}>{prop.item.companyName}</Text>
                    <Text category='h6' style={{ paddingRight: 10 }} >{dateHelper.formattedDate(new Date(prop.item.departureDate),"HH:mm")}</Text>
                </View>
                {/* Content */}
                <View style={styles.cardContent}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="seatbelt" size={24} color={COLORS.gray} />
                        <Text style={styles.contentText}>{prop.item.seat}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="highway" size={24} color={COLORS.gray} />
                        <Text numberOfLines={2} style={styles.contentText}>{prop.item.departureCity} - {prop.item.arrivalCity}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="clock-outline" size={24} color={COLORS.gray} />
                        <Text style={styles.contentText}>{arrivalTime}</Text>
                    </View>
                </View>
                {/* Footer */}
                <View style={styles.cardFooter}>
                    <View>
                        <Accordion 
                            title={
                                <Text style={{...Layout.FONTS.h2,fontWeight:'700', color:COLORS['primary-500'],marginRight:10}}>Show Service Route</Text>
                            }
                            children={
                                renderRoute(prop.item.route,prop.item.departureCity,prop.item.arrivalCity)
                            }
                        />
                    </View>
                    <Text category='h6' style={{ paddingRight: 10,paddingTop:15 }} appearance='hint'>{prop.item.price} TL</Text>
                </View>
            </Card>
        )
    }

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
                    data={serviceState.serviceList}
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
        alignItems: 'flex-start',
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
        maxWidth: (Layout.window.width - 10 ) / 3,
        textAlign:'center'
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