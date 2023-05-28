import React, { useEffect, useMemo, useState } from 'react';
import { RootStackScreenProps } from '../../../types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import GLOBAL_STYLES from '../../../constants/Styles';
import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BusModel from '../../components/VehicleModels/BusModel';
import { useAppSelector } from '../../../hooks/redux.hook';
import { ReduxRootType } from '../../../types/redux-slice.type';
import Layout from '../../../constants/Layout';
import { VehicleType } from '../../../types/vehicle.type';
import { vehicleService } from '../../../service';
import { COLORS } from '../../../constants';
import { dateHelper } from '../../helpers';
import TicketBuyForm from '../../components/TicketBuyForm';
import { vehicleEnums } from '../../../enums';
import TrainModel from '../../components/VehicleModels/TrainModel';

const TicketBuyScreen = ({ navigation, route }: RootStackScreenProps<'TicketBuy'>) => {
  const [vehicle, setVehicle] = useState<VehicleType>();
  const [seats, setSeats] = useState<{ number: number; isFilled: boolean }[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

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
    let title = 'Buy The Ticket';
    if (serviceState.service) {
      const { departureCity, arrivalCity, departureDate } = serviceState.service;
      title =
        departureCity + ' - ' + arrivalCity + ' ' + dateHelper.formattedDate(new Date(departureDate), 'DD/MM HH:mm');
    }
    navigation.setOptions({
      headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-caret-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      title,
    });
  }, []);

  useEffect(() => {
    if (serviceState.service) {
      getVehicle(serviceState.service.plate);
    }
  }, [serviceState]);

  const handleCancelSeat = (number: number) => {
    setSelectedSeats((prev) => prev.filter((val) => val !== number));
    setSeats((prev) =>
      prev.filter((seat) => {
        if (seat.number === number)
          return {
            ...seat,
            isFilled: false,
          };
        return seat;
      }),
    );
  };

  const renderVehicleModal = () => {
    if(!vehicle) return;
    const type = vehicle.vehicleType;
    console.log(type);
    if (type === vehicleEnums.VehicleType.Bus) {
      return (
        <BusModel
          isSelectable
          seatPlan={vehicle.seatingPlan}
          seats={seats}
          selectedSeatNumbers={selectedSeats}
          setSelectedSeatNumbers={setSelectedSeats}
        />
      );
    } else if (type === vehicleEnums.VehicleType.Train) {
      return (
        <TrainModel
          isSelectable
          seatPlan={vehicle.seatingPlan}
          seats={seats}
          selectedSeatNumbers={selectedSeats}
          setSelectedSeatNumbers={setSelectedSeats}
        />
      );
    }
    return <Text>Not Yet Avalilable</Text>;
  };

  if (!vehicle) return <></>;

  return (
    <View style={styles.container}>
      <View style={styles.vehicleModel}>
        <View style={styles.icons}>
          <MaterialCommunityIcons
            style={{ marginRight: 5 }}
            name="audio-input-stereo-minijack"
            size={20}
            color={vehicle.isJack ? COLORS.dark : COLORS.gray}
          />
          <Feather style={{ marginRight: 10 }} name="tv" size={20} color={vehicle.isTV ? COLORS.dark : COLORS.gray} />
          <FontAwesome5
            style={{ marginRight: 5 }}
            name="wifi"
            size={20}
            color={vehicle.isWifi ? COLORS.dark : COLORS.gray}
          />
        </View>
        {renderVehicleModal()}
        <View style={styles.seatNumbers}>
          {selectedSeats.map((number) => (
            <View style={styles.seat} key={number}>
              <TouchableOpacity onPress={() => handleCancelSeat(number)} style={styles.closeIcon}>
                <FontAwesome name="close" color={COLORS.light} size={8} />
              </TouchableOpacity>
              <Text>{number}</Text>
            </View>
          ))}
        </View>
        {selectedSeats.length > 0 ? (
          <TicketBuyForm seatNumbers={selectedSeats} passengerCount={selectedSeats.length} singlePersonTicketPrice={serviceState.service!.price}/>
        ) : (
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="ios-warning" size={24} color={COLORS['warning-600']} />
            <Text style={styles.emptySeatText}>Please Select Seat Number</Text>
          </View>
        )}
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
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  seatNumbers: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  seat: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 4,
  },
  closeIcon: {
    width: 12,
    height: 12,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS['danger-800'],
    borderRadius: 8,
    right: -4,
    top: -4,
  },
  emptySeatText: {
    color: COLORS['warning-700'],
    marginLeft: 5,
    ...Layout.FONTS.body2
  },
});

export default TicketBuyScreen;
