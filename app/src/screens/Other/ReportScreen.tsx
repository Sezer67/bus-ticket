import React, { useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackScreenProps } from '../../../types';
import GLOBAL_STYLES from '../../../constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Button, Input } from '@ui-kitten/components';
import { useInputState } from '../../../hooks/forms.hook';
import Layout from '../../../constants/Layout';
import { COLORS } from '../../../constants';

const ReportScreen: React.FC<RootStackScreenProps<'Report'>> = ({ navigation, route }) => {
  const companyName = useInputState();
  const PNRNumber = useInputState();
  const message = useInputState();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-caret-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
    companyName.onChangeText(route.params?.companyName || '');
    PNRNumber.onChangeText(route.params?.PNRNumber || '');
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView>
        <View style={styles.form}>
          <Input
            style={companyName.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            placeholder="Company Name"
            {...companyName}
          />
          <Input
            style={PNRNumber.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            placeholder="PNR Number"
            {...PNRNumber}
            keyboardType="number-pad"
          />
          <TextInput
            multiline={true}
            style={[
              message.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input,
              { minHeight: 160, width: '100%', paddingHorizontal: 20, maxHeight: 300 },
            ]}
            placeholder="Your Message"
            {...message}
          />
          <Button style={styles.button}>SEND</Button>
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
    width: Layout.window.width,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS['danger-600'],
    borderWidth: 0,
    elevation: 4,
    width: '100%',
  },
});

export default ReportScreen;
