import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { serviceOfService } from '../../../service';
import EmptyList from '../../components/EmptyList';
import BaseServiceWithServicesItem from '../../components/BaseServiceWithServicesItem';
import { defaultPageSize } from '../../../configs';
import { serviceActions } from '../../redux/service/slice';
import { ReduxRootType } from '../../../types/redux-slice.type';

const MyServicesScreen = ({ navigation, route }: RootTabScreenProps<'MyServices'>) => {

    const [page, setPage] = useState<number>(0);

    const serviceState = useAppSelector((state: ReduxRootType) => state.service);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getMyServices = async () => {
            try {
                dispatch(settingsActions.setLoading({ isLoading: true, content: 'Your Service Data initializing...' }));
                const { data } = await serviceOfService.baseServiceLookup({ relations: ["vehicle", "services"], limit: defaultPageSize });
                dispatch(serviceActions.setBaseServiceCount(data.count));
                dispatch(serviceActions.setBaseServiceList(data.rows));
            } catch (error: any) {
                if (typeof error.response?.data.message === "string") {
                    dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
                } else if (typeof error.response?.data.message === "object") {
                    dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
                } else {
                    dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
                }
            } finally {
                dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
            }
        }
        getMyServices();
    }, [])

    const fetchMoreData = async (page: number) => {
        try {
            dispatch(settingsActions.setLoading({ isLoading: true, content: 'Loading...' }));
            const { data } = await serviceOfService.baseServiceLookup({ relations: ["vehicle", "services"], limit: defaultPageSize, offset: page * defaultPageSize });
            dispatch(serviceActions.setBaseServiceList(serviceState.baseServiceList.concat(data.rows)));
        } catch (error: any) {
            if (typeof error.response?.data.message === "string") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
        } finally {
            dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={serviceState.baseServiceList}
                keyExtractor={item => item.id}
                ListEmptyComponent={<EmptyList text='Your company has not service' />}
                renderItem={({ item, index }) => <BaseServiceWithServicesItem item={item} index={index} />}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (serviceState.baseServiceCount > 0 && serviceState.baseServiceCount > serviceState.baseServiceList.length) {
                        setPage(page + 1);
                        fetchMoreData(page + 1);
                    }
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});

export default MyServicesScreen;