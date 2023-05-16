import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { COLORS } from '../../constants';
import RenderHTML from 'react-native-render-html';
import Layout from '../../constants/Layout';
import { ServiceType } from '../../types/service.type';
const HtmlView:React.FC<{html: string}> = ({html}) => {

  const source = {
    html
  };
  return (
    <SafeAreaView style={{width: Layout.window.width * 0.8, paddingHorizontal: Layout.window.width * 0.05}}>
      <RenderHTML contentWidth={Layout.window.width * 0.7} source={source} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default HtmlView;
