import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';
import Layout from '../../../constants/Layout';

type PropsType = {
  isSelectable: boolean;
  seatPlan: string;
  seats: {
    number: number;
    isFilled: boolean;
  }[];
};
// props => araç koltuk planı, user tarafından görüntülenme için doluluk arrayi, isCustomer ?
// todo => user tarafı için koltuk seçme işlemi
// vehicle için redux yazılacak.
const BusModel: React.FC<PropsType> = ({ isSelectable, seatPlan, seats }) => {
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);
  const [editableSeats, setEditableSeats] = useState<{ number: number; isFilled: boolean }[]>([]);

  useEffect(() => {
    setEditableSeats([...seats]);
  }, [seats]);

  const handleSelect = ({ isFilled, number }: { isFilled: boolean; number: number }) => {
    if (!isSelectable) return;
    // kendi seçtiğini kaldırma işlemi
    if (selectedSeatNumbers.includes(number)) {
      const arr = editableSeats.map((each) => {
        if (number === each.number) {
          return {
            ...each,
            isFilled: false,
          };
        }
        return each;
      });
      setSelectedSeatNumbers(selectedSeatNumbers.filter((each) => each !== number));
      setEditableSeats(arr);
      return;
    }
    if (isFilled) return;
    // seats update
    const arr = editableSeats.map((each) => {
      if (number === each.number) {
        return {
          ...each,
          isFilled: true,
        };
      }
      return each;
    });
    setEditableSeats(arr);
    setSelectedSeatNumbers([...selectedSeatNumbers, number]);
  };

  const seatWithNumber = (prop: { isFilled: boolean; number: number }) => {
    let bg = 'transparent';
    if (prop.isFilled) bg = COLORS['danger-400'];
    if (selectedSeatNumbers.includes(prop.number)) bg = COLORS['info-300'];
    return (
      <TouchableOpacity
        onPress={() => handleSelect(prop)}
        style={[styles.seat, { backgroundColor: bg }]}
        key={prop.number}
      >
        <Text>{prop.number.toString()}</Text>
      </TouchableOpacity>
    );
  };

  const extraSeats = () => {
    if (editableSeats.length % 3 === 1) {
      return (
        <View style={{ height: '100%' }}>
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 1].isFilled,
            number: editableSeats[editableSeats.length - 1].number,
          })}
        </View>
      );
    } else {
      return (
        <View style={{ height: '100%' }}>
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 1].isFilled,
            number: editableSeats[editableSeats.length - 1].number,
          })}
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 2].isFilled,
            number: editableSeats[editableSeats.length - 2].number,
          })}
        </View>
      );
    }
  };

  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.driverContainer}>
        <MaterialCommunityIcons name="steering" size={32} color={COLORS.gray} />
      </View>
      <View style={styles.passengerContainer}>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          {editableSeats.map((item) => {
            if (item.number % 3 === 0) {
              return (
                <View key={item.number.toString()} style={{ height: '100%' }}>
                  {seatWithNumber({
                    isFilled: editableSeats[item.number - 3].isFilled,
                    number: editableSeats[item.number - 3].number,
                  })}
                  {seatWithNumber({
                    isFilled: editableSeats[item.number - 2].isFilled,
                    number: editableSeats[item.number - 2].number,
                  })}
                  <View style={{ position: 'absolute', bottom: 0 }}>
                    {seatWithNumber({
                      isFilled: editableSeats[item.number - 1].isFilled,
                      number: editableSeats[item.number - 1].number,
                    })}
                  </View>
                </View>
              );
            }
          })}
          {seats.length % 3 !== 0 ? extraSeats() : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.disabledColor,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  driverContainer: {
    height: 140,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  passengerContainer: {
    flexDirection: 'column',
    height: 140,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  smallNumber: {
    position: 'absolute',
    right: 14,
    top: 4.5,
    fontSize: 14,
  },
  seat: {
    height: 36,
    width: 36,
    margin: 3,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS['danger-400'],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BusModel;
