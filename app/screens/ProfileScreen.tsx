import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { RootTabScreenProps } from '../types';
import { COLORS, images } from '../constants';
import { Text, ViewPager } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import Layout from '../constants/Layout';
import UserDetailForm from '../components/Forms/UserDetailForm';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';
const ProfileScreen = ({ navigation, route }: RootTabScreenProps<'Profile'>) => {

    const [activePageIndex, setActivePageIndex] = useState<0 | 1>(0);

    useEffect(() => {
        navigation.setOptions({ title: 'Sezer Kenar' })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <View style={[styles.tabBarContainer,]}>
                <TouchableOpacity onPress={() => setActivePageIndex(0)} style={[styles.tabBar, activePageIndex === 0 && styles.activeTab]}>
                    <Text style={activePageIndex === 0 && styles.activeText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActivePageIndex(1)} style={[styles.tabBar, activePageIndex === 1 && styles.activeTab]}>
                    <Text style={activePageIndex === 1 && styles.activeText}>Change Password</Text>
                </TouchableOpacity>
            </View>

            <ViewPager
                style={{ flex: 1 }}
                selectedIndex={activePageIndex}
                onSelect={(index) => setActivePageIndex(index as never)}
            >
                <View style={styles.tabContainer}>
                    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Image style={styles.profileImage} borderRadius={100} resizeMethod='resize' resizeMode='cover' source={images.plane} />
                    </View>
                    <View style={styles.form}>
                        <UserDetailForm isEdit isDisable />
                    </View>
                </View>
                <View style={styles.tabContainer}>
                    <ChangePasswordForm />
                </View>
            </ViewPager>


        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    tabBarContainer: {
        width: Layout.window.width,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderTopColor: COLORS.light,
        borderBottomColor: COLORS.gray,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    tabBar: {
        width: Layout.window.width / 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    activeTab: {
        backgroundColor: COLORS['danger-400']
    },
    activeText: {
        color: COLORS.light
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        elevation: 2
    },
    tabContainer: {
        paddingHorizontal: 20,
        flex: 1
    },
    form: {
        flex: 1,
        padding: 20,
    }
})

export default ProfileScreen;