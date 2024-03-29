import { Button, CheckBox, IndexPath, Input, Select, SelectItem, Text } from '@ui-kitten/components';
import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useInputState, useOnlySelectInputState } from '../../../hooks/forms.hook';
import GLOBAL_STYLES from '../../../constants/Styles';
import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, icons } from '../../../constants';
import { vehicleEnums } from '../../../enums';
import {
  BusSeatPlanType,
  PlaneSeatPlanType,
  SeatPlanInput,
  TrainSeatPlanType,
  VehicleType,
} from '../../../types/vehicle.type';
import { settingsActions } from '../../redux/settings/slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { CreateVehicleFormDataType, EditVehicleFormDataType } from '../../../service/types/vehicle-service.type';
import { vehicleService } from '../../../service';
import BusModel from '../VehicleModels/BusModel';
import { vehicleActions } from '../../redux/vehicle/slice';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store';
import { getSeatPlanArray } from '../../helpers';
import TrainModel from '../VehicleModels/TrainModel';

type PropsType = {
  isEdit: boolean;
};
const VehicleDetailForm: React.FC<PropsType> = ({ isEdit }) => {
  const seatCountInputState = useInputState(true);
  const plateInputState = useInputState();
  const seatingPlanSelectState = useOnlySelectInputState();
  const vehicleTypeSelectState = useOnlySelectInputState();
  const [checkboxGroupState, setCheckboxGroupState] = useState<Pick<VehicleType, 'isWifi' | 'isJack' | 'isTV'>>({
    isJack: false,
    isTV: false,
    isWifi: false,
  });

  const [vehicleModelVisible, setVehicleModelVisible] = useState<boolean>(false);

  const seatingPlanItems: SeatPlanInput[] = useMemo(() => {
    return getSeatPlanArray(Number(vehicleTypeSelectState.selectedIndex) - 1);
  }, [vehicleTypeSelectState.selectedIndex]);

  const seats = useMemo((): {
    number: number;
    isFilled: boolean;
  }[] => {
    if (Number(seatCountInputState.value) > 10) {
      const arr = [];
      for (let i = 1; i <= Number(seatCountInputState.value); i++) {
        arr.push({
          number: i,
          isFilled: false,
        });
      }
      return arr;
    }
    return [];
  }, [seatCountInputState]);

  const dispatch = useAppDispatch();
  const selectedVehicle = useAppSelector((state: RootState) => state.vehicle.vehicle);
  const navigation = useNavigation();

  useEffect(() => {
    if (isEdit && selectedVehicle) {
      seatCountInputState.onChangeText(selectedVehicle.seatCount.toString());
      plateInputState.onChangeText(selectedVehicle.plate);
      vehicleTypeSelectState.onSelect(new IndexPath(selectedVehicle.vehicleType));
      const seatArray = getSeatPlanArray(selectedVehicle.vehicleType);
      const index = seatArray.findIndex((item) => item === selectedVehicle.seatingPlan);
      seatingPlanSelectState.onSelect(new IndexPath(index));
      setCheckboxGroupState({
        isJack: selectedVehicle.isJack,
        isWifi: selectedVehicle.isWifi,
        isTV: selectedVehicle.isTV,
      });
    }
  }, [isEdit]);

  const handleOnEdit = async () => {
    if (!selectedVehicle) return;

    const formData: EditVehicleFormDataType = {
      seatCount: Number(seatCountInputState.value),
      seatingPlan: seatingPlanItems[Number(seatingPlanSelectState.selectedIndex)],
      ...checkboxGroupState,
      id: selectedVehicle.id,
    };

    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Updating a vehicle...' }));
    try {
      const { data } = await vehicleService.editVehicle(formData);
      dispatch(vehicleActions.updateVehicle(data));
      navigation.navigate('Root');
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

  const handleOnCreate = async () => {
    const formData: CreateVehicleFormDataType = {
      seatCount: Number(seatCountInputState.value),
      plate: plateInputState.value,
      seatingPlan: seatingPlanItems[Number(seatingPlanSelectState.selectedIndex) - 1],
      ...checkboxGroupState,
      vehicleType: Number(vehicleTypeSelectState.selectedIndex) - 1,
    };
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Creating a record...' }));
    try {
      const { data } = await vehicleService.createVehicle(formData);
      dispatch(vehicleActions.addVehicleToList(data));
      navigation.navigate('Root');
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

  const handleOnSubmit = () => {
    if (isEdit) handleOnEdit();
    else handleOnCreate();
  };

  const renderVehicleModal = () => {
    const type = Number(vehicleTypeSelectState.selectedIndex) - 1;
    console.log(type);
    if (type === vehicleEnums.VehicleType.Bus) {
      return (
        <BusModel
          isSelectable={false}
          seatPlan={seatingPlanItems[Number(seatingPlanSelectState.selectedIndex) - 1]}
          seats={seats}
        />
      );
    } else if (type === vehicleEnums.VehicleType.Train) {
      return (
        <TrainModel
          isSelectable={false}
          seatPlan={seatingPlanItems[Number(seatingPlanSelectState.selectedIndex) - 1]}
          seats={seats}
        />
      );
    }
    return <Text>Not Yet Avalilable</Text>;
  };

  return (
    <>
      <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Input
            accessoryLeft={<MaterialCommunityIcons name="seatbelt" size={20} color={COLORS['danger-900']} />}
            style={seatCountInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            placeholder="Seat Count"
            keyboardType="numeric"
            maxLength={2}
            {...seatCountInputState}
          />

          <Input
            accessoryLeft={<Image source={icons.plate} resizeMode="cover" />}
            style={seatCountInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            placeholder="Vehicle Plate"
            maxLength={12}
            disabled={isEdit}
            {...plateInputState}
          />
          <View style={styles.checkboxGroup}>
            <View style={styles.checkBoxContainer}>
              <FontAwesome5
                name="wifi"
                color={checkboxGroupState.isWifi ? COLORS['danger-500'] : COLORS.gray}
                size={20}
              />
              <CheckBox
                status="danger"
                style={styles.checkBox}
                checked={checkboxGroupState.isWifi}
                onChange={(checked) => setCheckboxGroupState({ ...checkboxGroupState, isWifi: checked })}
              >
                <Text category="h3" style={{ fontWeight: '700' }}>
                  Wifi
                </Text>
              </CheckBox>
            </View>
            <View style={styles.checkBoxContainer}>
              <MaterialCommunityIcons
                name="audio-input-stereo-minijack"
                size={20}
                color={checkboxGroupState.isJack ? COLORS['danger-500'] : COLORS.gray}
              />
              <CheckBox
                onChange={(checked) => setCheckboxGroupState({ ...checkboxGroupState, isJack: checked })}
                checked={checkboxGroupState.isJack}
                status="danger"
                style={[styles.checkBox, { paddingLeft: 5 }]}
              >
                Jack
              </CheckBox>
            </View>
            <View style={styles.checkBoxContainer}>
              <Feather name="tv" size={20} color={checkboxGroupState.isTV ? COLORS['danger-500'] : COLORS.gray} />
              <CheckBox
                checked={checkboxGroupState.isTV}
                onChange={(checked) => setCheckboxGroupState({ ...checkboxGroupState, isTV: checked })}
                status="danger"
                style={[styles.checkBox, { paddingLeft: 5 }]}
              >
                TV
              </CheckBox>
            </View>
          </View>
          <Select
            multiSelect={false}
            disabled={isEdit}
            {...vehicleTypeSelectState}
            label="Vehicle Type"
            value={
              vehicleEnums.VehicleType[
                (Number(vehicleTypeSelectState.selectedIndex) - 1).toString() as keyof typeof vehicleEnums.VehicleType
              ]
            }
            status="danger"
            style={{ marginBottom: 20 }}
          >
            {Object.keys(vehicleEnums.VehicleType)
              .filter((key) => Number.isNaN(Number(key)))
              .map((key) => (
                <SelectItem
                  style={{
                    backgroundColor: COLORS['danger-300'],
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderColor: COLORS.light,
                  }}
                  key={key}
                  title={key}
                />
              ))}
          </Select>
          <Select
            multiSelect={false}
            label="Seating Plan"
            status="danger"
            value={seatingPlanItems[Number(seatingPlanSelectState.selectedIndex) - 1]}
            style={{ marginBottom: 20 }}
            {...seatingPlanSelectState}
          >
            {seatingPlanItems.map((item, index) => (
              <SelectItem
                style={{
                  backgroundColor: COLORS['danger-300'],
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderColor: COLORS.light,
                }}
                key={index.toString()}
                title={item}
              />
            ))}
          </Select>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 10,
            marginRight: 6,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setVehicleModelVisible((prev) => !prev)}
          >
            <AntDesign name={vehicleModelVisible ? 'caretup' : 'caretdown'} size={12} color={COLORS.gray} />
            <Text style={styles.hintText} appearance="hint">
              Show vehicle model
            </Text>
          </TouchableOpacity>
        </View>
        {/* Bus */}
        {vehicleModelVisible && <View style={{ marginBottom: 20 }}>{renderVehicleModal()}</View>}

        <Button onPress={handleOnSubmit} style={isEdit ? styles.submitButton : styles.button}>
          {isEdit ? 'EDIT' : 'CREATE VEHICLE'}
        </Button>
      </KeyboardAvoidingScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 50,
  },
  checkboxGroup: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  checkBoxContainer: {
    width: '100%',
    padding: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    ...GLOBAL_STYLES.input,
  },
  checkBox: {
    marginLeft: 15,
    flex: 1,
  },
  submitButton: {
    backgroundColor: COLORS['success-400'],
    width: '100%',
    borderWidth: 0,
    elevation: 4,
  },
  button: {
    backgroundColor: COLORS['danger-400'],
    borderWidth: 0,
    elevation: 4,
  },
  hintText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

export default VehicleDetailForm;
