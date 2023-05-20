import { Button, Modal, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../../../constants/Layout';
import { COLORS } from '../../../constants';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { VoteVehicleDataType } from '../../../service/types/vehicle-service.type';

type PropsType = {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  handleVote: (data: Omit<VoteVehicleDataType, 'id'>) => Promise<void>;
};

const VoteServiceModal: React.FC<PropsType> = ({ isVisible, setVisible, handleVote }) => {
  const [comfortPoint, setComfortPoint] = useState<number>(0);
  const [speedPoint, setSpeedPoint] = useState<number>(0);
  const [servicePoint, setServicePoint] = useState<number>(0);

  const starCountArray = [1, 2, 3, 4, 5];

  const handlePressStar = (value: number, key: 'Comfort' | 'Speed' | 'Service') => {
    switch (key) {
      case 'Comfort':
        return setComfortPoint(value);
      case 'Speed':
        return setSpeedPoint(value);
      case 'Service':
        return setServicePoint(value);
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      style={styles.container}
      visible={isVisible}
      onBackdropPress={onClose}
      backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Vote the Trip</Text>
        <TouchableOpacity onPress={onClose}>
          <FontAwesome name="close" size={16} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
        <View style={styles.voteContainer}>
          <Text style={styles.voteNameText}>Comfort</Text>
          <View style={styles.starsContainer}>
            {starCountArray.map((value) => (
              <TouchableOpacity key={value} onPress={() => handlePressStar(value, 'Comfort')}>
                {value > comfortPoint ? (
                  <AntDesign name="staro" size={26} color="black" />
                ) : (
                  <AntDesign name="star" size={26} color={COLORS['warning-400']} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.voteContainer}>
          <Text style={styles.voteNameText}>Speed</Text>
          <View style={styles.starsContainer}>
            {starCountArray.map((value) => (
              <TouchableOpacity key={value} onPress={() => handlePressStar(value, 'Speed')}>
                {value > speedPoint ? (
                  <AntDesign name="staro" size={26} color="black" />
                ) : (
                  <AntDesign name="star" size={26} color={COLORS['warning-400']} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.voteContainer}>
          <Text style={styles.voteNameText}>Service</Text>
          <View style={styles.starsContainer}>
            {starCountArray.map((value) => (
              <TouchableOpacity key={value} onPress={() => handlePressStar(value, 'Service')}>
                {value > servicePoint ? (
                  <AntDesign name="staro" size={26} color="black" />
                ) : (
                  <AntDesign name="star" size={26} color={COLORS['warning-400']} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button
          onPress={() =>
            handleVote({
              comfortPoint,
              servicePoint,
              speedPoint,
            })
          }
          style={styles.button}
        >
          VOTE
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * 0.75,
    backgroundColor: COLORS.light,
    borderRadius: 5,
    zIndex: 999,
  },
  header: {
    width: '100%',
    backgroundColor: COLORS['danger-400'],
    height: 50,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: COLORS.dark,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  voteContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  voteNameText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: COLORS['danger-600'],
    borderWidth: 0,
    elevation: 4,
    width: '100%',
  },
});

export default VoteServiceModal;
