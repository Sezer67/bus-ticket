import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../../../constants/Layout';
import { Text } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { FontAwesome } from '@expo/vector-icons';
import { settingsActions } from '../../redux/settings/slice';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { COLORS } from '../../../constants';

const Snackbar = () => {
  const settingState = useAppSelector((state: ReduxRootType) => state.settings);
  const dispacth = useAppDispatch();

  const handleClose = () => {
    dispacth(settingsActions.setErrorSnackbar({ isError: false, isSuccess: false, content: undefined }));
  };

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, [settingState.error]);

  return (
    <View
      style={[
        styles.container,
        { display: settingState.error.isError || settingState.error.isSuccess ? 'flex' : 'none' },
        settingState.error.isError ? { bottom: 10 } : {},
        settingState.error.isSuccess ? { top: 50 } : {},
      ]}
    >
      <View
        style={{
          ...styles.subContainer,
          backgroundColor: settingState.error.isError ? COLORS.dark : COLORS['success-400'],
        }}
      >
        <Text style={styles.text}>{settingState.error.content}</Text>
        <TouchableOpacity onPress={handleClose}>
          <FontAwesome name="close" color="red" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    position: 'absolute',
  },
  subContainer: {
    backgroundColor: '#212121',
    width: Layout.window.width - 40,
    elevation: 4,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});

export default Snackbar;
