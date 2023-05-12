import { Card, Input, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import GLOBAL_STYLES from '../../constants/Styles';
import { COLORS } from '../../constants';
import Layout from '../../constants/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { ReduxRootType } from '../../types/redux-slice.type';
import Accordion from './Accordion';
import { CardField, CardForm, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { axiosInstance } from '../../utils/axios.util';
import { paymentService } from '../../service';
import { settingsActions } from '../redux/settings/slice';

type PropsType = {
  passengerCount: number;
  singlePersonTicketPrice: number;
};

type PassengerInfoType = {
  fullName: string;
  mail: string;
};

const TicketBuyForm: React.FC<PropsType> = ({ passengerCount, singlePersonTicketPrice }) => {
  const userState = useAppSelector((state: ReduxRootType) => state.user);
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfoType[]>([]);
  const [activeAccord, setActiveAccor] = useState<number>(-1);
  
  const dispatch = useAppDispatch();
  const stripe = useStripe();

  useEffect(() => {
    const defaultPassInfo = [];
    for (let i = 0; i < passengerCount; i++) {
      const data = passengerInfo[i];
      defaultPassInfo.push({
        fullName: data ? data.fullName : '',
        mail: data ? data.mail : '',
      });
    }
    setPassengerInfo(defaultPassInfo);
  }, [passengerCount]);

  const handleChangeText = (value: string, index: number, key: keyof PassengerInfoType) => {
    setPassengerInfo((prev) => {
      prev[index][key] = value;
      return prev;
    });
  };

  const renderTitle = (index: number): React.ReactNode => {
    return (
      <View style={styles.row}>
        <Text>{index + 1}. Passenger</Text>
      </View>
    );
  };

  const renderInfoAccordionForm = () => {
    const nodeArray = [];
    for (let i = 0; i < passengerCount; i++) {
      const node = (
        <Accordion
          isOpened={i === activeAccord}
          setActiveIndex={() => setActiveAccor(i)}
          key={i.toString()}
          title={renderTitle(i)}
        >
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10, marginRight: 20 }}>
            <Input
              onChangeText={(value) => handleChangeText(value, i, 'fullName')}
              style={GLOBAL_STYLES.input}
              placeholder="Name Surname"
              maxLength={30}
            />
            <Input
              onChangeText={(value) => handleChangeText(value.toLowerCase(), i, 'mail')}
              style={GLOBAL_STYLES.input}
              placeholder="E-mail"
              keyboardType="email-address"
            />
          </View>
        </Accordion>
      );
      nodeArray.push(node);
    }
    return <View style={{ marginHorizontal: 10 }}>{nodeArray.map((node) => node)}</View>;
  };

  const handlePay = async () => {
    try {
      const { data } = await paymentService.ticketBuy({ price: singlePersonTicketPrice * passengerCount });
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: '',
        style: 'alwaysDark',
        defaultBillingDetails: {
          address: {
            country: 'TR',
          }
        },
      });
      if (initSheet.error) {
        dispatch(settingsActions.setErrorSnackbar({isError: true, content: initSheet.error.message}));
        return;
      }
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) {
        dispatch(settingsActions.setErrorSnackbar({isError: true, content: presentSheet.error.message}));
        return;
      }
      Alert.alert('Complete');
      // ödeme yapılıp koltuk alındığına dair servisi bilgilendir ve fişi görüntület
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    }
  };
  return (
    <ScrollView>
      {/* Passenger price info */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}>
        <Text style={{ color: COLORS.gray }}>
          {passengerCount} Passenger{passengerCount > 1 ? 's' : ''}
        </Text>
        <Text style={{ color: COLORS.gray }}>{singlePersonTicketPrice * passengerCount} TL</Text>
      </View>
      <View
        style={{ ...GLOBAL_STYLES.separator, width: '100%', marginTop: 5, backgroundColor: COLORS.disabledColor }}
      />
      {renderInfoAccordionForm()}
      {/* Paid info */}
      <View>
        <TouchableOpacity onPress={handlePay}>
          <Text>AAAA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TicketBuyForm;
