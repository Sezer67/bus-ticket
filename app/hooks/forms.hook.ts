import React from 'react';
import { formTypes } from '../types/index';

const useInputState = (): formTypes.InputHookType => {
  const [value, setValue] = React.useState<string>('');
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  return {
    value,
    isFocus,
    onChangeText: setValue,
    onFocus: () => setIsFocus(true),
    onBlur: () => setIsFocus(false),
  };
};

const useInputPasswordState = (): formTypes.InputPasswordHookType => {
  const [value, setValue] = React.useState<string>('');
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  return {
    value,
    isFocus,
    onChangeText: setValue,
    onFocus: () => setIsFocus(true),
    onBlur: () => setIsFocus(false),
    secureTextEntry,
    setSecureTextEntry: (value: boolean) => setSecureTextEntry(value),
  };
};

const useRadioState = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);
  return { checked, onChange: setChecked };
};
const useRadioGroupState = (index = 0): formTypes.RadioGroupHookType => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(index);
  return { selectedIndex, onChange: (value: number) => setSelectedIndex(value) };
};

const useDatePickerState = (initialDate: Date): formTypes.DatePickerHookType => {
  const [date, setDate] = React.useState<Date>(initialDate);
  const [visible, setVisible] = React.useState<boolean>(false);
  return {
    open: visible,
    date,
    onCancel: () => setVisible(false),
    onConfirm: (value) => {
      const year = value.getFullYear();
      const month = value.getMonth();
      const day = value.getDate();
      setDate(new Date(year, month, day - 1));
      setVisible(false);
    },
    onOpen: () => setVisible(true),
  };
};

export { useInputState, useInputPasswordState, useRadioState, useRadioGroupState, useDatePickerState };
