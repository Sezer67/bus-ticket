import { Modal, Spinner, Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/redux.hook';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';

const LoadingPopover = () => {
    const { loading } = useAppSelector((state) => state.settings);

    return (
        <Modal
            backdropStyle={styles.backdrop}
            visible={loading.isLoading}
        >
            <View style={styles.content}>
                <Spinner size='giant' />
                {
                    loading.content ? <Text style={styles.text}>{loading.content}</Text> : null
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: Layout.window.width / 2,
        height: Layout.window.width / 5,
        borderRadius: 5
    },
    text: {
        fontWeight: '600',
        fontSize: 14,
        color: COLORS.light,
        marginTop: 10
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default LoadingPopover;
