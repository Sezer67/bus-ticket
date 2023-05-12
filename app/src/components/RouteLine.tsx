import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

type PropsType = {
    children: React.ReactNode;
    icon: string;
}

const RouteLine: React.FC<PropsType> = ({ children, icon }) => {
    return (
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {/* <View style={{ width: '7%', height: '75%', display: 'flex', flexDirection: 'column' }}>
                <MaterialCommunityIcons name="map-marker-radius" size={20} color="black" />
                <View style={{ marginTop: 4, height: 20, width: 10, borderRightWidth: 1, borderColor: 'red', borderStyle: 'dotted' }} />

                <View style={{ marginTop: 6, marginBottom: 10 }}>
                    <MaterialCommunityIcons name={icon as never} size={20} color="black" />
                </View>

                <View style={{ height: 20, width: 10, marginBottom: 5, borderRightWidth: 1, borderColor: 'red', borderStyle: 'dotted' }} />
                <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="black" />
            </View> */}
            <View style={{ width: '93%' }}>
                {children}
            </View>
        </View>
    )
}

export default RouteLine;