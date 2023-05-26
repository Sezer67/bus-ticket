import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ComplainType } from '../../../types/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { complainService } from '../../../service';
import EmptyList from '../../components/EmptyList';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { Role } from '../../../enums/user.enum';
import { COLORS } from '../../../constants';
import { dateHelper } from '../../helpers';
import { userEnums } from '../../../enums';

const ReportListScreen: React.FC<RootStackScreenProps<'ReportList'>> = ({ navigation, route }) => {
  const [complainList, setComplainList] = useState<ComplainType[]>([]);

  const userState = useAppSelector((state: ReduxRootType) => state.user);
  const dispatch = useAppDispatch();

  const getMyComplainList = async () => {
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Loading...' }));
    try {
      const { data } = await complainService.getMyComplains();
      setComplainList(data);
      console.log(data);
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

  useEffect(() => {
    navigation.setOptions({
      headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-caret-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
    getMyComplainList();
  }, []);

  const handlePress = async (id:string) => {
    try {
      const {data} = await complainService.changeToRead(id, userState.user.role);
      const list = complainList.map((each) => {
        if(each.id === id){
          return data;
        }
        return each;
      });
      setComplainList(list);
      navigation.navigate('Report', {isEdit: true, PNRNumber: data.serviceId, ...data});
    } catch (error) {
      console.log(error);
    }
  }

  const getColor = (isRead: boolean) => {
    if (isRead) return COLORS.gray;
    return COLORS.dark;
  };

  const renderItem = ({ item }: { item: ComplainType }) => {
    let isRead = false;
    if (
      (userState.user.role === userEnums.Role.Company && item.isReadCompany !== false) ||
      (userState.user.role === userEnums.Role.Customer && item.isReadCustomer  !== false)
    ) {
      isRead = true;
    }
    const textColor = getColor(isRead);
    return (
      <TouchableOpacity onPress={() => handlePress(item.id)} style={[styles.card, isRead ? { backgroundColor: 'transparent' } : {}]}>
        <View style={styles.cardHeader}>
          <Text style={{ color: textColor, fontWeight: '700', fontSize: 16 }}>
            {item.user ? item.user.fullName : 'Customer Name'}
          </Text>
          <View style={styles.row}>
            <MaterialIcons name="date-range" size={16} color={COLORS.gray} style={{ marginRight: 8 }} />
            <Text style={{ color: textColor, fontSize: 14 }}>
              {dateHelper.formattedDate(new Date(item.createdDate), 'Day Month Date')}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Text numberOfLines={1} style={{ fontWeight: '500', color: textColor, width: '80%' }}>
            {item.subject}
          </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={{ fontWeight: '300', color: textColor, width: '90%' }}>
            {item.message}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {item.answer && userState.user.role === userEnums.Role.Company ? (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={styles.tag}>
                  <AntDesign name="checkcircle" size={14} color={COLORS.light} />
                  <Text style={styles.tagText}>You Answered This</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={complainList}
        contentContainerStyle={{ marginTop: 0 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem({ item })}
        ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: COLORS.dark }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyList
            text={
              userState.user.role === Role.Company
                ? 'You have not received a complaint yet'
                : 'You have not filed a complaint yet'
            }
          />
        }
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  card: {
    width: '100%',
    minHeight: 80,
    padding: 10,
    backgroundColor: COLORS.disabledColor,
    borderRadius: 4,
    elevation: 4,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 3,
  },
  tag: {
    paddingHorizontal: 7,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    backgroundColor: COLORS['success-500'],
    borderRadius: 4,
    flexDirection: 'row',
  },
  tagText: {
    color: COLORS.light,
    marginLeft: 3,
    fontWeight: '600',
  },
});

export default ReportListScreen;
