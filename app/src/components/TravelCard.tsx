import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyTravelsDataType } from '../../service/types/service-service.type';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type PropsType = {
  item: MyTravelsDataType;
  index: number;
};

const TravelCard: React.FC<PropsType> = ({ item, index }) => {
  const xTreshold = Layout.window.width * 0.2;
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const tranlateX = useSharedValue(0);
  useEffect(() => {
    if (!firstRender) {
      setTimeout(() => {
        tranlateX.value = withTiming(0);
      }, 3000);
    }
  }, [firstRender]);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      tranlateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeTreshold = tranlateX.value < xTreshold;
      if (shouldBeTreshold) {
        tranlateX.value = withTiming(-1 * xTreshold * 2);
      } else {
        tranlateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    if (index === 0 && firstRender) {
      setFirstRender(false);
      tranlateX.value = withTiming(xTreshold * -2);
    }
    return {
      transform: [
        {
          translateX: tranlateX.value,
        },
      ],
    };
  });

  const rpanBackgroundContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(tranlateX.value < xTreshold * 2 ? 1 : 0);
    return {
      opacity,
    };
  });
  const renderCompletedTag = () => {
    if (!item.service.baseService.isCompleted) {
      return (
        <View style={{ ...styles.tag }}>
          <AntDesign name="checkcircle" size={16} color={COLORS.light} />
          <Text style={styles.tagText}>Trip is complete</Text>
        </View>
      );
    }
    return (
      <View style={{ ...styles.tag, backgroundColor: COLORS['warning-500'] }}>
        <Ionicons name="ios-warning" size={16} color={COLORS.light} />
        <Text style={styles.tagText}>Trip has not started</Text>
      </View>
    );
  };
  const renderContainer = () => {
    return (
      <View>
        <View style={styles.header}>
          <Text category="h6">{item.companyName}</Text>
          {renderCompletedTag()}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <View style={[styles.panBackground, rpanBackgroundContainerStyle]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="ios-warning" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="vote" size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.container, rStyle]}>
          <View style={styles.leftCrop} />
          <View style={styles.centerContainer}>{renderContainer()}</View>
          <View style={styles.rightCrop} />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width - 40,
    backgroundColor: 'white',
    height: Layout.window.height * 0.2,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },
  rightCrop: {
    backgroundColor: COLORS.light,
    position: 'absolute',
    width: Layout.window.height * 0.1,
    right: -1 * Layout.window.height * 0.065,
    borderRadius: 100,
    height: Layout.window.height * 0.1,
  },
  leftCrop: {
    backgroundColor: COLORS.light,
    position: 'absolute',
    borderRadius: Layout.window.height,
    left: -1 * Layout.window.height * 0.065,
    width: Layout.window.height * 0.1,
    height: Layout.window.height * 0.1,
  },
  centerContainer: {
    height: Layout.window.height * 0.2 - 8,
    marginHorizontal: Layout.window.height * 0.0375,
    marginVertical: 4,
  },
  panBackground: {
    position: 'absolute',
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: COLORS.disabledColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    width: Layout.window.width * 0.8 - 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 7,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: COLORS['success-500'],
    borderRadius: 4,
    flexDirection: 'row',
  },
  tagText: {
    color: COLORS.light,
    marginLeft: 3,
    fontWeight: '600',
  },
});

export default TravelCard;
