import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyTravelsDataType } from '../../service/types/service-service.type';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { dateHelper } from '../helpers';

type PropsType = {
  item: MyTravelsDataType;
  index: number;
};
const colorPalette = [
  COLORS['danger-500'],
  COLORS['primary-500'],
  COLORS['warning-500'],
  COLORS['info-500'],
  COLORS['success-500'],
];

const TravelCard: React.FC<PropsType> = ({ item, index }) => {
  const xTreshold = Layout.window.width * 0.2;
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const tranlateX = useSharedValue(0);
  useEffect(() => {
    if (!firstRender) {
      setTimeout(() => {
        tranlateX.value = withTiming(0);
      }, 1500);
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
    if (item.service.baseService.isCompleted) {
      return (
        <View style={{ ...styles.tag }}>
          <AntDesign name="checkcircle" size={14} color={COLORS.light} />
          <Text style={styles.tagText}>Trip is complete</Text>
        </View>
      );
    }
    return (
      <View style={{ ...styles.tag, backgroundColor: COLORS['warning-500'] }}>
        <Ionicons name="ios-warning" size={14} color={COLORS.light} />
        <Text style={styles.tagText}>Trip has not started</Text>
      </View>
    );
  };
  const renderContainer = () => {
    let footerText = 'Swipe left to vote or complaint';
    if (item.isToVote) {
      footerText = 'You voted this trip';
    }
    return (
      <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <View style={styles.header}>
          <Text category="h6">{item.companyName}</Text>
          {renderCompletedTag()}
        </View>
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '55%',
              paddingVertical: 5,
            }}
          >
            <View style={styles.iconWithText}>
              <FontAwesome5 name="route" size={20} color={COLORS.dark} style={{ width: 24 }} />
              <Text style={{ ...styles.infoText, width: '80%' }}>
                {item.service.departureCity} - {item.service.arrivalCity}
              </Text>
            </View>
            <View style={styles.iconWithText}>
              <MaterialIcons name="date-range" size={20} color={COLORS.dark} style={{ width: 24 }} />
              <Text style={{ ...styles.infoText, width: '80%' }}>
                {dateHelper.formattedDate(new Date(item.service.departureDate), 'Day Month Date HH:mm')}-
                {dateHelper.formattedDate(new Date(item.service.arrivalDate), 'Day Month Date HH:mm')}
              </Text>
            </View>
          </View>
          <View
            style={{ width: 0.1, height: '100%', borderColor: COLORS.dark, borderWidth: 1, borderStyle: 'dotted' }}
          />
          <View
            style={{
              marginLeft: '4%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '40%',
              paddingVertical: 5,
            }}
          >
            <View style={styles.iconWithText}>
              <FontAwesome name="user" size={20} color={COLORS.dark} style={{ width: 24 }} />
              <Text style={styles.infoText}>{item.fullName}</Text>
            </View>
            <View style={styles.iconWithText}>
              <MaterialCommunityIcons name="seat-passenger" size={20} color={COLORS.dark} style={{ width: 24 }} />
              <Text style={styles.infoText}>{item.seatNumber}</Text>
            </View>
            <View style={styles.iconWithText}>
              <Ionicons name="ios-cash" size={20} color={COLORS.dark} style={{ width: 24 }} />
              <Text style={styles.infoText}>{item.service.price} ₺</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={{ fontSize: 16, fontWeight: '200' }}>{footerText}</Text>
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={[styles.panBackground, rpanBackgroundContainerStyle]}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ios-warning" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          {!item.isToVote && (
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="vote" size={24} color={COLORS.dark} />
            </TouchableOpacity>
          )}
        </View>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View style={[styles.container, rStyle, { borderColor: colorPalette[index % colorPalette.length] }]}>
            <View style={{ ...styles.leftCrop, borderColor: colorPalette[index % colorPalette.length] }} />
            <View style={styles.centerContainer}>{renderContainer()}</View>
            <View style={{ ...styles.rightCrop, borderColor: colorPalette[index % colorPalette.length] }} />
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    borderWidth: 1,
  },
  rightCrop: {
    backgroundColor: COLORS.light,
    position: 'absolute',
    width: Layout.window.height * 0.1,
    right: -1 * Layout.window.height * 0.065,
    borderRadius: 100,
    height: Layout.window.height * 0.1,
    borderLeftWidth: 1,
  },
  leftCrop: {
    backgroundColor: COLORS.light,
    position: 'absolute',
    borderRadius: Layout.window.height,
    left: -1 * Layout.window.height * 0.065,
    width: Layout.window.height * 0.1,
    height: Layout.window.height * 0.1,
    borderRightWidth: 1,
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
    marginTop: 5,
  },
  tag: {
    paddingHorizontal: 7,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    backgroundColor: COLORS['success-500'],
    borderRadius: 4,
    flexDirection: 'row',
  },
  tagText: {
    color: COLORS.light,
    marginLeft: 3,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: Layout.window.height * 0.1,
  },
  cardFooter: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: COLORS.dark,
  },
});

export default TravelCard;
