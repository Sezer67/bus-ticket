import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { PropsType } from './vehicle-model.config';
import { Text } from '@ui-kitten/components';

const TrainModel: React.FC<PropsType> = ({
  isSelectable,
  seatPlan,
  seats,
  selectedSeatNumbers,
  setSelectedSeatNumbers,
}) => {
  const [editableSeats, setEditableSeats] = useState<{ number: number; isFilled: boolean }[]>([]);

  useEffect(() => {
    setEditableSeats([...seats]);
  }, [seats]);

  const handleSelect = ({ isFilled, number }: { isFilled: boolean; number: number }) => {
    if (!isSelectable || !selectedSeatNumbers || !setSelectedSeatNumbers) return;
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
    if (selectedSeatNumbers?.includes(prop.number)) bg = COLORS['info-300'];
    return (
      <TouchableOpacity
        onPress={() => handleSelect(prop)}
        style={[styles.seat, { backgroundColor: bg }]}
        key={prop.number}
      >
        <Text>{prop.number}</Text>
      </TouchableOpacity>
    );
  };
  const extraSeats = () => {
    if (seatPlan === '2+1') {
      if (editableSeats.length % 3 === 1) {
        return (
          <View style={{ height: '100%' }}>
            {seatWithNumber({
              isFilled: editableSeats[editableSeats.length - 1]?.isFilled,
              number: editableSeats[editableSeats.length - 1]?.number,
            })}
          </View>
        );
      } else {
        return (
          <View style={{ height: '100%' }}>
            {seatWithNumber({
              isFilled: editableSeats[editableSeats.length - 2]?.isFilled,
              number: editableSeats[editableSeats.length - 2]?.number,
            })}
            {seatWithNumber({
              isFilled: editableSeats[editableSeats.length - 1]?.isFilled,
              number: editableSeats[editableSeats.length - 1]?.number,
            })}
          </View>
        );
      }
    }
    // seat 2+2
    if (editableSeats.length % 4 === 3) {
      return (
        <View style={{ height: '100%' }}>
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 3]?.isFilled,
            number: editableSeats[editableSeats.length - 3]?.number,
          })}
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 2]?.isFilled,
            number: editableSeats[editableSeats.length - 2]?.number,
          })}
          <View style={{ marginTop: 10 }}>
            {seatWithNumber({
              isFilled: editableSeats[editableSeats.length - 1]?.isFilled,
              number: editableSeats[editableSeats.length - 1]?.number,
            })}
          </View>
        </View>
      );
    } else if (editableSeats.length % 4 === 2) {
      return (
        <View style={{ height: '100%' }}>
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 2]?.isFilled,
            number: editableSeats[editableSeats.length - 2]?.number,
          })}
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 1]?.isFilled,
            number: editableSeats[editableSeats.length - 1]?.number,
          })}
        </View>
      );
    } else if (editableSeats.length % 4 === 1) {
      return (
        <View style={{ height: '100%' }}>
          {seatWithNumber({
            isFilled: editableSeats[editableSeats.length - 1]?.isFilled,
            number: editableSeats[editableSeats.length - 1]?.number,
          })}
        </View>
      );
    }
  };
  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={[styles.rightTop, styles.stop]}>
        <View style={{ height: 25, width: 3, backgroundColor: COLORS.gray }} />
        <View style={{ height: 15, width: 3, backgroundColor: COLORS.gray }} />
      </View>
      <View style={[styles.rightBottom, styles.stop]}>
        <View style={{ height: 25, width: 3, backgroundColor: COLORS.gray }} />
        <View style={{ height: 15, width: 3, backgroundColor: COLORS.gray }} />
      </View>
      <View style={[styles.leftTop, styles.stop]}>
        <View style={{ height: 15, width: 3, backgroundColor: COLORS.gray }} />
        <View style={{ height: 25, width: 3, backgroundColor: COLORS.gray }} />
      </View>
      <View style={[styles.leftBottom, styles.stop]}>
        <View style={{ height: 15, width: 3, backgroundColor: COLORS.gray }} />
        <View style={{ height: 25, width: 3, backgroundColor: COLORS.gray }} />
      </View>
      <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
        <View style={[styles.passengerContainer, seatPlan === '2+2' ? { height: 180 } : {}]}>
          {seatPlan === '2+1' ? (
            <View style={{ flexDirection: 'row', height: '100%' }}>
              {editableSeats.map((item) => {
                if (item.number % 3 === 0) {
                  return (
                    <View key={item.number} style={{ height: '100%' }}>
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
          ) : null}
          {seatPlan === '2+2' ? (
            <View style={{ flexDirection: 'row', height: '100%' }}>
              {editableSeats.map((item) => {
                if (item.number % 4 !== 0) return;
                return (
                  <View key={item.number} style={{ height: '100%' }}>
                    {seatWithNumber({
                      isFilled: editableSeats[item.number - 4].isFilled,
                      number: editableSeats[item.number - 4].number,
                    })}
                    {seatWithNumber({
                      isFilled: editableSeats[item.number - 3].isFilled,
                      number: editableSeats[item.number - 3].number,
                    })}
                    <View style={{ marginTop: 10 }}>
                      {seatWithNumber({
                        isFilled: editableSeats[item.number - 2].isFilled,
                        number: editableSeats[item.number - 2].number,
                      })}
                      {seatWithNumber({
                        isFilled: editableSeats[item.number - 1].isFilled,
                        number: editableSeats[item.number - 1].number,
                      })}
                    </View>
                  </View>
                );
              })}
              {editableSeats.length % 4 !== 0 ? extraSeats() : null}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
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
  rightTop: {
    position: 'absolute',
    top: 20,
    left: -6,
  },
  leftTop: {
    position: 'absolute',
    top: 20,
    right: -6,
  },
  rightBottom: {
    position: 'absolute',
    bottom: 20,
    left: -6,
  },
  leftBottom: {
    position: 'absolute',
    bottom: 20,
    right: -6,
  },
  stop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

export default TrainModel;
