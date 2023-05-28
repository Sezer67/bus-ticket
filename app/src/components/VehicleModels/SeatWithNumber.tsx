import { Text } from '@ui-kitten/components';
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';

type PropsType = {
    number: number;
    isFilled: boolean;
    handlePress: (prop: { isFilled: boolean; number: number }) => void;
    isSelected: boolean;
}

const SeatWithNumber:React.FC<PropsType> = ({number, isFilled, handlePress, isSelected}) => {

    let bg = 'transparent';
    if (isFilled) bg = COLORS['danger-400'];
    if (isSelected) bg = COLORS['info-300'];
    if(number === 1 || number === 2) {
      console.log(number);
      console.log(isSelected);
      console.log(isFilled)
      console.log("-----------------");
    }
    return (
        <TouchableOpacity
          onPress={() => handlePress({isFilled, number})}
          style={[styles.seat, { backgroundColor: bg }]}
        >
          <Text>{number}</Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
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
})

export default SeatWithNumber