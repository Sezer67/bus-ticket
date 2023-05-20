import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <Text>My Travels</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    elevation: 4,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
});

export default HeaderTitle;
