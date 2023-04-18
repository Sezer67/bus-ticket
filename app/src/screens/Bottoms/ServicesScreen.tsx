import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../../../types';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../../../constants';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { ServiceType } from '../../../types/service.type';
import { convertHelper, dateHelper } from '../../helpers';
import Layout from '../../../constants/Layout';
import Accordion from '../../components/Accordion';
import VehicleTypeIcon from '../../components/VehicleModels/TypeIcon';
import GLOBAL_STYLES from '../../../constants/Styles';
import DatePicker from 'react-native-date-picker';
import ServiceFilterAndSorterModal from '../../components/Modals/ServiceFilterAndSorterModal';
import { companyService, serviceOfService } from '../../../service';
import { serviceActions } from '../../redux/service/slice';
import { settingsActions } from '../../redux/settings/slice';
import { serviceTypes } from '../../../types/index';
import { getSeatPlanArray } from '../../helpers';
import { defaultPageSize } from '../../../configs';

const ServicesScreen = ({ navigation, route }: RootStackScreenProps<'Services'>) => {
  // yapılan sorgu verileri redux da filter state olarak tutulsun.
  // tepede sorgu verilerimiz listelenecek.

  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<serviceTypes.ServiceScreenFilterOptionsType>({
    companies: [],
    seatingPlans: [],
  });
  const [page, setPage] = useState<number>(0);

  const serviceState = useAppSelector((state: ReduxRootType) => state.service);
  const dispatch = useAppDispatch();

  const handleFilter = async () => {
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Looking for Services ...' }));
    try {
      const { data } = await companyService.getCompanyList({});

      setFilterOptions((prev) => ({
        ...prev,
        companies: data.rows.map((each) => {
          return {
            id: each.id,
            name: each.name,
            isSelected: false,
          };
        }),
      }));
      setFilterModalVisible(true);
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

  const getFilterValues = () => {
    const companyIds: string[] = [];
    const seatingPlans: string[] = [];

    filterOptions.companies.forEach((c) => c.isSelected && companyIds.push(c.id));
    filterOptions.seatingPlans.forEach((c) => c.isSelected && seatingPlans.push(c.seatingPlan));

    if(companyIds.length < 1 && seatingPlans.length < 1){
      return undefined;
    }
    return {
      companyIds: companyIds.length > 0 ? companyIds : undefined,
      seatingPlans: seatingPlans.length > 0 ? seatingPlans : undefined,
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
      headerRight: () => (
        <TouchableOpacity onPress={handleFilter}>
          <Ionicons name="filter" size={24} color={'black'} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-caret-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
    if (serviceState.ticketFindForm) {
      setDate(new Date(serviceState.ticketFindForm.date));
      const seatingPlans: any[] = [];
      const seatArray = getSeatPlanArray(serviceState.ticketFindForm.vehicleType);
      seatArray.forEach((plan) => {
        seatingPlans.push({
          isSelected: false,
          seatingPlan: plan,
        });
      });

      setFilterOptions({ companies: [], seatingPlans });
    }
  }, []);

  const getTickets = async (props: { newDate: Date }) => {
    const { newDate } = props;
    if (!serviceState.ticketFindForm) return;
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Looking for Services ...' }));
    try {
      const filter = getFilterValues();
      const { data } = await serviceOfService.findTickets({
        from: serviceState.ticketFindForm.from,
        to: serviceState.ticketFindForm.to,
        vehicleType: serviceState.ticketFindForm.vehicleType,
        date: newDate,
        limit: defaultPageSize,
        offset: 0,
        filter
      });

      const convertedData = convertHelper.convertTicketResultToRedux(data);
      dispatch(serviceActions.setServiceList(convertedData.rows));
      dispatch(
        serviceActions.setTicketFindForm({
          from: serviceState.ticketFindForm.from,
          to: serviceState.ticketFindForm.to,
          vehicleType: serviceState.ticketFindForm.vehicleType,
          date: newDate.toString(),
        }),
      );
      setPage(0);
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

  const dateSelect = async (newDate: Date) => {
    if (date.getTime() !== newDate.getTime()) {
      setDate(newDate);
      getTickets({ newDate });
    }
    setDateVisible(false);
  };

  const fetchMoreData = async (page: number) => {
    
    if (!serviceState.ticketFindForm) return;
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Looking for Services ...' }));
    try {
      const filter = getFilterValues();
      const { data } = await serviceOfService.findTickets({
        from: serviceState.ticketFindForm.from,
        to: serviceState.ticketFindForm.to,
        vehicleType: serviceState.ticketFindForm.vehicleType,
        date: new Date(serviceState.ticketFindForm.date),
        limit: defaultPageSize,
        offset: page * defaultPageSize,
        filter
      });

      const convertedData = convertHelper.convertTicketResultToRedux(data);

      dispatch(serviceActions.setServiceList(serviceState.serviceList.concat(convertedData.rows)));

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

  const handleSelectService = (item: ServiceType) => {
    dispatch(serviceActions.setSelectedService(item));
    navigation.navigate('TicketBuy');
  }
  
  const renderRoute = (route: string, start: string, end: string) => {
    const _renderItem = ({ item, index }: { item: string; index: number }) => {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {start === item || end === item ? <Entypo name="dot-single" size={24} color={COLORS.dark} /> : null}
          <Text
            style={start === item || end === item ? { color: COLORS.dark } : { paddingLeft: 24, color: COLORS.gray }}
          >
            {item}
          </Text>
        </View>
      );
    };
    return <FlatList data={route.split(',')} keyExtractor={(item) => item} renderItem={_renderItem} />;
  };

  const renderItem = (prop: { item: ServiceType; index: number }) => {
    const arrivalTime = dateHelper.hourDifference(new Date(prop.item.departureDate), new Date(prop.item.arrivalDate));

    return (
      <Card status={prop.index % 2 === 0 ? 'warning' : 'danger'} style={{ marginBottom: 10 }}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <Text category="h6" style={{ paddingLeft: 10 }}>
            {prop.item.companyName}
          </Text>
          <Text style={{ paddingRight: 10, color: COLORS.gray }}>
            {dateHelper.formattedDate(new Date(prop.item.departureDate), 'DD/MM HH:mm')}
          </Text>
        </View>
        {/* Content */}
        <View style={styles.cardContent}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="seatbelt" size={24} color={COLORS.gray} />
            <Text style={styles.contentText}>{prop.item.seat}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={COLORS.gray} />
            <Text style={styles.contentText}>{arrivalTime}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="cash-multiple" size={24} color={COLORS.gray} style={{ marginRight: 4 }} />
            <Text style={styles.contentText}>{prop.item.price} TL</Text>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.cardFooter}>
          <View>
            <Accordion
              title={
                <Text style={{ ...Layout.FONTS.h2, fontWeight: '700', color: COLORS.dark, marginRight: 10 }}>
                  Route
                </Text>
              }
              children={renderRoute(prop.item.route, prop.item.departureCity, prop.item.arrivalCity)}
            />
          </View>
          <TouchableOpacity
            onPress={() => handleSelectService(prop.item)}
            style={{
              borderWidth: 1,
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 4,
              borderColor: COLORS.dark,
            }}
          >
            <Text style={{ color: COLORS.dark }}>Select</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const _footer = () => {
    if (!serviceState.ticketFindForm) return <View />;
    let isLastDay = true;
    const nextDay = new Date(serviceState.ticketFindForm.date);
    const lastDay = new Date(serviceState.ticketFindForm.date);
    const today = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    lastDay.setDate(lastDay.getDate() - 1);
    today.setHours(0, 0, 0);
    if (lastDay.getTime() < today.getTime()) {
      isLastDay = false;
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {isLastDay ? (
          <TouchableOpacity
            style={{ ...styles.footerButton, width: '45%', backgroundColor: COLORS['warning-500'] }}
            onPress={() => dateSelect(lastDay)}
          >
            <MaterialCommunityIcons name="arrow-left-bottom-bold" size={20} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '700', marginLeft: 10 }}>LAST DAY</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{ ...styles.footerButton, width: isLastDay ? '45%' : '100%' }}
          onPress={() => dateSelect(nextDay)}
        >
          <Text style={{ color: '#fff', fontWeight: '700', marginRight: 10 }}>NEXT DAY</Text>
          <MaterialCommunityIcons name="arrow-right-bottom-bold" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {serviceState.ticketFindForm ? (
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ ...styles.tag, marginRight: 10 }}>
                <Text numberOfLines={1} style={styles.headerContentText}>
                  {serviceState.ticketFindForm.from}
                </Text>
              </View>
              <VehicleTypeIcon type={serviceState.ticketFindForm.vehicleType} color="dark" size={20} />
              <View style={{ ...styles.tag, backgroundColor: COLORS['info-600'], marginLeft: 10 }}>
                <Text numberOfLines={1} style={styles.headerContentText}>
                  {serviceState.ticketFindForm.to}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setDateVisible(true)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <AntDesign name="calendar" size={24} />
              <Text style={{ ...Layout.FONTS.body2, marginLeft: 10 }} numberOfLines={1}>
                {dateHelper.formattedDate(new Date(serviceState.ticketFindForm.date), 'Day Month Date')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={serviceState.serviceList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={_footer}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (serviceState.baseServiceCount > 0 && serviceState.baseServiceCount > serviceState.baseServiceList.length) {
              setPage(page + 1);
              fetchMoreData(page + 1);
            }
          }}
        />
        <DatePicker
          //   minimumDate={new Date()}
          title="Journey Date"
          confirmText="Select"
          cancelText="Cancel"
          mode="date"
          locale="en"
          date={date || new Date()}
          modal
          open={dateVisible}
          onCancel={() => setDateVisible(false)}
          onConfirm={dateSelect}
        />
      </View>
      <ServiceFilterAndSorterModal
        isVisible={filterModalVisible}
        setIsVisible={setFilterModalVisible}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        handleOk={() => {
          setFilterModalVisible(false);
          getTickets({newDate: new Date(serviceState.ticketFindForm?.date || "")})
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  cardHeader: {
    width: '100%',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
    width: '100%',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContent: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  contentText: {
    color: '#000',
    ...Layout.FONTS.h3,
    maxWidth: (Layout.window.width - 10) / 3,
    textAlign: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: COLORS['danger-400'],
  },
  headerContainer: {
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContentText: {
    ...Layout.FONTS.body2,
    color: COLORS.light,
  },
  tag: {
    minWidth: 60,
    paddingHorizontal: 3,
    maxWidth: Layout.window.width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: COLORS['warning-700'],
    borderColor: COLORS.dark,
    borderRadius: 4,
  },
});

export default ServicesScreen;
