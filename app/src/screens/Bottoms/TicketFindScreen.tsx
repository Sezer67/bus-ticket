import { StyleSheet, View, ImageBackground } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import Layout from '../../../constants/Layout';
import { useState, useMemo, useEffect } from 'react';
import { Text } from '@ui-kitten/components';
import { ticketFindConfigs } from '../configs';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, images } from '../../../constants';
import TicketFindForm from '../../components/Forms/TicketFindForm';
import { StatusBar } from 'expo-status-bar';

export default function TicketFindScreen({ navigation }: RootStackScreenProps<'TicketFind'>) {

    const [activeTab, setActiveTab] = useState<number>(0);
    const bgImage = useMemo<string>(() => {
        if (ticketFindConfigs.TabItems[activeTab].image)
            return ticketFindConfigs.TabItems[activeTab].image;
        return images.bus;
    }, [activeTab]);

    return (
        <View style={styles.container}>
            <StatusBar style={'light'} />
            <ImageBackground style={styles.coloredArea} resizeMode='cover' source={bgImage as never} ></ImageBackground>
            <View style={styles.itemContainer}>
                <View style={styles.tabContainer}>
                    <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
                </View>
                <Text appearance='hint' style={styles.title} >Ticket Find</Text>
                <View style={styles.separator} />
                <View style={styles.formContainer}>
                    <TicketFindForm
                        ticketType={ticketFindConfigs.TabItems[activeTab].id}
                        key={activeTab}
                        routeLineIcon={ticketFindConfigs.TabItems[activeTab].routeIcon}
                        submitButtonText={ticketFindConfigs.TabItems[activeTab].submitButtonText}
                    />
                </View>
            </View>
        </View>
    );
}

const TabComponent: React.FC<{ activeTab: number, setActiveTab: (x: number) => void }> = ({ activeTab, setActiveTab }) => {

    return (
        <>
            {ticketFindConfigs.TabItems.map((item) => {
                return (
                    <View onTouchStart={() => setActiveTab(item.id)} style={[styles.tabs, activeTab === item.id && styles.activeTab]} key={item.id}>
                        <Text style={[styles.tabText, activeTab === item.id && styles.activeTabText]}>{item.name.toUpperCase()}</Text>
                        <FontAwesome name={item.icon as never} size={25} style={activeTab === item.id && { color: COLORS['danger-900'] }} />
                    </View>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20
    },
    itemContainer: {
        flex: 1,
        width: Layout.window.width,
        top: (Layout.window.height / 3) - 60,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tabContainer: {
        width: Layout.window.width * 4 / 5,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 5,
        elevation: 4,
        height: 80,
        marginBottom: 20
    },
    formContainer: {
        height: '100%',
        width: Layout.window.width * 4 / 5
    },
    tabs: {
        marginRight: 2,
        flex: 1 / 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        borderRadius: 5
    },
    tabText: {
        fontSize: Layout.FONTS.body3.fontSize,
        fontWeight: '700'
    },
    activeTab: {
        backgroundColor: COLORS['danger-400']
    },
    activeTabText: {
        fontSize: Layout.FONTS.body3.fontSize,
        color: COLORS.light,
        fontWeight: '700'

    },
    coloredArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: Layout.window.height / 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS['danger-600']
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: Layout.window.width * 3 / 4,
        backgroundColor: COLORS['danger-400']

    },
});
