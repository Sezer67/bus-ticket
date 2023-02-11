import { Button, Text, Modal } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';

type PropsType = {
    data: { id: number, name: string }[];
    isVisible: boolean;
    setVisible: (value: boolean) => void;
}


const SelectCityModal: React.FC<PropsType> = ({ data, isVisible, setVisible }) => {
    const renderItem = (prop: { item: { id: number, name: string }, index: number }) => (
        <TouchableOpacity style={styles.item} key={prop.item.id}  >
            <Text appearance='hint' style={{ color: COLORS.gray }}>{prop.item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <Modal style={styles.container} visible={isVisible} onTouchCancel={() => setVisible(false)} >
                <FlatList
                    style={styles.listStyle}
                    data={data}
                    renderItem={renderItem}
                    horizontal={false}
                    numColumns={3}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width * 4 / 5,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    listStyle: {
        maxHeight: (Layout.window.height / 2) - 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: Layout.window.width * 4 / 16,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        display: 'flex',
        marginRight: 3,
        color: COLORS['info-600']
    }
})

export default SelectCityModal;