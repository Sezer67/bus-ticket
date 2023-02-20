import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyType = '@token';

export const setStorageKey = async (key: KeyType, value: string) => {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getStorageKey = async (key: KeyType) => {
  return AsyncStorage.getItem(key);
};
