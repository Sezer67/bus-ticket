import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { serviceOfService } from '../../../service';
import { BaseServiceType } from '../../../types/service.type';
import EmptyList from '../../components/EmptyList';
import BaseServiceWithServicesItem from '../../components/BaseServiceWithServicesItem';
import { defaultPageSize } from '../../../configs';

const MyServicesScreen = ({ navigation, route }: RootTabScreenProps<'MyServices'>) => {


    const dispatch = useAppDispatch();

    const [services, setServices] = useState<BaseServiceType[]>([]);
    const [totalServicesLength, setTotalServicesLength] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const getMyServices = async () => {
            try {
                dispatch(settingsActions.setLoading({ isLoading: true, content: 'Your Service Data initializing...' }));
                const { data } = await serviceOfService.baseServiceLookup({ relations: ["vehicle", "services"], limit: defaultPageSize });
                setServices(data.rows);
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
            setServices(services.concat(data.rows));
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
                data={services}
                keyExtractor={item => item.id}
                ListEmptyComponent={<EmptyList text='Your company has not service' />}
                renderItem={({ item, index }) => <BaseServiceWithServicesItem item={item} index={index} />}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (totalServicesLength > 0 && totalServicesLength > services.length) {
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