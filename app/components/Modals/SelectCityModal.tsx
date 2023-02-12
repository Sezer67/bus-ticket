import { Button, Text, Modal } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

type PropsType = {
    data: { id: number, name: string }[];
    isVisible: boolean;
    setVisible: (value: boolean) => void;
    setValue: (value: string) => void;
}


const SelectCityModal: React.FC<PropsType> = ({ data, isVisible, setVisible, setValue }) => {

    const onPressCity = (name: string) => {
        setValue(name);
        setVisible(false);
    }

    const renderItem = (prop: { item: { id: number, name: string }, index: number }) => (
        <TouchableOpacity style={[styles.item, { marginRight: prop.index % 2 === 1 ? 0 : 15 }]} key={prop.item.id} onPress={() => onPressCity(prop.item.name)} >
            <View style={styles.number}>
                <Text>{prop.item.id}</Text>
            </View>
            <Text style={{ color: COLORS.gray }}>{prop.item.name}</Text>

        </TouchableOpacity>
    )


    return (
        <Modal style={styles.container} backdropStyle={styles.backdrop} visible={isVisible}  >
            <View style={styles.headerContainer}>
                <Text category='h5' >Select City</Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <MaterialIcons name='cancel' color={COLORS['danger-700']} size={24} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.listStyle}
                data={data}
                renderItem={renderItem}
                horizontal={false}
                numColumns={2}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width * 4 / 5,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 10,
        borderRadius: 5
    },
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: COLORS['danger-700'],
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 5,
    },
    listStyle: {
        maxHeight: (Layout.window.height / 2) - 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: (Layout.window.width * 4 / 10) - 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    number: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: COLORS['danger-300'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 5

    }, backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default SelectCityModal;