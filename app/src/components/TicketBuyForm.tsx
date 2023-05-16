import { Input, Text, Button } from '@ui-kitten/components';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import GLOBAL_STYLES from '../../constants/Styles';
import { COLORS } from '../../constants';
import Layout from '../../constants/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { ReduxRootType } from '../../types/redux-slice.type';
import Accordion from './Accordion';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { paymentService, serviceOfService } from '../../service';
import { settingsActions } from '../redux/settings/slice';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BillTicketModal from './Modals/BillTicketModal';
import { renderHtmlForTicket } from '../helpers/html.helper';
import { useNavigation } from '@react-navigation/native';

type PropsType = {
  passengerCount: number;
  singlePersonTicketPrice: number;
  seatNumbers: number[];
};

type PassengerInfoType = {
  fullName: string;
  mail: string;
  seatNumber: number;
};

const TicketBuyForm: React.FC<PropsType> = ({ passengerCount, singlePersonTicketPrice,seatNumbers }) => {
  const serviceState = useAppSelector((state: ReduxRootType) => state.service);

  const [passengerInfo, setPassengerInfo] = useState<PassengerInfoType[]>([]);
  const [activeAccord, setActiveAccor] = useState<number>(-1);
  const [isVisible,setIsVisible] = useState<boolean>(false);
  const [billHtml,setBillHtml] = useState<string>("");
  
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const navigation = useNavigation();

  useEffect(() => {
    const defaultPassInfo = [];
    for (let i = 0; i < passengerCount; i++) {
      const data = passengerInfo[i];
      defaultPassInfo.push({
        fullName: data ? data.fullName : '',
        mail: data ? data.mail : '',
        seatNumber: seatNumbers[i],
      });
    }
    setPassengerInfo(defaultPassInfo);
  }, [passengerCount]);

  const handleChangeText = (value: string, index: number, key: keyof Omit<PassengerInfoType, "seatNumber">) => {
    setPassengerInfo((prev) => {
      prev[index][key] = value;
      return prev;
    });
  };

  const renderTitle = (index: number, seatNumber: number): React.ReactNode => {
    return (
      <View style={styles.row}>
        <Text>{index + 1}. Passenger</Text>
        <View style={{...styles.row, marginLeft: 10}}>
          <MaterialCommunityIcons name="seatbelt" size={18} color={COLORS.gray} />
          <Text style={{color:COLORS.gray, fontSize: 12, fontWeight: '600'}}>{seatNumber} Number</Text>
        </View>
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
          title={renderTitle(i, passengerInfo[i]?.seatNumber)}
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
    return <View style={{ marginHorizontal: 10, minHeight: Layout.window.height / 2 }}>{nodeArray.map((node) => node)}</View>;
  };

  const handlePay = async () => {
    let isEmpty = false;
    let emptyIndex = -1;
    for (let index = 0; index < passengerInfo.length; index++) {
      const element = passengerInfo[index];
      if(!element.fullName.trim() || !element.mail.trim()){
        isEmpty = true;
        emptyIndex = index;
        break;
      }
    }
    if(isEmpty) {
      dispatch(settingsActions.setErrorSnackbar({isError: true, content: 'Passenger Informations are not empty !'}));
      setActiveAccor(emptyIndex);
      return;
    }
    if(!serviceState.service){
      dispatch(settingsActions.setErrorSnackbar({isError: true, content: 'Something went wrong try again'}));
      return;
    } 
    try {
      console.log("handle pay before req");
      const { data } = await paymentService.ticketBuy({ price: singlePersonTicketPrice * passengerCount });
      console.log("handle pay after req");
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: 'Merchant Name',
        style: 'alwaysDark',
        defaultBillingDetails: {
          address: {
            country: 'TR',
          }
        },
      });
      if (initSheet.error) {
        dispatch(settingsActions.setErrorSnackbar({isError: true, content: initSheet.error.message}));
        console.log("init : ",initSheet.error.message);
        return;
      }
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) {
        dispatch(settingsActions.setErrorSnackbar({isError: true, content: presentSheet.error.message}));
        console.log(presentSheet.error.message);
        return;
      }
      dispatch(settingsActions.setLoading({
        isLoading: true,
        content: 'Ticket Buying...'
      }));
      // ödeme yapılıp koltuk alındığına dair servisi bilgilendir ve fişi görüntület
      const {data: response} = await serviceOfService.buyTicket({
        id: serviceState.service.id, 
        passengerInfoList: passengerInfo
      });
      const html = renderHtmlForTicket(serviceState.service, response,singlePersonTicketPrice);
      setBillHtml(html);
      setIsVisible(true);
      dispatch(settingsActions.setLoading({
        isLoading: false,
        content: undefined
      }));
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
      <View style={{marginBottom: 5}} >
        <StripeProvider publishableKey='pk_test_51N6fwyK1ItlLPFTCul2srUTMD2zxULjBPvf9i7A1cqoa0xWAhZMODkIGTJgF4vEslXOrbdGV6DnTLftlNjO0Hwd400WTIZM4pQ'>
          <TouchableOpacity onPress={handlePay}  style={styles.button} >
            <Text style={{marginRight: 4, color: COLORS.dark, ...Layout.FONTS.body2, fontWeight:'bold'}}>BUY</Text> 
            <MaterialIcons name="payment" size={24} color={COLORS.dark} />
          </TouchableOpacity>
        </StripeProvider>
      </View>
      <BillTicketModal html={billHtml} isVisible={isVisible} setVisible={setIsVisible} handleCloseNavigate={() => { navigation.navigate("Travel") }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS['light'],
    borderWidth: 1,
    borderColor: COLORS.disabledColor,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height: 40,
    borderRadius: 4
}
});

export default TicketBuyForm;
