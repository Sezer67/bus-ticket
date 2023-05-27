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
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { settingsActions } from '../../redux/settings/slice';
import { complainService } from '../../../service';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { userEnums } from '../../../enums';

const ReportScreen: React.FC<RootStackScreenProps<'Report'>> = ({ navigation, route }) => {
  const companyName = useInputState();
  const PNRNumber = useInputState();
  const message = useInputState();
  const subject = useInputState();
  const answer = useInputState();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: ReduxRootType) => state.user);

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
    subject.onChangeText(route.params?.subject || '');
    message.onChangeText(route.params?.message || '');
    answer.onChangeText(route.params?.answer || '');
  }, []);

  const createComplain = async () => {
    try {
      await complainService.create({
        message: message.value,
        serviceId: PNRNumber.value,
        subject: subject.value,
        companyName: companyName.value,
      });
      dispatch(settingsActions.setErrorSnackbar({ isSuccess: true, content: 'Your complaint has been reported' }));
    } catch (error) {
      throw error;
    }
  };

  const createAnswer = async () => {
    if(!route.params.id) return;
    if (!answer.value) {
      dispatch(settingsActions.setErrorSnackbar({ isError: true, content: 'You did not answer !' }));
      return;
    }
    try {
      await complainService.createAnswer({
        id: route.params.id,
        answer: answer.value
      })
    } catch (error) {
      throw error;
    }
  }

  const handleSend = async () => {
    if (!subject.value || !message.value || !PNRNumber.value) {
      dispatch(settingsActions.setErrorSnackbar({ isError: true, content: 'Empty fields available !' }));
      return;
    }
    dispatch(settingsActions.setLoading({ isLoading: true, content: 'Your complaint is being reported...' }));
    try {
      if (route.params.isEdit) {
        await createAnswer();
      } else {
        // edit değilse customer yeni oluşturuyor demektir.
        await createComplain();
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView>
        <View style={styles.form}>
          <Input
            style={companyName.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            disabled={route.params?.companyName ? true : false}
            placeholder="Company Name"
            {...companyName}
          />
          <Input
            style={PNRNumber.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            placeholder="PNR Number"
            disabled={route.params?.PNRNumber ? true : false}
            {...PNRNumber}
            keyboardType="number-pad"
          />
          <Input
            style={subject.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
            placeholder="Subject"
            {...subject}
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
          {route.params.isEdit ? (
            <TextInput
              multiline={true}
              editable={user.role === userEnums.Role.Company}
              style={[
                answer.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input,
                { minHeight: 160, width: '100%', paddingHorizontal: 20, maxHeight: 300 },
              ]}
              placeholder={user.role === userEnums.Role.Company ?  "Your Answer": "Company Answer"}
              {...answer}
              
            />
          ) : null}
          {route.params.isEdit && user.role === userEnums.Role.Customer ? null : (
            <Button onPress={handleSend} style={styles.button}>
              SEND
            </Button>
          )}
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
