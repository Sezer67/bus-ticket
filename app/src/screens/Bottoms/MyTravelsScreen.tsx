import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { MyTravelsDataType } from '../../../service/types/service-service.type';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { serviceOfService } from '../../../service';
import { defaultPageSize } from '../../../configs';
import TravelCard from '../../components/TravelCard';
import { StatusBar } from 'expo-status-bar';
import HeaderTitle from '../../components/HeaderTitle';

const MyTravelsScreen: React.FC<RootTabScreenProps<'Travel'>> = ({ navigation, route }) => {
  const [travelList, setTravelList] = useState<MyTravelsDataType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setPage(0);
      setTotal(0);
      fetchMoreData(0, true);
      console.log('focus listener worked travelList : ', travelList);
    });

    return focusListener;
  }, []);

  const fetchMoreData = async (page: number, isLoad: boolean = false) => {
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Looking for Travels ...' }));
    try {
      const { data } = await serviceOfService.getMyTravels({
        limit: defaultPageSize,
        offset: page * defaultPageSize,
      });
      if (isLoad) {
        setTravelList(data.rows);
        setTotal(data.count);
      } else {
        setTravelList((prev) => prev.concat(data.rows));
      }
    } catch (error: any) {
      if (typeof error.response?.data.message === 'string') {
        dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
      } else if (typeof error.response?.data.message === 'object') {
        dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
      } else {
        dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
      }
    } finally {
      dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
    }
  };

  const changeVote = (id: string) => {
    setTravelList((prevList) => prevList.map((item) => {
      if(item.id === id){
        console.log("buldu");
        return {
          ...item,
          isToVote: true
        };
      }
      return item;
    }))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={travelList}
        renderItem={({ item, index }) => <TravelCard item={item} index={index} changeVoteField={changeVote} />}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (total > 0 && total > travelList.length) {
            console.log('fetch more');
            setPage(page + 1);
            fetchMoreData(page + 1);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default MyTravelsScreen;
