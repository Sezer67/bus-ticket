/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }

}


export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  AddVehicleModal: {
    vehicleId?: string;
    title: string;
  };
  AddServiceModal: undefined;
  EditVehicleModal: undefined;
  EditServiceModal: undefined;
  NotFound: undefined;
  TicketFind: undefined;
  Services: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TicketFind: undefined;
  Travel: undefined;
  Profile: undefined;
  MyVehicles: undefined;
  MyServices: undefined;
  MyCompany: undefined;
};


export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
