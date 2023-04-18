import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../../types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import GLOBAL_STYLES from '../../constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import BusModel from '../components/VehicleModels/BusModel';
import { useAppSelector } from '../../hooks/redux.hook';
import { ReduxRootType } from '../../types/redux-slice.type';
import Layout from '../../constants/Layout';
import { VehicleType } from '../../types/vehicle.type';
import { vehicleService } from '../../service';

const TicketBuyScreen = ({ navigation, route }: RootStackScreenProps<'TicketBuy'>) => {
  const [vehicle, setVehicle] = useState<VehicleType>();
  const [seats, setSeats] = useState<{ number: number; isFilled: boolean }[]>([]);
  const serviceState = useAppSelector((state: ReduxRootType) => state.service);

  const getVehicle = async (plate: string) => {
    try {
      const { data } = await vehicleService.lookup({ plates: [plate] });
      const seatsArr = [];
      const count = data.rows[0].seatCount;

      for (let i = 1; i <= count; i++) {
        if (serviceState.service!.filledSeats.includes(i.toString())) {
          seatsArr.push({
            number: i,
            isFilled: true,
          });
        } else {
          seatsArr.push({
            number: i,
            isFilled: false,
          });
        }
      }
      setSeats(seatsArr);
      setVehicle(data.rows[0]);
    } catch (error) {}
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-caret-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'Buy The Ticket',
    });
  }, []);

  useEffect(() => {
    if (serviceState.service) {
      getVehicle(serviceState.service.plate);
    }
  }, [serviceState]);

  if (!vehicle) return <></>;

  return (
    <View style={styles.container}>
      <View style={styles.vehicleModel}>
        <BusModel isSelectable seatPlan={vehicle.seatingPlan} seats={seats} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  vehicleModel: {
    width: Layout.window.width - 20,
    height: 'auto',
  },
});

export default TicketBuyScreen;
